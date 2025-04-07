import type React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Users,
    Building2,
    Star,
    Clock,
    Leaf,
    Droplets,
    Zap,
    Car,
    Utensils,
    Recycle,
    Home,
} from "lucide-react";

export default function SolutionsPage() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
                Climate Solutions Explorer
            </h1>
            <p className="text-center text-gray-600 mb-8">
                Discover actions you can take to combat climate change at every level
            </p>

            <Tabs defaultValue="individual">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="individual" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Individual Actions</span>
                    </TabsTrigger>
                    <TabsTrigger value="community" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Community Initiatives</span>
                    </TabsTrigger>
                    <TabsTrigger value="policy" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>Policy Changes</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="individual">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SolutionCard
                            title="Switch to Renewable Energy"
                            description="Install solar panels or switch to a renewable energy provider for your home electricity needs."
                            icon={<Zap className="h-6 w-6 text-yellow-500" />}
                            impact="High"
                            difficulty="Medium"
                            timeframe="Long-term"
                            category="Energy"
                        />

                        <SolutionCard
                            title="Reduce Meat Consumption"
                            description="Adopt a more plant-based diet by reducing meat consumption, especially red meat."
                            icon={<Utensils className="h-6 w-6 text-green-500" />}
                            impact="High"
                            difficulty="Medium"
                            timeframe="Immediate"
                            category="Food"
                        />

                        <SolutionCard
                            title="Use Public Transportation"
                            description="Reduce your carbon footprint by using public transportation, carpooling, or biking instead of driving alone."
                            icon={<Car className="h-6 w-6 text-blue-500" />}
                            impact="Medium"
                            difficulty="Low"
                            timeframe="Immediate"
                            category="Transportation"
                        />

                        <SolutionCard
                            title="Improve Home Energy Efficiency"
                            description="Upgrade insulation, use energy-efficient appliances, and adopt smart home technology to reduce energy consumption."
                            icon={<Home className="h-6 w-6 text-purple-500" />}
                            impact="Medium"
                            difficulty="Medium"
                            timeframe="Medium-term"
                            category="Energy"
                        />

                        <SolutionCard
                            title="Reduce, Reuse, Recycle"
                            description="Minimize waste by reducing consumption, reusing items, and properly recycling materials."
                            icon={<Recycle className="h-6 w-6 text-teal-500" />}
                            impact="Medium"
                            difficulty="Low"
                            timeframe="Immediate"
                            category="Waste"
                        />

                        <SolutionCard
                            title="Conserve Water"
                            description="Install water-efficient fixtures, fix leaks, and adopt water-saving habits in your daily routine."
                            icon={<Droplets className="h-6 w-6 text-blue-500" />}
                            impact="Low"
                            difficulty="Low"
                            timeframe="Immediate"
                            category="Water"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="community">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SolutionCard
                            title="Community Solar Projects"
                            description="Participate in or initiate community solar projects that allow multiple households to benefit from shared renewable energy."
                            icon={<Zap className="h-6 w-6 text-yellow-500" />}
                            impact="High"
                            difficulty="High"
                            timeframe="Long-term"
                            category="Energy"
                        />

                        <SolutionCard
                            title="Local Food Systems"
                            description="Support farmers' markets, community gardens, and food co-ops to reduce food miles and strengthen local food security."
                            icon={<Leaf className="h-6 w-6 text-green-500" />}
                            impact="Medium"
                            difficulty="Medium"
                            timeframe="Medium-term"
                            category="Food"
                        />

                        <SolutionCard
                            title="Carpooling Networks"
                            description="Establish or join carpooling networks in your neighborhood or workplace to reduce transportation emissions."
                            icon={<Car className="h-6 w-6 text-blue-500" />}
                            impact="Medium"
                            difficulty="Low"
                            timeframe="Immediate"
                            category="Transportation"
                        />

                        <SolutionCard
                            title="Community Composting"
                            description="Start or join a community composting program to divert organic waste from landfills and create nutrient-rich soil."
                            icon={<Recycle className="h-6 w-6 text-teal-500" />}
                            impact="Medium"
                            difficulty="Medium"
                            timeframe="Medium-term"
                            category="Waste"
                        />

                        <SolutionCard
                            title="Tree Planting Initiatives"
                            description="Participate in or organize tree planting events to increase urban canopy and carbon sequestration."
                            icon={<Leaf className="h-6 w-6 text-green-500" />}
                            impact="Medium"
                            difficulty="Low"
                            timeframe="Long-term"
                            category="Land Use"
                        />

                        <SolutionCard
                            title="Climate Education Programs"
                            description="Develop or support climate education programs in schools and community centers to raise awareness and inspire action."
                            icon={<Users className="h-6 w-6 text-purple-500" />}
                            impact="Medium"
                            difficulty="Medium"
                            timeframe="Medium-term"
                            category="Education"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="policy">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SolutionCard
                            title="Carbon Pricing"
                            description="Support policies that put a price on carbon emissions, creating economic incentives for reducing greenhouse gas emissions."
                            icon={<Building2 className="h-6 w-6 text-blue-500" />}
                            impact="High"
                            difficulty="High"
                            timeframe="Medium-term"
                            category="Economy"
                        />

                        <SolutionCard
                            title="Renewable Energy Standards"
                            description="Advocate for policies requiring utilities to obtain a certain percentage of their electricity from renewable sources."
                            icon={<Zap className="h-6 w-6 text-yellow-500" />}
                            impact="High"
                            difficulty="High"
                            timeframe="Long-term"
                            category="Energy"
                        />

                        <SolutionCard
                            title="Public Transportation Investment"
                            description="Support increased funding for public transportation infrastructure and services."
                            icon={<Car className="h-6 w-6 text-blue-500" />}
                            impact="High"
                            difficulty="High"
                            timeframe="Long-term"
                            category="Transportation"
                        />

                        <SolutionCard
                            title="Building Efficiency Standards"
                            description="Advocate for stronger building codes that require energy efficiency in new construction and major renovations."
                            icon={<Home className="h-6 w-6 text-purple-500" />}
                            impact="Medium"
                            difficulty="Medium"
                            timeframe="Medium-term"
                            category="Energy"
                        />

                        <SolutionCard
                            title="Protect Natural Carbon Sinks"
                            description="Support policies that protect forests, wetlands, and other ecosystems that naturally absorb carbon dioxide."
                            icon={<Leaf className="h-6 w-6 text-green-500" />}
                            impact="High"
                            difficulty="Medium"
                            timeframe="Long-term"
                            category="Land Use"
                        />

                        <SolutionCard
                            title="Circular Economy Policies"
                            description="Advocate for policies that promote product longevity, repairability, and recyclability to reduce waste and resource consumption."
                            icon={<Recycle className="h-6 w-6 text-teal-500" />}
                            impact="Medium"
                            difficulty="High"
                            timeframe="Long-term"
                            category="Waste"
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
}

