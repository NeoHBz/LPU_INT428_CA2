"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    // Function to check if a path is active (exact match or starts with for nested routes)
    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path;
        }
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    // Get the active link class
    const getLinkClass = (path: string) => {
        return isActive(path)
            ? "text-blue-600 font-medium"
            : "text-gray-700 hover:text-blue-500";
    };

    // Map routes to page titles
    const routeTitles: Record<string, string> = {
        "/": "Home",
        "/chat": "Chat with ClimateBot",
        "/calculator": "Carbon Calculator",
        "/solutions": "Climate Solutions",
        "/learn": "Learn About Climate",
    };

    // Update document title based on active route
    useEffect(() => {
        // Find the matching route or use a default
        const baseTitle = "ClimateAction";

        // Exact match first
        if (routeTitles[pathname]) {
            document.title = routeTitles[pathname];
            return;
        }

        // Check for nested routes
        for (const [route, title] of Object.entries(routeTitles)) {
            if (route !== "/" && pathname.startsWith(`${route}/`)) {
                document.title = title;
                return;
            }
        }

        // Default title if no match found
        document.title = baseTitle;
    }, [pathname]);

    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                    <span className="font-bold text-xl">ClimateAction</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className={getLinkClass("/")}>
                        Home
                    </Link>
                    <Link href="/chat" className={getLinkClass("/chat")}>
                        Chat
                    </Link>
                    <Link href="/calculator" className={getLinkClass("/calculator")}>
                        Calculator
                    </Link>
                    <Link href="/solutions" className={getLinkClass("/solutions")}>
                        Solutions
                    </Link>
                    <Link href="/learn" className={getLinkClass("/learn")}>
                        Learn
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Link href="/chat">
                        <Button className="bg-green-500 hover:bg-green-600">
                            <MessageCircle className="mr-2 h-4 w-4" /> Talk to ClimateBot
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
