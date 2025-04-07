"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Send,
    Info,
    Home,
    Thermometer,
    Lightbulb,
    CloudRain,
    Sun,
    Leaf,
    Wind,
    Droplet,
    Utensils,
    Globe,
    Recycle,
    Zap,
    Trees,
    Car,
    Factory,
    Fish,
    CloudLightning,
    Battery,
    Sprout,
    Trash2,
    Map,
    Waves,
    Apple,
    ThermometerSun,
} from "lucide-react";
import { useGetStatusQuery } from "@/services/chatApi";
import { Socket, io } from "socket.io-client";
import Markdown from "react-markdown";
// Message type definition
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

// Suggestion type definition
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
        | "Tree"
        | "Car"
        | "Factory"
        | "Fish"
        | "CloudLightning"
        | "Battery"
        | "Sprout"
        | "Trash2"
        | "Map"
        | "Waves"
        | "ThermometerSun"
        | "Apple";
}

// Component to dynamically render Lucide icons
const DynamicIcon = ({ iconName }: { iconName: Suggestion["lucideIcon"] }) => {
    switch (iconName) {
        case "Send":
            return <Send className="h-4 w-4" />;
        case "Info":
            return <Info className="h-4 w-4" />;
        case "Home":
            return <Home className="h-4 w-4" />;
        case "Thermometer":
            return <Thermometer className="h-4 w-4" />;
        case "Lightbulb":
            return <Lightbulb className="h-4 w-4" />;
        case "CloudRain":
            return <CloudRain className="h-4 w-4" />;
        case "Sun":
            return <Sun className="h-4 w-4" />;
        case "Leaf":
            return <Leaf className="h-4 w-4" />;
        case "Wind":
            return <Wind className="h-4 w-4" />;
        case "Droplet":
            return <Droplet className="h-4 w-4" />;
        case "Utensils":
            return <Utensils className="h-4 w-4" />;
        case "Globe":
            return <Globe className="h-4 w-4" />;
        case "Recycle":
            return <Recycle className="h-4 w-4" />;
        case "Zap":
            return <Zap className="h-4 w-4" />;
        case "Tree":
            return <Trees className="h-4 w-4" />;
        case "Car":
            return <Car className="h-4 w-4" />;
        case "Factory":
            return <Factory className="h-4 w-4" />;
        case "Fish":
            return <Fish className="h-4 w-4" />;
        case "CloudLightning":
            return <CloudLightning className="h-4 w-4" />;
        case "Battery":
            return <Battery className="h-4 w-4" />;
        case "Sprout":
            return <Sprout className="h-4 w-4" />;
        case "Trash2":
            return <Trash2 className="h-4 w-4" />;
        case "Map":
            return <Map className="h-4 w-4" />;
        case "Waves":
            return <Waves className="h-4 w-4" />;
        case "Apple":
            return <Apple className="h-4 w-4" />;
        case "ThermometerSun":
            return <ThermometerSun className="h-4 w-4" />;
        default:
            return <Info className="h-4 w-4" />;
    }
};

// Default suggestions when no dynamic ones are available
const defaultSuggestions: Suggestion[] = [
    {
        content: "How the weather is going to be like in Jalandhar today?",
        lucideIcon: "ThermometerSun",
    },
    {
        content: "What is climate change?",
        lucideIcon: "Info",
    },
    {
        content: "How does my diet affect climate?",
        lucideIcon: "Utensils",
    },
    {
        content: "What are the best climate solutions?",
        lucideIcon: "Lightbulb",
    },
    {
        content: "How can I reduce home energy use?",
        lucideIcon: "Home",
    },
];

const serverBaseURL: string =
    process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:9999";

