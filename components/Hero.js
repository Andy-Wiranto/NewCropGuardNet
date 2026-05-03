"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./shared/FadeIn";

export default function Hero() {
    return (
        <section className="bg-green-50 px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
            {/* Left Side */}
            <div className="max-w-xl">
                <FadeIn delay={0.1}>
                    <p className="text-green-600 font-bold uppercase tracking-wider mb-4 text-sm">
                        AI-Powered Detection
                    </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Protect Your Plants with AI
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
                        Instantly detect diseases in your potato and tomato plants.
                        Get expert recommendations to keep your garden healthy.
                    </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <Link href="/scan" tabIndex={-1}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500"
                            aria-label="Start scanning your plants now"
                        >
                            Start Scanning Now
                        </motion.button>
                    </Link>
                </FadeIn>
            </div>

            {/* Right Side */}
            <FadeIn delay={0.3} direction="left" className="w-full md:w-1/2 flex justify-end">
                <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Image
                        src="/plant.jpg"
                        alt="Close up of a vibrant, healthy green plant leaf"
                        width={600}
                        height={500}
                        className="w-full max-w-lg rounded-2xl shadow-2xl object-cover"
                        priority
                    />
                </motion.div>
            </FadeIn>
        </section>
    );
}
