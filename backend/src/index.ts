import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dayjs from "dayjs";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Update this with your frontend origin in production
        methods: ["GET", "POST"],
    },
});

const middlewares: express.RequestHandler[] = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
];
app.use(middlewares);
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY as string;

// --- Type Definitions ---
interface Coordinates {
    lat: number;
    lon: number;
}

type WeatherAPIData = any;

interface Message {
    role: "User" | "Assistant";
    content: string | null;
}

interface Suggestion {
    content: string;
    lucideIcon:
        | "Send"
        | "Info"
        | "Home"
        | "Thermometer"
        | "Lightbulb"
        | "CloudRain"
        | "Sun"
        | "Leaf"
        | "Wind"
        | "Droplet"
        | "Utensils"
        | "Globe"
        | "Recycle"
        | "Zap"
        | "Trees"
        | "Car"
        | "Factory"
        | "Fish"
        | "CloudLightning"
        | "Battery"
        | "Sprout"
        | "Trash2"
        | "Map"
        | "Waves"
        | "Apple";
}

interface Chat {
    id: string;
    created: Date;
    history: Message[];
    suggestions: Suggestion[];
}

// --- End Type Definitions ---

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

// Remove multiple chats support – only one active chat is allowed.
let activeChat: Chat | null = null;

// Async handler wrapper
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Weather APIs URLs and helper functions remain unchanged
async function getWeatherData(
    location: string,
    frequency: ProcessedWeatherData["frequency"],
): Promise<WeatherAPIData | null> {
    try {
        const coords = await getCoordsFromCity(location);
        if (!coords) {
            throw new Error("Coordinates not found");
        }
        let url = "";
        switch (frequency) {
            case "current":
                url = `https://pro.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`;
                break;
            case "hourly":
                url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_API_KEY}`;
                break;
            case "daily":
                url = `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&cnt=8&appid=${OPENWEATHER_API_KEY}`;
                break;
            case "weekly":
                url = `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&cnt=16&appid=${OPENWEATHER_API_KEY}`;
                break;
            default:
                throw new Error("Invalid frequency");
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error("Weather API error:", error.message);
        throw new Error("Weather data not available");
    }
}

async function getCoordsFromCity(city: string): Promise<Coordinates | null> {
    try {
        const response = await axios.get(
            `http://pro.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`,
        );
        const data = response.data;
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { lat, lon };
        }
        return null;
    } catch (error: any) {
        console.error("Coordinates API error:", error.message);
        throw new Error("Coordinates data not available");
    }
}

interface ProcessedWeatherData {
    frequency: "current" | "hourly" | "daily" | "weekly";
    location: string;
    isWeatherQuery: boolean;
}

async function processApiCalls(message: string): Promise<ProcessedWeatherData | null> {
    // Detect weather query intent
    const weatherRegex =
        /weather|temperature|forecast|climate|rain|snow|sunny|cloudy|humidity|wind|storm|drizzle|showers|hail|thunder|heat|cold|chill|warm|cool|hot|freezing|icy|dry|wet|precipitation/i;
    const frequencyRegex =
        /today|tomorrow|next week|this week|current|now|latest|recent|upcoming|daily|hourly|weekly|monthly|yearly|in \d+ (minutes|hours|days|weeks)|after \d+ (minutes|hours|days|weeks)|later|this (morning|afternoon|evening|night|weekend)/i;
    const locationRegex =
        /in|at|for|near|around|from|to|about|of|on|over|by|toward|towards|within|outside|inside|close to/i;
    const weatherIntentRegex = new RegExp(
        `${weatherRegex.source}.*(${frequencyRegex.source}).*(${locationRegex.source})`,
        "i",
    );

    if (weatherIntentRegex.test(message)) {
        try {
            const weatherPrompt = `Extract the following information from the message: "${message}".
            1. Weather-related keywords (e.g., weather, temperature, forecast)
            2. Frequency (e.g., current, hourly, daily, weekly) (if not found, use "current")
            3. Location (e.g., city, country)
            4. Is this a weather-related query? (true/false)
            Return ONLY a JSON object, with absolutely no other text, that can be parsed using JSON.parse(response) with the following structure:
            {
                "frequency": "current" | "hourly" | "daily" | "weekly",
                "location": string;
                "isWeatherQuery": boolean;
            }`;

            const result = await model.generateContent(weatherPrompt);
            const responseText =
                result.response.text().match(/```json(.*?)```/s)?.[1] ?? "";
            const weatherData: ProcessedWeatherData = JSON.parse(responseText);
            return weatherData;
        } catch (error: any) {
            console.error("Weather processing error:", error.message);
            // Continue without weather data
        }
    }
    // Add other API call detection logic here
    return null; // No API call needed
}