export default function ChatPage() {
    const [showInfo, setShowInfo] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [typingStatus, setTypingStatus] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([...defaultSuggestions]);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Setup Socket.IO connection
    useEffect(() => {
        // Create socket connection
        const socket = io(serverBaseURL);
        socketRef.current = socket;

        // Handle connection established
        socket.on("connection_established", (data) => {
            console.log("Connected to server with ID:", data.userId);
        });

        // Handle AI typing status
        socket.on("ai_typing", (data) => {
            setIsLoading(data.isTyping);
            if (!data.isTyping) {
                setTypingStatus("");
                setIsLoading(false);
            }
        });

        // Handle detailed typing status
        socket.on("ai_typing_status", (data) => {
            if (data.isTyping && data.statusMessage) {
                setTypingStatus(data.statusMessage);
            }
        });

        // Handle AI responses
        socket.on("ai_response", (data) => {
            const newMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: data.response,
            };
            console.log("newMessage", newMessage);

            setMessages((prev) => [...prev, newMessage]);

            // Update suggestions if provided
            if (data.suggestions && Array.isArray(data.suggestions)) {
                setSuggestions(data.suggestions);
                console.log("Received suggestions:", data.suggestions);
            }
        });

        // Handle new suggestions
        socket.on("new_suggestion", (data: Suggestion[]) => {
            const newSuggestion: Suggestion[] = data.map((suggestion) => ({
                content: suggestion.content,
                lucideIcon: suggestion.lucideIcon,
            }));
            console.log("Received new suggestions:", newSuggestion);
            setSuggestions(newSuggestion);
        });

        // Handle errors
        socket.on("error", (data) => {
            console.error("Socket error:", data.message);
            // Optionally display error to user
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // Scroll to bottom when messages change
    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages]);

    const handleSuggestion = (suggestion: string) => {
        setInput(suggestion);
        // Auto-submit the suggestion
        if (socketRef.current) {
            sendMessage(suggestion);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const sendMessage = (messageText: string) => {
        if (!messageText.trim()) return;

        // Add user message to chat
        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageText,
        };

        setMessages((prev) => [...prev, newMessage]);

        // Send to server
        if (socketRef.current) {
            socketRef.current.emit("user_message", { message: messageText });
            setIsLoading(true);
        }

        // Clear input
        setInput("");
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(input);
        // Keep focus on the input but prevent it from scrolling the whole page
        e.currentTarget.querySelector("input")?.focus({ preventScroll: true });
    };
    const { data: statusData, isLoading: isStatusLoading } = useGetStatusQuery();

    return (
            <main className="container mx-auto px-4 py-8 max-w-[90vw]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <Card className="h-[70vh] flex flex-col">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                                <CardTitle className="flex items-center">
                                    <div className="bg-white p-1 rounded-full mr-2">
                                        <div
                                            className={`${
                                                isStatusLoading
                                                    ? "bg-gray-400"
                                                    : statusData?.healthy
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            } h-3 w-3 rounded-full`}
                                        ></div>
                                    </div>
                                    ClimateBot (
                                    {isStatusLoading ? "connecting" : statusData?.message}
                                    )
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto text-white hover:bg-white/20"
                                        onClick={() => setShowInfo(!showInfo)}
                                    >
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="overflow-auto p-0 flex-grow relative">
                                {showInfo && (
                                    <div className="bg-blue-50 p-4 border-b border-blue-100 sticky top-0 z-10 max-w-full">
                                        <h3 className="font-medium text-blue-800 mb-2">
                                            About ClimateBot
                                        </h3>
                                        <p className="text-sm text-blue-700">
                                            I'm an AI assistant focused on climate change
                                            education. Ask me anything about climate
                                            science, personal impact, or solutions. I'm
                                            here to help you understand climate issues and
                                            find ways to make a difference.
                                        </p>
                                    </div>
                                )}

                                <div className="p-4 space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-gray-500 my-8">
                                            <p>
                                                Start a conversation with ClimateBot or
                                                try one of the suggested questions below.
                                            </p>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${
                                                    message.role === "user"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`whitespace-pre-wrap max-w-[80%] rounded-lg p-3 ${
                                                        message.role === "user"
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    <Markdown>{message.content}</Markdown>
                                                    <div
                                                        className={`flex justify-between mt-2 text-xs text-gray-${
                                                            message.role === "user"
                                                                ? "200"
                                                                : "800"
                                                        }`}
                                                    >
                                                        <div className={``}>
                                                            {new Date(
                                                                parseInt(message.id),
                                                            ).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </div>
                                                        <div className={``}>
                                                            {message.role === "user"
                                                                ? "You"
                                                                : "ClimateBot"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex space-x-2">
                                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                                    </div>
                                                    {typingStatus && (
                                                        <div className="text-xs text-gray-500">
                                                            {typingStatus}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </CardContent>
                            <div className="p-4 border-t">
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Ask about climate change..."
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600"
                                        disabled={isLoading || !input.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Suggested Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {suggestions.map((suggestion, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="w-full justify-start text-left text-sm h-[100%]"
                                            onClick={() =>
                                                handleSuggestion(suggestion.content)
                                            }
                                            disabled={isLoading}
                                        >
                                            <DynamicIcon
                                                iconName={suggestion.lucideIcon}
                                            />
                                            <span className="ml-2 whitespace-normal break-words">
                                                {suggestion.content}
                                            </span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
    );
}
