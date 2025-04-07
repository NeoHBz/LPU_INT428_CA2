import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BarChart2, Lightbulb, BookOpen } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Thermometer, Droplets, Wind, AlertTriangle } from "lucide-react";
export default function HomePage() {
    return (
        <main className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-green-800 text-white">
                <div className="absolute inset-0 opacity-50 bg-[url('/static/nasa-yZygONrUBe8-unsplash.jpg')] bg-cover bg-center" />
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Climate Action Starts With Understanding
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Get informed, calculate your impact, and discover solutions to
                        climate change
                    </p>
                    <Link href="/chat">
                        <Button
                            size="lg"
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            Talk to ClimateBot <MessageCircle className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Climate Statistics */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Latest Climate Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="transition-all hover:shadow-lg bg-[#9FB3DF99]">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Thermometer className="h-5 w-5 text-red-500" />
                                    Global Temperature
                                </CardTitle>
                                <CardDescription>
                                    Rising above pre-industrial levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-red-500 mb-2">
                                    +1.2°C
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    The Earth's average temperature has increased by 1.2°C
                                    since pre-industrial times.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all hover:shadow-lg bg-[#FFF1D5]">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Wind className="h-5 w-5 text-slate-500" />
                                    CO₂ Concentration
                                </CardTitle>
                                <CardDescription>
                                    Parts per million in atmosphere
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    421 ppm
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    CO₂ levels are at their highest in over 800,000 years.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all hover:shadow-lg bg-[#71C9CE85]">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Droplets className="h-5 w-5 text-blue-500" />
                                    Sea Level Rise
                                </CardTitle>
                                <CardDescription>Increase since 1900</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-500 mb-2">
                                    +20 cm
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Global sea levels have risen by about 20 cm since
                                    1900.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all hover:shadow-lg bg-[#F3818185]">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    Extreme Weather
                                </CardTitle>
                                <CardDescription>Events per year</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-amber-500 mb-2">
                                    +46%
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Increase in weather-related disasters since 2000.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We believe that education is the first step toward meaningful
                            climate action. Our mission is to provide accessible, accurate
                            information about climate change and empower individuals to
                            make informed decisions that benefit our planet.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Explore Our Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<MessageCircle className="h-10 w-10 text-blue-500" />}
                            title="ClimateBot"
                            description="Chat with our AI assistant to get answers about climate change"
                            link="/chat"
                        />
                        <FeatureCard
                            icon={<BarChart2 className="h-10 w-10 text-green-500" />}
                            title="Impact Calculator"
                            description="Measure your carbon footprint and find ways to reduce it"
                            link="/calculator"
                        />
                        <FeatureCard
                            icon={<Lightbulb className="h-10 w-10 text-yellow-500" />}
                            title="Solutions Explorer"
                            description="Discover actions you can take at individual and community levels"
                            link="/solutions"
                        />
                        <FeatureCard
                            icon={<BookOpen className="h-10 w-10 text-teal-500" />}
                            title="Educational Hub"
                            description="Learn about climate science basics and latest research"
                            link="/learn"
                        />
                    </div>
                </div>
            </section>

            {/* How ClimateBot Works */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                                How ClimateBot Works
                            </h2>
                            <p className="text-lg text-gray-600 mb-4">
                                ClimateBot is powered by advanced AI technology, trained
                                on the latest climate science research and data. It can
                                answer your questions about climate change, provide
                                personalized advice, and help you understand complex
                                climate concepts.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                Whether you're curious about basic climate science, want
                                to understand your personal impact, or are looking for
                                solutions, ClimateBot is here to help.
                            </p>
                            <Link href="/chat">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                    Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                            <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                <p className="font-medium text-gray-800">User</p>
                                <p>What causes climate change?</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="font-medium text-blue-800">ClimateBot</p>
                                <p>
                                    Climate change is primarily caused by human activities
                                    that release greenhouse gases into the atmosphere. The
                                    main contributors are:
                                </p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        Burning fossil fuels (coal, oil, gas) for energy
                                    </li>
                                    <li>Deforestation and land use changes</li>
                                    <li>Industrial processes and agriculture</li>
                                </ul>
                                <p className="mt-2">
                                    These gases trap heat in our atmosphere, leading to
                                    global warming and climate change. The good news is
                                    that we have solutions to address these causes!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    link,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}) {
    return (
        <Link href={link}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="mt-auto">
                    <span className="text-blue-500 font-medium flex items-center">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