function SolutionCard({
    title,
    description,
    icon,
    impact,
    difficulty,
    timeframe,
    category,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    impact: "Low" | "Medium" | "High";
    difficulty: "Low" | "Medium" | "High";
    timeframe: "Immediate" | "Medium-term" | "Long-term";
    category: string;
}) {
    const getImpactColor = (impact: string) => {
        switch (impact) {
            case "Low":
                return "bg-yellow-100 text-yellow-800";
            case "Medium":
                return "bg-blue-100 text-blue-800";
            case "High":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Low":
                return "bg-green-100 text-green-800";
            case "Medium":
                return "bg-yellow-100 text-yellow-800";
            case "High":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTimeframeColor = (timeframe: string) => {
        switch (timeframe) {
            case "Immediate":
                return "bg-purple-100 text-purple-800";
            case "Medium-term":
                return "bg-blue-100 text-blue-800";
            case "Long-term":
                return "bg-indigo-100 text-indigo-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="p-2 rounded-full bg-gray-100">{icon}</div>
                    <Badge variant="outline">{category}</Badge>
                </div>
                <CardTitle className="mt-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <Badge variant="secondary" className={getImpactColor(impact)}>
                            {impact} Impact
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <Badge
                            variant="secondary"
                            className={getTimeframeColor(timeframe)}
                        >
                            {timeframe}
                        </Badge>
                    </div>
                    <Badge variant="secondary" className={getDifficultyColor(difficulty)}>
                        {difficulty} Difficulty
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
