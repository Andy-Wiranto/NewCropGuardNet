import Link from "next/link";
import { Calendar, AlertTriangle, Leaf } from "lucide-react";

export const metadata = {
    title: "Learn More - PlantHealth",
    description: "Complete guide to potato and tomato plant health. Learn how to identify, prevent, and treat common diseases.",
};

export default function LearnMore() {
    return (
        <div className="min-h-screen bg-[#c7d8cf]">

            {/* Navbar */}
            <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <Leaf className="text-green-600" />
                        <span className="font-semibold text-gray-800">PlantHealth</span>
                    </div>
                </Link>
                <Link href="/" className="text-gray-600 hover:text-green-600">
                    Home
                </Link>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Date */}
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full w-fit text-sm mb-6">
                    <Calendar size={16} />
                    February 9, 2026
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Complete Guide to Potato &amp; Tomato Plant Health
                </h1>

                <p className="text-gray-700 text-lg mb-10">
                    Learn how to identify, prevent, and treat common diseases affecting your potato and tomato plants with expert tips and AI-powered detection.
                </p>

                {/* Hero Image */}
                <img
                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                    alt="Farm"
                    className="rounded-2xl mb-12 w-full h-[400px] object-cover"
                />

                {/* Why It Matters */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        Why Plant Health Matters
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Potato and tomato plants are among the most popular crops for home gardeners and commercial farmers alike. However, they&apos;re also susceptible to various diseases that can devastate your harvest if not detected early.
                    </p>
                    <p className="text-gray-700">
                        With the advancement of AI technology, detecting plant diseases has become faster and more accessible than ever.
                    </p>
                </div>

                {/* Potato Section */}
                <SectionTitle emoji="🥔" title="Potato Plant Diseases" />

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

                {/* Tomato Section */}
                <SectionTitle emoji="🍅" title="Tomato Plant Diseases" />

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

                {/* Green Tips Section */}
                <div className="bg-green-600 text-white rounded-2xl p-10 mt-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center">
                        General Care Tips for Healthy Plants
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <TipCard
                            title="Proper Watering"
                            text="Water deeply but infrequently. Aim for 1-2 inches per week."
                        />
                        <TipCard
                            title="Sunlight & Spacing"
                            text="Ensure 6-8 hours of direct sunlight daily."
                        />
                        <TipCard
                            title="Pest Management"
                            text="Monitor regularly and use organic treatments."
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-white border-2 border-green-600 rounded-2xl p-10 text-center mt-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        Try Our Plant Health Detector
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Use our AI-powered tool to instantly detect diseases.
                    </p>
                    <Link href="/scan">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
                            Start Scanning Now →
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

function SectionTitle({ emoji, title }) {
    return (
        <div className="flex items-center gap-3 mt-12 mb-6">
            <span className="text-3xl">{emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
    );
}

function DiseaseCard({ title, description, symptoms, treatment }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-orange-500" size={20} />
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>

            <p className="text-gray-700 mb-6">{description}</p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Symptoms:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        {symptoms.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Treatment:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        {treatment.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function TipCard({ title, text }) {
    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-green-100">{text}</p>
        </div>
    );
}