// Socket connection management
interface ConnectedClient {
    socket: Socket;
    userId: string;
}
const connectedClients: ConnectedClient[] = [];

// Socket.IO connection handler
io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);
    const userId = uuidv4();
    connectedClients.push({ socket, userId });

    // Send initial connection acknowledgement
    socket.emit("connection_established", { userId });

    // Handle user message
    socket.on("user_message", async (data: { message: string }) => {
        try {
            if (!activeChat) {
                // Start new chat
                activeChat = {
                    id: uuidv4(),
                    created: new Date(),
                    history: [
                        {
                            role: "User",
                            content: data.message,
                        },
                    ],
                    suggestions: [], // Initialize empty suggestions
                };
            } else {
                // Add to existing chat
                activeChat.history.push({ role: "User", content: data.message });
            }

            // Notify that AI is typing
            socket.emit("ai_typing", { isTyping: true });

            // Generate response
            const response = await generateResponse();

            // AI is no longer typing
            socket.emit("ai_typing", { isTyping: false });

            // Add to chat history and emit response
            activeChat.history.push({ role: "Assistant", content: response });

            // Generate suggestions
            const suggestions = await generateSuggestions(activeChat.history);

            // Update suggestions in active chat and emit
            activeChat.suggestions = suggestions;
            socket.emit("new_suggestion", { suggestions });

            // Send complete response
            socket.emit("ai_response", {
                response,
                suggestions,
                chatHistory: activeChat.history,
            });
        } catch (error: any) {
            console.error("Message processing error:", error.message);
            socket.emit("ai_typing", { isTyping: false });
            socket.emit("error", { message: error.message });
        }
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        const index = connectedClients.findIndex(
            (client) => client.socket.id === socket.id,
        );
        if (index !== -1) {
            connectedClients.splice(index, 1);
        }
    });
});

// Generate AI response using the active chat
async function generateResponse(): Promise<string | null> {
    if (!activeChat) {
        throw new Error("No active chat");
    }
    const userMessage = activeChat.history[activeChat.history.length - 1]?.content;
    if (!userMessage) {
        throw new Error("User message is required");
    }
    const chatHistory = activeChat.history.slice(0, -1);
    // Keep only the last 10 messages if the history grows large
    if (activeChat.history.length > 10) {
        activeChat.history = activeChat.history.slice(-10);
    }
    let weatherData: WeatherAPIData | null = null;
    let apiData: WeatherAPIData | null = null;
    try {
        // Process API calls
        const apiCallData = await processApiCalls(userMessage);
        if (apiCallData) {
            // Broadcast progress update
            broadcastTypingUpdate("Finding weather information...");

            apiData = await getWeatherData(apiCallData.location, apiCallData.frequency);
            weatherData = apiData;

            // Broadcast progress update
            broadcastTypingUpdate("Processing weather data...");
        }
    } catch (error: any) {
        console.error("API processing error:", error.message);
    }

    // Broadcast final thinking state
    broadcastTypingUpdate("Generating response...");

    // Generate AI response
    let prompt = `
    Current date and time: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}
    You are a friendly and knowledgeable weather chatbot that can:
    1. Educate users about weather and climate change
    2. Provide weather information
    3. Have natural conversations about weather-related topics
    Chat history:
    ${chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}
    User: ${userMessage}`;
    if (weatherData && weatherData.isWeatherQuery) {
        prompt += `

Here is the raw API data for the weather query:
${JSON.stringify(weatherData)}
Use this real-time weather data to answer the user's query following the instructions below:
1. Use only the information provided in the API data.
2. Provide a clear and concise response.
3. Avoid unnecessary details or jargon.
4. Use only Celsius for temperature.
`;
    }
    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        // Broadcast final response
        broadcastTypingUpdate("Response generated successfully.");
        return response;
    } catch (error: any) {
        console.error("AI generation error:", error.message);
        return "I'm having trouble processing your request right now. Please try again later.";
    }
}

// Helper function to broadcast typing updates to all connected clients
function broadcastTypingUpdate(statusMessage: string): void {
    console.log("Broadcasting typing status:", statusMessage);
    for (const client of connectedClients) {
        client.socket.emit("ai_typing_status", {
            isTyping: true,
            statusMessage,
        });
    }
}

