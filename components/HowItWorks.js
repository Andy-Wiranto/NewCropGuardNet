"use client";

import { motion } from "framer-motion";
import FadeIn from "./shared/FadeIn";

export default function HowItWorks() {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2 + i * 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    return (
        <section id="how" className="px-6 md:px-10 py-16 md:py-24 bg-white text-center">
            {/* Title */}
            <FadeIn>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
                    How It Works
                </h2>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                    Simple, fast, and accurate plant health detection in three easy steps.
                </p>
            </FadeIn>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Card 1 */}
                <motion.div 
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="border border-gray-100 rounded-2xl p-10 shadow-sm hover:shadow-xl transition-shadow bg-gray-50/50"
                >
                    <div className="text-5xl mb-6" aria-hidden="true">📸</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        1. Capture or Paste
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Take a clear photo of your plant leaves, drag-and-drop a file, or paste an image directly from your clipboard.
                    </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="border border-gray-100 rounded-2xl p-10 shadow-sm hover:shadow-xl transition-shadow bg-gray-50/50"
                >
                    <div className="text-5xl mb-6" aria-hidden="true">🧠</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        2. AI Analysis
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Our advanced, lightweight TensorFlow.js model analyzes the image instantly directly within your browser.
                    </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="border border-gray-100 rounded-2xl p-10 shadow-sm hover:shadow-xl transition-shadow bg-gray-50/50"
                >
                    <div className="text-5xl mb-6" aria-hidden="true">🩺</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        3. Get Solutions
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Receive an immediate diagnosis along with an actionable, expert-curated care plan to treat your plant.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
