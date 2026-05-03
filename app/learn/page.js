import Link from "next/link";
import Image from "next/image";
import { Calendar, Leaf } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import DiseaseCard from "@/components/features/learn/DiseaseCard";
import TipCard from "@/components/shared/TipCard";
import FadeIn from "@/components/shared/FadeIn";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Learn More - PlantHealth",
    description: "Complete guide to potato and tomato plant health. Learn how to identify, prevent, and treat common diseases.",
};

export default function LearnMore() {
    return (
        <main className="min-h-screen bg-[#c7d8cf]">
            <Navbar />

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                
                <FadeIn delay={0.1}>
                    {/* Date */}
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full w-fit text-sm font-medium mb-6 shadow-sm">
                        <Calendar size={16} aria-hidden="true" />
                        <time dateTime="2026-02-09">February 9, 2026</time>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Complete Guide to Potato &amp; Tomato Plant Health
                    </h1>

                    <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
                        Learn how to identify, prevent, and treat common diseases affecting your potato and tomato plants with expert tips and AI-powered detection.
                    </p>
                </FadeIn>

                {/* Hero Image */}
                <FadeIn delay={0.2}>
                    <div className="relative w-full h-[300px] md:h-[450px] mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                            alt="Lush green farm field showing healthy crops under sunlight"
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized
                        />
                    </div>
                </FadeIn>

                {/* Why It Matters */}
                <FadeIn delay={0.3}>
                    <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                            Why Plant Health Matters
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                            Potato and tomato plants are among the most popular crops for home gardeners and commercial farmers alike. However, they&apos;re also susceptible to various diseases that can devastate your harvest if not detected early.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            With the advancement of AI technology, detecting plant diseases has become faster and more accessible than ever, allowing you to take immediate action and save your crops.
                        </p>
                    </section>
                </FadeIn>

                {/* Potato Section */}
                <section aria-labelledby="potato-diseases">
                    <FadeIn>
                        <SectionTitle emoji="🥔" title="Potato Plant Diseases" id="potato-diseases" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <DiseaseCard
                            title="Late Blight"
                            description="Late blight is one of the most destructive diseases affecting potato plants."
                            symptoms={[
                                "Dark brown or black spots on leaves",
                                "White fungal growth on undersides",
                                "Rapid wilting and decay"
                            ]}
                            treatment={[
                                "Apply copper-based fungicides",
                                "Remove infected material",
                                "Improve air circulation"
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <DiseaseCard
                            title="Early Blight"
                            description="Early blight appears later in the season and affects older leaves first."
                            symptoms={[
                                "Circular brown spots with rings",
                                "Yellowing of leaves",
                                "Premature leaf drop"
                            ]}
                            treatment={[
                                "Rotate crops annually",
                                "Apply organic fungicides",
                                "Maintain plant nutrition"
                            ]}
                        />
                    </FadeIn>
                </section>

                {/* Tomato Section */}
                <section aria-labelledby="tomato-diseases" className="mt-16">
                    <FadeIn>
                        <SectionTitle emoji="🍅" title="Tomato Plant Diseases" id="tomato-diseases" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <DiseaseCard
                            title="Bacterial Spot"
                            description="A common tomato disease that spreads rapidly in humid conditions."
                            symptoms={[
                                "Small dark brown spots",
                                "Yellow halos on leaves",
                                "Leaf drop"
                            ]}
                            treatment={[
                                "Use disease-free seeds",
                                "Apply copper bactericides",
                                "Avoid overhead irrigation"
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <DiseaseCard
                            title="Septoria Leaf Spot"
                            description="One of the most common tomato diseases worldwide."
                            symptoms={[
                                "Circular spots with dark borders",
                                "Tiny black dots in centers",
                                "Progressive yellowing"
                            ]}
                            treatment={[
                                "Remove infected leaves",
                                "Mulch to prevent splash",
                                "Apply organic fungicides"
                            ]}
                        />
                    </FadeIn>
                </section>

                {/* Green Tips Section */}
                <FadeIn delay={0.3}>
                    <section className="bg-green-700 text-white rounded-3xl p-10 md:p-12 mt-20 shadow-xl overflow-hidden relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 pointer-events-none" aria-hidden="true">
                            <Leaf size={250} />
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">
                                General Care Tips for Healthy Plants
                            </h2>

                            <div className="grid md:grid-cols-3 gap-8 text-center">
                                <TipCard
                                    title="Proper Watering"
                                    text="Water deeply but infrequently. Aim for 1-2 inches per week at the base."
                                />
                                <TipCard
                                    title="Sunlight & Spacing"
                                    text="Ensure 6-8 hours of direct sunlight daily with adequate airflow."
                                />
                                <TipCard
                                    title="Pest Management"
                                    text="Monitor regularly, encourage beneficial insects, and use organic treatments."
                                />
                            </div>
                        </div>
                    </section>
                </FadeIn>

                {/* CTA */}
                <FadeIn delay={0.4}>
                    <section className="bg-white border-2 border-green-600 rounded-3xl p-10 md:p-12 text-center mt-16 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">
                            Try Our Plant Health Detector
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Use our AI-powered tool to instantly detect diseases and get actionable care plans.
                        </p>
                        <Link href="/scan" tabIndex={-1}>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                                Start Scanning Now →
                            </button>
                        </Link>
                    </section>
                </FadeIn>

            </article>
        </main>
    );
}
