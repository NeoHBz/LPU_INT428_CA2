"use client";

import dynamic from "next/dynamic";

import { Provider } from "react-redux";
import { store } from "@/services/store";

// Use dynamic import with ssr: false in this client component
const ChatPageComponent = dynamic(() => import("./ChatPage"), { ssr: false });

export default function ClientWrapper() {
    return <Provider store={store}>
        <ChatPageComponent />;
    </Provider>;
}
