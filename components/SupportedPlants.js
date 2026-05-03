"use client";

import { motion } from "framer-motion";
import FadeIn from "./shared/FadeIn";

export default function SupportedPlants() {
    return (
        <section className="bg-green-50 px-6 md:px-10 py-16 md:py-24">
            {/* Title */}
            <FadeIn>
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
                    Supported Plants
                </h2>
            </FadeIn>

            {/* Cards Container */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* Potato Card */}
                <FadeIn delay={0.2} direction="right">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-100 rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-yellow-900 flex items-center gap-3">
                            <span aria-hidden="true" className="text-4xl">🥔</span> Potato Plants
                        </h3>
                        <ul className="space-y-4 text-gray-700 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Late Blight Detection
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Early Blight Identification
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Health Monitoring
                            </li>
                        </ul>
                    </motion.div>
                </FadeIn>

                {/* Tomato Card */}
                <FadeIn delay={0.4} direction="left">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-red-900 flex items-center gap-3">
                            <span aria-hidden="true" className="text-4xl">🍅</span> Tomato Plants
                        </h3>
                        <ul className="space-y-4 text-gray-700 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Bacterial Spot Analysis
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Virus Detection
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-600 bg-green-100 p-1 rounded-full text-sm">✔</span>
                                Leaf Spot & Mite Treatment
                            </li>
                        </ul>
                    </motion.div>
                </FadeIn>
            </div>
        </section>
    );
}
