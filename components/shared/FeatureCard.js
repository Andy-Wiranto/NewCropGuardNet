"use client";

import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, text }) {
    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 rounded-xl p-6 shadow-sm text-center border border-transparent hover:border-green-100 hover:bg-white transition-colors duration-300 cursor-pointer"
        >
            <div className="text-green-600 mb-3 flex justify-center">
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
        </motion.div>
    );
}
