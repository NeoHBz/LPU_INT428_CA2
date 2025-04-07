import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Climate Action - Educational Climate Change Awareness",
    description:
        "Learn about climate change, calculate your carbon footprint, and discover solutions with our AI-powered climate education platform.",
    keywords: [
        "climate change",
        "climate action",
        "climate awareness",
        "carbon footprint",
        "sustainability",
        "environmental education",
        "climate solutions",
        "AI-powered education",
        "climate change calculator",
    ],
    image: "https://lpu-int-428-ca2.vercel.app/static/og_image.png",
    images: [
        {
            url: "https://lpu-int-428-ca2.vercel.app/static/og_image.png",
            width: 1200,
            height: 630,
            alt: "Climate Action",
        },
    ],
    openGraph: {
        title: "Climate Action - Educational Climate Change Awareness",
        description:
            "Learn about climate change, calculate your carbon footprint, and discover solutions with our AI-powered climate education platform.",
        url: "https://lpu-int-428-ca2.vercel.app",
        siteName: "Climate Action",
        images: [
            {
                url: "https://lpu-int-428-ca2.vercel.app/static/og_image.png",
                width: 1200,
                height: 630,
                alt: "Climate Action",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Climate Action - Educational Climate Change Awareness",
        description:
            "Learn about climate change, calculate your carbon footprint, and discover solutions with our AI-powered climate education platform.",
        images: [
            {
                url: "https://lpu-int-428-ca2.vercel.app/static/og_image.png",
                alt: "Climate Action",
            },
        ],
    },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <div className="flex-grow">{children}</div>
                            <Footer />
                        </div>
                    </ThemeProvider>
            </body>
        </html>
    );
}
