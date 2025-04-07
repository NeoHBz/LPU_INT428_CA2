"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Car,
    Home,
    Utensils,
    ShoppingBag,
    ArrowRight,
    Check,
    AlertTriangle,
} from "lucide-react";

export default function CalculatorPage() {
    const [formData, setFormData] = useState({
        transportation: {
            carMiles: 50,
            carEfficiency: "average",
            flightsPerYear: 2,
        },
        home: {
            energySource: "mixed",
            homeSize: "medium",
            occupants: 2,
        },
        diet: {
            dietType: "omnivore",
            localFood: 50,
        },
        consumption: {
            shoppingFrequency: "moderate",
            recycling: 50,
        },
    });

    const [showResults, setShowResults] = useState(false);

    const handleSliderChange = (category: string, field: string, value: number[]) => {
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category as keyof typeof prev],
                [field]: value[0],
            },
        }));
    };

    const handleSelectChange = (category: string, field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category as keyof typeof prev],
                [field]: value,
            },
        }));
    };

    const calculateFootprint = () => {
        // This would be a more complex calculation in a real app
        const transportationScore =
            (formData.transportation.carMiles / 10) *
                (formData.transportation.carEfficiency === "efficient"
                    ? 0.7
                    : formData.transportation.carEfficiency === "average"
                      ? 1
                      : 1.3) +
            formData.transportation.flightsPerYear * 1.2;

        const homeScore =
            ((formData.home.energySource === "renewable"
                ? 0.6
                : formData.home.energySource === "mixed"
                  ? 1
                  : 1.4) *
                (formData.home.homeSize === "small"
                    ? 0.8
                    : formData.home.homeSize === "medium"
                      ? 1
                      : 1.3)) /
            Math.sqrt(formData.home.occupants);

        const dietScore =
            (formData.diet.dietType === "vegan"
                ? 0.5
                : formData.diet.dietType === "vegetarian"
                  ? 0.7
                  : formData.diet.dietType === "pescatarian"
                    ? 0.8
                    : 1.2) *
            (2 - formData.diet.localFood / 100);

        const consumptionScore =
            (formData.consumption.shoppingFrequency === "minimal"
                ? 0.6
                : formData.consumption.shoppingFrequency === "moderate"
                  ? 1
                  : 1.4) *
            (2 - formData.consumption.recycling / 100);

        return {
            transportation: transportationScore,
            home: homeScore,
            diet: dietScore,
            consumption: consumptionScore,
            total: transportationScore + homeScore + dietScore + consumptionScore,
        };
    };

    const footprint = calculateFootprint();
    const maxPossibleScore = 15; // Approximate max score for comparison
    const footprintPercentage = (footprint.total / maxPossibleScore) * 100;

    const getRecommendations = () => {
        const recommendations = [];

        if (formData.transportation.carMiles > 30) {
            recommendations.push(
                "Consider carpooling or using public transportation to reduce car miles.",
            );
        }

        if (formData.transportation.carEfficiency === "inefficient") {
            recommendations.push(
                "Consider switching to a more fuel-efficient or electric vehicle.",
            );
        }

        if (formData.home.energySource === "fossil") {
            recommendations.push("Look into renewable energy options for your home.");
        }

        if (formData.diet.dietType === "omnivore") {
            recommendations.push(
                "Try incorporating more plant-based meals into your diet.",
            );
        }

        if (formData.diet.localFood < 50) {
            recommendations.push(
                "Buy more locally produced food to reduce transportation emissions.",
            );
        }

        if (formData.consumption.recycling < 70) {
            recommendations.push(
                "Improve your recycling habits and reduce single-use plastics.",
            );
        }

        if (formData.consumption.shoppingFrequency === "frequent") {
            recommendations.push(
                "Consider buying fewer, higher quality items that last longer.",
            );
        }

        return recommendations.length > 0
            ? recommendations
            : ["Great job! Keep up your eco-friendly habits."];
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
                Personal Carbon Footprint Calculator
            </h1>
            <p className="text-center text-gray-600 mb-8">
                Understand your impact and discover ways to reduce your carbon footprint
            </p>

            {!showResults ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Enter Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="transportation">
                            <TabsList className="grid grid-cols-4 mb-8">
                                <TabsTrigger
                                    value="transportation"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <Car className="h-5 w-5" />
                                    <span>Transportation</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="home"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <Home className="h-5 w-5" />
                                    <span>Home Energy</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="diet"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <Utensils className="h-5 w-5" />
                                    <span>Diet</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="consumption"
                                    className="flex flex-col items-center gap-2 py-4"
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    <span>Consumption</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="transportation" className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Average daily car miles
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[formData.transportation.carMiles]}
                                            min={0}
                                            max={100}
                                            step={1}
                                            onValueChange={(value) =>
                                                handleSliderChange(
                                                    "transportation",
                                                    "carMiles",
                                                    value,
                                                )
                                            }
                                            className="flex-grow"
                                        />
                                        <span className="w-12 text-right">
                                            {formData.transportation.carMiles} mi
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Car fuel efficiency
                                    </h3>
                                    <Select
                                        value={formData.transportation.carEfficiency}
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                "transportation",
                                                "carEfficiency",
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select efficiency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="efficient">
                                                Efficient (Electric/Hybrid)
                                            </SelectItem>
                                            <SelectItem value="average">
                                                Average (25-35 mpg)
                                            </SelectItem>
                                            <SelectItem value="inefficient\">
                                                Inefficient (&lt; 25 mpg)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Flights per year
                                    </h3>
                                    <Select
                                        value={formData.transportation.flightsPerYear.toString()}
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                "transportation",
                                                "flightsPerYear",
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select number of flights" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">0 flights</SelectItem>
                                            <SelectItem value="1">1 flight</SelectItem>
                                            <SelectItem value="2">2 flights</SelectItem>
                                            <SelectItem value="4">3-5 flights</SelectItem>
                                            <SelectItem value="8">6+ flights</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TabsContent>

                            <TabsContent value="home" className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Primary energy source
                                    </h3>
                                    <Select
                                        value={formData.home.energySource}
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                "home",
                                                "energySource",
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select energy source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="renewable">
                                                Renewable (Solar, Wind, etc.)
                                            </SelectItem>
                                            <SelectItem value="mixed">
                                                Mixed Sources
                                            </SelectItem>
                                            <SelectItem value="fossil">
                                                Primarily Fossil Fuels
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Home size
                                    </h3>
                                    <Select
                                        value={formData.home.homeSize}
                                        onValueChange={(value) =>
                                            handleSelectChange("home", "homeSize", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select home size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">
                                                Small (Apartment/Small House)
                                            </SelectItem>
                                            <SelectItem value="medium">
                                                Medium (Average House)
                                            </SelectItem>
                                            <SelectItem value="large">
                                                Large (Large House)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Number of occupants
                                    </h3>
                                    <Select
                                        value={formData.home.occupants.toString()}
                                        onValueChange={(value) =>
                                            handleSelectChange("home", "occupants", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select number of people" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 person</SelectItem>
                                            <SelectItem value="2">2 people</SelectItem>
                                            <SelectItem value="3">3 people</SelectItem>
                                            <SelectItem value="4">4 people</SelectItem>
                                            <SelectItem value="5">5+ people</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TabsContent>

                            <TabsContent value="diet" className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Diet type
                                    </h3>
                                    <Select
                                        value={formData.diet.dietType}
                                        onValueChange={(value) =>
                                            handleSelectChange("diet", "dietType", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select diet type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="vegan">Vegan</SelectItem>
                                            <SelectItem value="vegetarian">
                                                Vegetarian
                                            </SelectItem>
                                            <SelectItem value="pescatarian">
                                                Pescatarian
                                            </SelectItem>
                                            <SelectItem value="omnivore">
                                                Omnivore
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Percentage of locally produced food
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[formData.diet.localFood]}
                                            min={0}
                                            max={100}
                                            step={5}
                                            onValueChange={(value) =>
                                                handleSliderChange(
                                                    "diet",
                                                    "localFood",
                                                    value,
                                                )
                                            }
                                            className="flex-grow"
                                        />
                                        <span className="w-12 text-right">
                                            {formData.diet.localFood}%
                                        </span>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="consumption" className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Shopping frequency
                                    </h3>
                                    <Select
                                        value={formData.consumption.shoppingFrequency}
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                "consumption",
                                                "shoppingFrequency",
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select shopping frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="minimal">
                                                Minimal (Only essentials)
                                            </SelectItem>
                                            <SelectItem value="moderate">
                                                Moderate
                                            </SelectItem>
                                            <SelectItem value="frequent">
                                                Frequent (Regular new purchases)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Recycling and waste reduction efforts
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[formData.consumption.recycling]}
                                            min={0}
                                            max={100}
                                            step={5}
                                            onValueChange={(value) =>
                                                handleSliderChange(
                                                    "consumption",
                                                    "recycling",
                                                    value,
                                                )
                                            }
                                            className="flex-grow"
                                        />
                                        <span className="w-12 text-right">
                                            {formData.consumption.recycling}%
                                        </span>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-8 flex justify-end">
                            <Button
                                onClick={() => setShowResults(true)}
                                className="bg-green-500 hover:bg-green-600"
                            >
                                Calculate My Footprint{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Your Carbon Footprint Results
                                <Button
                                    variant="outline"
                                    onClick={() => setShowResults(false)}
                                >
                                    Edit Inputs
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-4">
                                    Overall Footprint
                                </h3>
                                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute top-0 left-0 h-full ${
                                            footprintPercentage < 33
                                                ? "bg-green-500"
                                                : footprintPercentage < 66
                                                  ? "bg-yellow-500"
                                                  : "bg-red-500"
                                        }`}
                                        style={{
                                            width: `${Math.min(footprintPercentage, 100)}%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-sm">
                                    <span>Low Impact</span>
                                    <span>Average</span>
                                    <span>High Impact</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        Breakdown by Category
                                    </h3>
                                    <div className="space-y-4">
                                        <CategoryBar
                                            label="Transportation"
                                            value={footprint.transportation}
                                            maxValue={5}
                                            icon={<Car className="h-4 w-4" />}
                                        />
                                        <CategoryBar
                                            label="Home Energy"
                                            value={footprint.home}
                                            maxValue={5}
                                            icon={<Home className="h-4 w-4" />}
                                        />
                                        <CategoryBar
                                            label="Diet"
                                            value={footprint.diet}
                                            maxValue={5}
                                            icon={<Utensils className="h-4 w-4" />}
                                        />
                                        <CategoryBar
                                            label="Consumption"
                                            value={footprint.consumption}
                                            maxValue={5}
                                            icon={<ShoppingBag className="h-4 w-4" />}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        Personalized Recommendations
                                    </h3>
                                    <ul className="space-y-2">
                                        {getRecommendations().map(
                                            (recommendation, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2"
                                                >
                                                    {recommendation.startsWith(
                                                        "Great job",
                                                    ) ? (
                                                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <span>{recommendation}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            Want to learn more about reducing your carbon footprint?
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                className="border-blue-500 text-blue-500 hover:bg-blue-50"
                                asChild
                            >
                                <a href="/solutions">Explore Solutions</a>
                            </Button>
                            <Button className="bg-green-500 hover:bg-green-600" asChild>
                                <a href="/chat">Chat with ClimateBot</a>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function CategoryBar({
    label,
    value,
    maxValue,
    icon,
}: {
    label: string;
    value: number;
    maxValue: number;
    icon: React.ReactNode;
}) {
    const percentage = (value / maxValue) * 100;

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="text-sm font-medium">
                    {value.toFixed(1)}/{maxValue.toFixed(1)}
                </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full ${
                        percentage < 33
                            ? "bg-green-500"
                            : percentage < 66
                              ? "bg-yellow-500"
                              : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>
        </div>
    );
}
