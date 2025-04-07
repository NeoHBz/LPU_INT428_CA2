import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StatusResponse, Chat } from "./types";

const serverBaseURL: string = process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:9999";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({ baseUrl: serverBaseURL }), endpoints: (builder) => ({
        getStatus: builder.query<StatusResponse, void>({
            query: () => "status",
        }),
        startNewChat: builder.mutation<Chat, void>({
            query: () => ({
                url: "chat/new",
                method: "POST",
            }),
        }),
        sendChatMessage: builder.mutation<Chat, string>({
            query: (body) => ({
                url: "chat",
                method: "POST",
                body,
            }),
        }),
        getChatHistory: builder.query<Chat, void>({
            query: () => ({
                url: "chat",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetStatusQuery, useStartNewChatMutation, useSendChatMessageMutation } =
    chatApi;