// Generate chat suggestions with icons
async function generateSuggestions(
    chatHistory: Message[] = [],
    context: string = "general",
): Promise<Suggestion[]> {
    try {
        let historyText = "";
        if (chatHistory.length > 0) {
            historyText = `Chat history: ${chatHistory
                .slice(-3)
                .map((msg) => `${msg.role}: ${msg.content}`)
                .join("\n")}`;
        }
        const prompt = `${historyText}
Generate 5 suggested messages a user might send to a weather and climate chatbot.
Context: ${context}
The suggestions should be diverse and helpful for continuing the conversation.

For each suggestion, also provide an appropriate icon from this list (not strictly adhering to the list, but use them as a reference):
- Info: For general information questions
- Home: For home-related climate topics
- Thermometer: For temperature-related questions
- Lightbulb: For solutions or ideas
- CloudRain: For rain or precipitation questions
- Sun: For sunny weather or solar energy
- Leaf: For environmental or sustainability topics
- Wind: For wind or air quality questions
- Droplet: For water conservation
- Utensils: For food and diet impact on climate
- Globe: For global climate issues
- Recycle: For recycling or waste reduction
- Zap: For energy-related topics
- Trees: For forestry or deforestation topics
- Car: For transportation impact
- Factory: For industrial emissions
- Fish: For ocean or marine life topics
- CloudLightning: For extreme weather
- Battery: For renewable energy storage
- Sprout: For growing or agriculture
- Trash2: For waste management
- Map: For geographical climate impacts
- Waves: For ocean or wave energy
- Apple: For food sustainability
- ThermometerSun: For temperature and weather 

Return your answer in JSON format that can be parsed with JSON.parse():
[
  {"content": "suggestion text", "lucideIcon": "IconName"}
  ...
]`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from the response (if the AI wraps it in code blocks)
        const jsonMatch = responseText.match(/```(?:json)?([\s\S]*?)```/) || [
            null,
            responseText,
        ];
        const jsonText = jsonMatch[1].trim();

        // Parse the JSON
        const suggestions: Suggestion[] = JSON.parse(jsonText);

        // Validate suggestions
        const validSuggestions = suggestions.filter((s) => s.content && s.lucideIcon);

        console.log("Generated suggestions with icons:", validSuggestions);

        return validSuggestions;
    } catch (error: any) {
        console.error("Suggestion generation error:", error);
        // Fallback suggestions with icons if AI fails
        return [
            { content: "What's the weather like today?", lucideIcon: "CloudRain" },
            { content: "Tell me about climate change", lucideIcon: "Globe" },
            { content: "How can I reduce my carbon footprint?", lucideIcon: "Leaf" },
        ];
    }
}

// Endpoint to start a new chat (clearing any existing chat)
app.post(
    "/chat/new",
    asyncHandler(async (req, res) => {
        console.log("POST /chat/new");
        const { message } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message parameter is required" });
        }
        // Start new chat
        activeChat = {
            id: uuidv4(),
            created: new Date(),
            history: [
                {
                    role: "User",
                    content: message,
                },
            ],
            suggestions: [], // Initialize empty suggestions
        };
        const response = await generateResponse();
        activeChat.history.push({ role: "Assistant", content: response });
        const suggestions = await generateSuggestions(activeChat.history);
        activeChat.suggestions = suggestions;
        res.json({
            response,
            suggestions,
        });
    }),
);

// Endpoint to continue the ongoing chat
app.post(
    "/chat",
    asyncHandler(async (req, res) => {
        console.log("POST /chat");
        if (!activeChat) {
            return res.status(400).json({
                error: "No active chat. Please create a new chat via /chat/new",
            });
        }
        const { message } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message parameter is required" });
        }
        activeChat.history.push({ role: "User", content: message });
        const response = await generateResponse();
        activeChat.history.push({ role: "Assistant", content: response });
        const suggestions = await generateSuggestions(activeChat.history);
        activeChat.suggestions = suggestions;
        res.json({
            response,
            suggestions,
        });
    }),
);

// Endpoint to get chat history
app.get(
    "/chat",
    asyncHandler(async (req, res) => {
        console.log("GET /chat");
        if (!activeChat) {
            return res.status(400).json({
                error: "No active chat. Please create a new chat via /chat/new",
            });
        }
        res.json(activeChat.history);
    }),
);

app.get(
    "/status",
    asyncHandler(async (req, res) => {
        console.log("GET /status");
        try {
            const status = {
                healthy: true,
                message: "online",
                uptime: process.uptime(),
                timestamp: new Date(),
            };
            res.json(status);
        } catch (error: any) {
            console.error("Status error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }),
);

// Update the server to use httpServer instead of app.listen
httpServer.listen(PORT, () => {
    console.log("Server running on port " + PORT + " with WebSocket support");
});
