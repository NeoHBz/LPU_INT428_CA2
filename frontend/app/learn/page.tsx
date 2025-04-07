"use client";

import type React from "react";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, HelpCircle, BarChart2, ExternalLink } from "lucide-react";
import Link from "next/link";
interface BasicItem {
    id: string;
    question: string;
    answer: React.ReactNode;
}
export default function LearnPage() {
    const basicData: BasicItem[] = [
        {
            id: "item-1",
            question: "What is the difference between weather and climate?",
            answer: (
                <>
                    <p className="mb-4">
                        <strong>Weather</strong> refers to short-term atmospheric
                        conditions like temperature, humidity, precipitation, and wind
                        that occur over hours or days in a specific place.
                    </p>
                    <p>
                        <strong>Climate</strong> is the average weather pattern in a
                        region over a long period, typically 30 years or more. It's the
                        big picture of weather over time.
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-medium">Analogy:</p>
                        <p className="text-blue-700">
                            Weather is like your mood on any given day, while climate is
                            like your personality over your lifetime.
                        </p>
                    </div>
                </>
            ),
        },
        {
            id: "item-2",
            question: "What is the greenhouse effect?",
            answer: (
                <>
                    <p className="mb-4">
                        The greenhouse effect is a natural process that warms the Earth's
                        surface. When the Sun's energy reaches the Earth's atmosphere,
                        some of it is reflected back to space and the rest is absorbed and
                        re-radiated by greenhouse gases.
                    </p>
                    <p className="mb-4">
                        <strong>Greenhouse gases</strong> include water vapor, carbon
                        dioxide (CO₂), methane (CH₄), nitrous oxide (N₂O), and ozone (O₃).
                        These gases act like a blanket, trapping heat in the atmosphere
                        and warming the planet.
                    </p>
                    <p>
                        The natural greenhouse effect is essential for life on Earth.
                        Without it, the planet would be too cold to support life. However,
                        human activities are enhancing this effect, leading to global
                        warming.
                    </p>
                </>
            ),
        },
        {
            id: "item-3",
            question: "What causes climate change?",
            answer: (
                <>
                    <p className="mb-4">
                        Climate change is caused by both natural factors and human
                        activities, but the current rapid warming is primarily due to
                        human influences.
                    </p>
                    <p className="font-medium mb-2">Natural causes include:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Changes in the sun's intensity</li>
                        <li>Volcanic eruptions</li>
                        <li>Natural cycles in Earth's orbit</li>
                    </ul>
                    <p className="font-medium mb-2">Human causes include:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Burning fossil fuels (coal, oil, gas)</li>
                        <li>Deforestation and land use changes</li>
                        <li>Industrial processes and agriculture</li>
                        <li>Waste management</li>
                    </ul>
                    <p>
                        The scientific consensus is that human activities are the dominant
                        cause of observed warming since the mid-20th century.
                    </p>
                </>
            ),
        },
        {
            id: "item-4",
            question: "How do we know climate change is happening?",
            answer: (
                <>
                    <p className="mb-4">
                        Scientists use multiple lines of evidence to track climate change:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            <strong>Temperature records:</strong> Global temperature data
                            show a clear warming trend.
                        </li>
                        <li>
                            <strong>Ice cores:</strong> Reveal past CO₂ levels and
                            temperatures.
                        </li>
                        <li>
                            <strong>Sea level rise:</strong> Caused by melting ice and
                            thermal expansion.
                        </li>
                        <li>
                            <strong>Ocean acidification:</strong> Due to increased CO₂
                            affecting marine life.
                        </li>
                        <li>
                            <strong>Retreating glaciers:</strong> Shrinking at
                            unprecedented rates.
                        </li>
                        <li>
                            <strong>Ecological changes:</strong> Migration shifts, altered
                            blooming seasons.
                        </li>
                    </ul>
                    <p>All these point to rapid human-caused climate change.</p>
                </>
            ),
        },
        {
            id: "item-5",
            question: "What are the impacts of climate change?",
            answer: (
                <>
                    <p className="mb-4">
                        Climate change affects virtually every aspect of our planet:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            <strong>Rising temperatures:</strong> Heat waves and global
                            warming.
                        </li>
                        <li>
                            <strong>Changing precipitation patterns:</strong> More
                            rainfall in some regions, drought in others.
                        </li>
                        <li>
                            <strong>Extreme weather events:</strong> Hurricanes,
                            wildfires, floods.
                        </li>
                        <li>
                            <strong>Sea level rise:</strong> Threatens coastal areas and
                            ecosystems.
                        </li>
                        <li>
                            <strong>Ecosystem disruption:</strong> Extinctions and habitat
                            shifts.
                        </li>
                        <li>
                            <strong>Human health:</strong> Illness, disease spread, air
                            quality issues.
                        </li>
                        <li>
                            <strong>Food and water security:</strong> Crop failures, water
                            scarcity.
                        </li>
                        <li>
                            <strong>Economic impacts:</strong> Infrastructure damage,
                            rising costs.
                        </li>
                    </ul>
                    <p>The extent depends on how fast we act to reduce emissions.</p>
                </>
            ),
        },
        {
            id: "item-6",
            question: "What are renewable energy sources?",
            answer: (
                <>
                    <p className="mb-4">
                        Renewable energy sources are those that are naturally replenished
                        on a human timescale and have minimal environmental impact
                        compared to fossil fuels.
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            <strong>Solar energy:</strong> Captures sunlight using
                            photovoltaic cells or solar thermal systems.
                        </li>
                        <li>
                            <strong>Wind energy:</strong> Uses wind turbines to generate
                            electricity from wind motion.
                        </li>
                        <li>
                            <strong>Hydropower:</strong> Converts the energy of flowing
                            water into electricity.
                        </li>
                        <li>
                            <strong>Geothermal energy:</strong> Utilizes heat from beneath
                            the Earth's surface.
                        </li>
                        <li>
                            <strong>Biomass:</strong> Organic material like wood, crop
                            waste, or animal manure burned or processed for energy.
                        </li>
                    </ul>
                    <p>
                        These sources are critical for reducing carbon emissions and
                        ensuring a sustainable energy future.
                    </p>
                </>
            ),
        },
        {
            id: "item-7",
            question: "How does deforestation affect climate change?",
            answer: (
                <>
                    <p className="mb-4">
                        Deforestation contributes significantly to climate change by
                        reducing the Earth's capacity to absorb carbon dioxide (CO₂).
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            Trees act as carbon sinks, absorbing CO₂ during
                            photosynthesis. Cutting them down releases stored carbon back
                            into the atmosphere.
                        </li>
                        <li>
                            Forest clearing often involves burning, which adds additional
                            greenhouse gases.
                        </li>
                        <li>
                            Loss of forest cover disrupts local water cycles and leads to
                            hotter, drier conditions.
                        </li>
                    </ul>
                    <p>
                        Forests also provide biodiversity and ecosystem services.
                        Sustainable land use and reforestation are key strategies in
                        climate mitigation.
                    </p>
                </>
            ),
        },
        {
            id: "item-8",
            question: "What are climate adaptation and mitigation strategies?",
            answer: (
                <>
                    <p className="mb-4">
                        Addressing climate change involves two major strategies:
                        adaptation and mitigation.
                    </p>
                    <p className="font-medium mb-2">Mitigation:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            Reducing greenhouse gas emissions from energy, transport, and
                            agriculture
                        </li>
                        <li>
                            Shifting to renewable energy and improving energy efficiency
                        </li>
                        <li>Reforestation and carbon capture technologies</li>
                    </ul>
                    <p className="font-medium mb-2">Adaptation:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Designing climate-resilient infrastructure</li>
                        <li>Improving water management and agricultural practices</li>
                        <li>Developing early warning systems for extreme weather</li>
                    </ul>
                    <p>
                        Both approaches are essential to minimize future risks and protect
                        vulnerable populations.
                    </p>
                </>
            ),
        },
        {
            id: "item-9",
            question: "What role do oceans play in regulating climate?",
            answer: (
                <>
                    <p className="mb-4">
                        Oceans play a crucial role in Earth's climate system by absorbing
                        and redistributing heat and carbon dioxide.
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>
                            Oceans absorb over 90% of the excess heat from global warming,
                            moderating land temperatures.
                        </li>
                        <li>
                            They act as carbon sinks, taking in about a quarter of
                            human-generated CO₂ emissions.
                        </li>
                        <li>
                            Ocean currents, such as the Gulf Stream, transport warm and
                            cold water across the globe, influencing regional climates.
                        </li>
                        <li>
                            Warming oceans affect weather patterns, leading to stronger
                            hurricanes, altered monsoons, and disrupted ecosystems.
                        </li>
                    </ul>
                    <p>
                        Ocean health is critical for climate stability. Ocean
                        acidification and rising sea temperatures threaten marine
                        biodiversity and food security.
                    </p>
                </>
            ),
        },
    ];

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
                Climate Education Hub
            </h1>
            <p className="text-center text-gray-600 mb-8">
                Learn about climate science, common misconceptions, and the latest
                research
            </p>

            <Tabs defaultValue="basics">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="basics" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Climate Science Basics</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="misconceptions"
                        className="flex items-center gap-2"
                    >
                        <HelpCircle className="h-4 w-4" />
                        <span>Common Misconceptions</span>
                    </TabsTrigger>
                    <TabsTrigger value="research" className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4" />
                        <span>Latest Research</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basics">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Understanding Climate Science</CardTitle>
                                    <CardDescription>
                                        The fundamental concepts that explain our changing
                                        climate
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        {basicData.map((item) => (
                                            <Accordion
                                                key={item.id}
                                                type="single"
                                                collapsible
                                                className="w-full"
                                            >
                                                <AccordionItem value={item.id}>
                                                    <AccordionTrigger>
                                                        {item.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Climate Timeline</CardTitle>
                                    <CardDescription>
                                        Key events in climate science and policy
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative border-l-2 border-blue-200 pl-6 space-y-6">
                                        <TimelineItem
                                            year="1824"
                                            title="Greenhouse Effect Discovered"
                                        >
                                            Joseph Fourier describes the Earth's natural
                                            "greenhouse effect"
                                        </TimelineItem>

                                        <TimelineItem
                                            year="1938"
                                            title="Human-Caused Warming"
                                        >
                                            Guy Callendar links CO₂ increases from human
                                            activities to warming
                                        </TimelineItem>

                                        <TimelineItem
                                            year="1958"
                                            title="CO₂ Monitoring Begins"
                                        >
                                            Charles David Keeling begins measuring
                                            atmospheric CO₂ at Mauna Loa
                                        </TimelineItem>

                                        <TimelineItem
                                            year="1988"
                                            title="IPCC Established"
                                        >
                                            The Intergovernmental Panel on Climate Change
                                            is formed
                                        </TimelineItem>

                                        <TimelineItem year="1992" title="Earth Summit">
                                            UN Framework Convention on Climate Change is
                                            adopted
                                        </TimelineItem>

                                        <TimelineItem year="1997" title="Kyoto Protocol">
                                            First international agreement to reduce
                                            greenhouse gases
                                        </TimelineItem>

                                        <TimelineItem year="2015" title="Paris Agreement">
                                            Global agreement to limit warming to well
                                            below 2°C
                                        </TimelineItem>

                                        <TimelineItem
                                            year="2018"
                                            title="IPCC Special Report"
                                        >
                                            Report on impacts of global warming of 1.5°C
                                        </TimelineItem>

                                        <TimelineItem year="2021" title="COP26">
                                            Glasgow Climate Pact accelerates action on
                                            climate change
                                        </TimelineItem>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>The Carbon Cycle</CardTitle>
                                <CardDescription>
                                    Understanding how carbon moves through Earth's systems
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <p className="mb-4">
                                            The carbon cycle is the process by which
                                            carbon moves between different reservoirs on
                                            Earth, including the atmosphere, oceans, soil,
                                            plants, and fossil fuels.
                                        </p>
                                        <p className="mb-4">
                                            {" "}
                                            soil, plants, and fossil fuels.
                                        </p>
                                        <p className="mb-4">
                                            Carbon naturally flows between these
                                            reservoirs in a balanced cycle. Plants absorb
                                            CO₂ during photosynthesis, animals consume
                                            plants and release CO₂ through respiration,
                                            and when organisms die, carbon returns to the
                                            soil and oceans.
                                        </p>
                                        <p>
                                            Human activities have disrupted this natural
                                            balance by:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2">
                                            <li>
                                                Burning fossil fuels (releasing carbon
                                                that was stored underground for millions
                                                of years)
                                            </li>
                                            <li>
                                                Deforestation (reducing the planet's
                                                ability to absorb carbon)
                                            </li>
                                            <li>
                                                Land use changes (disturbing carbon stored
                                                in soils)
                                            </li>
                                        </ul>
                                        <div className="mt-6">
                                            <Link href="/chat">
                                                <Button className="bg-green-500 hover:bg-green-600">
                                                    Ask ClimateBot about the Carbon Cycle{" "}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="aspect-video bg-white rounded-lg flex items-center justify-center outline outline-2 outline-black">
                                            <img
                                                src="/static/Carbon Cycle Infographic.png"
                                                alt="Carbon Cycle Infographic"
                                                className="rounded-lg w-full h-auto object-cover user-select-none pointer-events-none"
                                            />
                                        </div>
                                        <p className="text-center text-gray-500 mt-2">
                                            Carbon Cycle Infographic
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="misconceptions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Climate Misconceptions Debunked</CardTitle>
                            <CardDescription>
                                Addressing common myths and misunderstandings about
                                climate change
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="myth-1">
                                    <AccordionTrigger>
                                        Myth: The climate has changed before, so current
                                        changes are natural
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2">
                                                <p className="mb-4">
                                                    <strong>Reality:</strong> While
                                                    Earth's climate has indeed changed
                                                    throughout history, the current rate
                                                    of change is unprecedented in human
                                                    history.
                                                </p>
                                                <p className="mb-4">
                                                    Natural climate changes typically
                                                    occur over thousands or millions of
                                                    years, giving ecosystems and species
                                                    time to adapt. Current changes are
                                                    happening over decades, primarily due
                                                    to human activities.
                                                </p>
                                                <p>
                                                    Scientists can distinguish between
                                                    natural and human-caused warming
                                                    through multiple lines of evidence,
                                                    including:
                                                </p>
                                                <ul className="list-disc pl-5 mt-2">
                                                    <li>
                                                        The pattern of warming in the
                                                        atmosphere and oceans matches what
                                                        would be expected from greenhouse
                                                        gas increases, not natural factors
                                                        like solar changes
                                                    </li>
                                                    <li>
                                                        Carbon isotope analysis shows the
                                                        additional CO₂ in the atmosphere
                                                        comes from burning fossil fuels
                                                    </li>
                                                    <li>
                                                        Climate models can only reproduce
                                                        observed warming when human
                                                        factors are included
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-gray-100 p-4 rounded-lg">
                                                <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                                                    <img
                                                        src="/static/Temperature Change Graph.png"
                                                        alt="Temperature Change Graph"
                                                        className="rounded-lg w-full h-auto object-cover user-select-none pointer-events-none"
                                                    />
                                                </div>
                                                <p className="text-center text-gray-500 mt-2">
                                                    Temperature Change Graph
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="myth-2">
                                    <AccordionTrigger>
                                        Myth: Scientists disagree about whether climate
                                        change is happening
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mb-4">
                                            <strong>Reality:</strong> There is
                                            overwhelming scientific consensus that climate
                                            change is real and human-caused.
                                        </p>
                                        <p className="mb-4">
                                            Multiple studies have shown that 97-99% of
                                            actively publishing climate scientists agree
                                            that climate change is happening and that
                                            human activities are the primary cause. This
                                            consensus is supported by virtually every
                                            major scientific organization worldwide.
                                        </p>
                                        <p className="mb-4">
                                            The small number of contrarian studies have
                                            typically been found to contain methodological
                                            flaws or misinterpretations of data. The
                                            scientific debate has moved beyond whether
                                            climate change is happening to questions about
                                            specific impacts and the most effective
                                            solutions.
                                        </p>
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <p className="text-blue-800 font-medium">
                                                Scientific Organizations Endorsing Climate
                                                Change Science:
                                            </p>
                                            <ul className="list-disc pl-5 mt-2 text-blue-700">
                                                <li>National Academy of Sciences</li>
                                                <li>American Meteorological Society</li>
                                                <li>American Geophysical Union</li>
                                                <li>World Meteorological Organization</li>
                                                <li>
                                                    Intergovernmental Panel on Climate
                                                    Change
                                                </li>
                                            </ul>
                                            And many more...
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="myth-3">
                                    <AccordionTrigger>
                                        Myth: It's cold outside, so global warming isn't
                                        happening
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mb-4">
                                            <strong>Reality:</strong> Weather is not
                                            climate. Short-term weather patterns don't
                                            negate long-term climate trends.
                                        </p>
                                        <p className="mb-4">
                                            Global warming refers to the increase in
                                            Earth's average surface temperature over time.
                                            It doesn't mean that cold weather no longer
                                            exists or that every location on Earth is
                                            warming uniformly.
                                        </p>
                                        <p className="mb-4">
                                            In fact, climate change can lead to more
                                            extreme weather of all types, including cold
                                            snaps in some regions. This is because warming
                                            disrupts established weather patterns and can
                                            affect jet streams and other atmospheric
                                            circulation patterns.
                                        </p>
                                        <p>
                                            The key is to look at global averages over
                                            time, not individual weather events or local
                                            conditions. When we do this, the warming trend
                                            is clear and consistent.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="myth-4">
                                    <AccordionTrigger>
                                        Myth: CO₂ is a minor greenhouse gas and can't
                                        cause significant warming
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mb-4">
                                            <strong>Reality:</strong> While CO₂ is not the
                                            most powerful greenhouse gas
                                            molecule-for-molecule, its abundance and
                                            persistence make it the primary driver of
                                            current climate change.
                                        </p>
                                        <p className="mb-4">
                                            Carbon dioxide remains in the atmosphere for
                                            hundreds to thousands of years, unlike some
                                            other greenhouse gases that break down more
                                            quickly. This means CO₂ emissions have a
                                            cumulative effect, building up over time.
                                        </p>
                                        <p className="mb-4">
                                            Human activities have increased atmospheric
                                            CO₂ by about 50% since pre-industrial times,
                                            from 280 ppm to over 415 ppm today. This
                                            increase closely correlates with observed
                                            warming.
                                        </p>
                                        <p>
                                            The greenhouse effect of CO₂ has been
                                            understood for over 150 years and is based on
                                            well-established physics. Laboratory
                                            experiments, observations of Earth and other
                                            planets, and paleoclimate records all confirm
                                            CO₂'s role as a significant greenhouse gas.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="myth-5">
                                    <AccordionTrigger>
                                        Myth: Climate action will harm the economy
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mb-4">
                                            <strong>Reality:</strong> Economic analyses
                                            increasingly show that the cost of inaction on
                                            climate change far exceeds the cost of
                                            reducing emissions.
                                        </p>
                                        <p className="mb-4">
                                            Climate change is already imposing significant
                                            economic costs through:
                                        </p>
                                        <ul className="list-disc pl-5 mb-4">
                                            <li>
                                                Damage from more frequent and severe
                                                extreme weather events
                                            </li>
                                            <li>
                                                Rising sea levels threatening coastal
                                                infrastructure
                                            </li>
                                            <li>Reduced agricultural productivity</li>
                                            <li>
                                                Health impacts and associated healthcare
                                                costs
                                            </li>
                                            <li>
                                                Climate migration and geopolitical
                                                instability
                                            </li>
                                        </ul>
                                        <p className="mb-4">
                                            Meanwhile, the transition to clean energy is
                                            creating new economic opportunities and jobs.
                                            Renewable energy is now often cheaper than
                                            fossil fuels, and energy efficiency measures
                                            typically save money over time.
                                        </p>
                                        <p>
                                            Many businesses are recognizing that climate
                                            action makes economic sense, both to reduce
                                            risks and to capitalize on new markets for
                                            clean technologies and services.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="research">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Latest Climate Research</CardTitle>
                                <CardDescription>
                                    Recent findings and developments in climate science
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ResearchCard
                                        title="Tipping Points in the Climate System"
                                        description="Recent research suggests some critical climate tipping points may be closer than previously thought. These include the collapse of major ice sheets, Amazon rainforest dieback, and changes to ocean circulation patterns."
                                        date="2023"
                                        source="Nature Climate Change"
                                    />

                                    <ResearchCard
                                        title="Improved Climate Sensitivity Estimates"
                                        description="New studies have narrowed the range of climate sensitivity—how much warming we can expect from doubling CO₂. Current estimates suggest a likely range of 2.5-4°C warming per CO₂ doubling."
                                        date="2022"
                                        source="Science"
                                    />

                                    <ResearchCard
                                        title="Attribution of Extreme Weather Events"
                                        description="Advances in attribution science now allow researchers to quantify how much climate change has influenced specific extreme weather events. Recent studies have linked climate change to increased intensity of hurricanes, heat waves, and flooding events."
                                        date="2023"
                                        source="Bulletin of the American Meteorological Society"
                                    />

                                    <ResearchCard
                                        title="Carbon Budget Updates"
                                        description="Researchers have refined estimates of the remaining carbon budget—how much more CO₂ can be emitted while limiting warming to specific targets. Current estimates suggest more aggressive emission reductions are needed to meet Paris Agreement goals."
                                        date="2022"
                                        source="IPCC Sixth Assessment Report"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Climate Solutions Research</CardTitle>
                                <CardDescription>
                                    Scientific advances in addressing climate change
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ResearchCard
                                        title="Renewable Energy Integration"
                                        description="New research on grid-scale battery storage, demand response, and smart grid technologies is addressing the challenge of integrating variable renewable energy sources into electricity systems."
                                        date="2023"
                                        source="Joule"
                                    />

                                    <ResearchCard
                                        title="Carbon Removal Technologies"
                                        description="Studies on direct air capture, enhanced weathering, and bioenergy with carbon capture and storage (BECCS) are advancing our understanding of negative emissions technologies and their potential role in climate mitigation."
                                        date="2022"
                                        source="Environmental Research Letters"
                                    />

                                    <ResearchCard
                                        title="Climate-Smart Agriculture"
                                        description="Research on regenerative farming practices, precision agriculture, and alternative proteins is identifying ways to reduce agricultural emissions while improving resilience to climate impacts."
                                        date="2023"
                                        source="Global Change Biology"
                                    />

                                    <ResearchCard
                                        title="Behavioral Science and Climate Action"
                                        description="Studies in psychology and behavioral economics are providing insights into effective communication strategies and policy designs to motivate individual and collective climate action."
                                        date="2022"
                                        source="Nature Climate Change"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center">
                            <p className="text-gray-600 mb-4">
                                Want to learn more about climate research?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="outline"
                                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                                    asChild
                                >
                                    <a
                                        href="https://www.ipcc.ch/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        Visit IPCC Website{" "}
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    className="bg-green-500 hover:bg-green-600"
                                    asChild
                                >
                                    <a href="/chat">Chat with ClimateBot</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
}

function TimelineItem({
    year,
    title,
    children,
}: {
    year: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <div className="absolute -left-[33px] mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
            <div className="mb-1">
                <span className="text-sm font-bold text-blue-600">{year}</span>
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
    );
}

function ResearchCard({
    title,
    description,
    date,
    source,
}: {
    title: string;
    description: string;
    date: string;
    source: string;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">
                {date} | {source}
            </p>
            <p className={`text-gray-700 ${!expanded && "line-clamp-3"}`}>
                {description}
            </p>
            {description.length > 150 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-500 text-sm mt-2 hover:underline"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}
