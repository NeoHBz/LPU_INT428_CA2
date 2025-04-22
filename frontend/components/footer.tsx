import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    const Link = ({
        href,
        children,
        className,
    }: {
        href: string;
        children: React.ReactNode;
        className?: string;
    }) => (
        <a
            href={href}
            className={`text-green-400 hover:text-white ${className}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ClimateAction</h3>
                        <p className="text-gray-400 mb-4">
                            Educating and empowering people to take action on climate
                            change.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chat"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Chat with ClimateBot
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculator"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Carbon Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Solutions Explorer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/learn"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Educational Hub
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Climate Data
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Research Papers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Educational Materials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Partner Organizations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Climate News
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400 mb-2">
                            Have questions or suggestions?
                        </p>
                        <a href="mailto:info@climateaction.org">info@climateaction.org</a>
                        <p className="text-gray-400 mt-4">
                            Subscribe to our newsletter for updates on climate science and
                            action.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} ClimateAction. All rights
                        reserved.
                    </p>
                    <p className="mt-2">
                        <Link href="#" className="hover:text-white">
                            Privacy Policy
                        </Link>{" "}
                        |
                        <Link href="#" className="hover:text-white ml-2">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
            {/* sticky footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 text-center">
                <p className="text-md flex justify-around">
                    <Link href="https://github.com/archita050206">
                        Archita Das (12307421)
                    </Link>
                    <Link href="https://github.com/neohbz">Saurav Lal (12316153)</Link>
                    <Link href="https://github.com/Tejas383">Tejasvita (12314183)</Link>
                </p>
            </div>
        </footer>
    );
}
