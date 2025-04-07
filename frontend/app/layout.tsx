"use client";
import type React from "react";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Climate Action - Educational Climate Change Awareness",
//     description:
//         "Learn about climate change, calculate your carbon footprint, and discover solutions with our AI-powered climate education platform.",
//     generator: "v0.dev",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider store={store}>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <div className="flex-grow">{children}</div>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </Provider>
            </body>
        </html>
    );
}

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/services/store";
