"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "./shared/FadeIn";

export default function CTA() {
    return (
        <section className="bg-green-600 text-white py-20 md:py-32 px-6 md:px-10 text-center relative overflow-hidden">
            {/* Background pattern for depth */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="leaf-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M30 5c15 0 25 10 25 25-15 0-25-10-25-25z" fill="currentColor" />
                            <path d="M30 55c-15 0-25-10-25-25 15 0 25 10 25 25z" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
                </svg>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Ready to Protect Your Plants?
                    </h2>
                    <p className="text-xl mb-10 text-green-100 leading-relaxed">
                        Start detecting plant diseases in seconds using our AI-powered tool.
                        Fast, accurate, and easy to use.
                    </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <Link href="/scan" tabIndex={-1}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-green-700 font-bold text-lg px-10 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
