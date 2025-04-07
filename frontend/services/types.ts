export interface StatusResponse {
    healthy: boolean;
    message: string;
    uptime: number;
    timestamp: Date;
}

export interface Message {
    role: "User" | "Assistant";
    content: string | null;
}

export interface Chat {
    id: string;
    created: Date;
    history: Message[];
}
