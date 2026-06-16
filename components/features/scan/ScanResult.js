"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Leaf, Camera } from "lucide-react";
import { DISEASE_SOLUTIONS } from "@/utils/diseaseSolutions";

export default function ScanResult({ result, isScanning, resetScanner }) {
    if (!result) return null;

    const isHealthy = result.rawLabel?.toLowerCase().includes("healthy");
    const solutionData = DISEASE_SOLUTIONS[result.rawLabel];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`mt-10 mx-auto w-full border-2 rounded-2xl overflow-hidden shadow-sm 
            ${isHealthy
                ? "border-green-300 bg-white"
                : "border-red-300 bg-white"
            }`}
            role="region"
            aria-live="polite"
        >
            {/* Header Banner */}
            <div className={`px-6 py-4 flex items-center gap-3 text-white
                ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
            >
                {isHealthy ? <CheckCircle size={24} aria-hidden="true" /> : <AlertCircle size={24} aria-hidden="true" />}
                <h3 className="text-xl font-bold">
                    {isHealthy ? "Plant is Healthy!" : "Disease Detected"}
                </h3>
            </div>

            <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column: Diagnosis */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="mb-6">
                            <h4 className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wider">Diagnosis</h4>
                            <p className={`text-3xl font-bold ${isHealthy ? "text-green-700" : "text-red-700"}`}>
                                {solutionData ? solutionData.disease : result.label}
                            </p>
                        </div>

                        {/* Confidence Bar */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">AI Confidence Score</span>
                                <span className={`text-sm font-bold ${isHealthy ? "text-green-700" : "text-red-700"}`}>
                                    {(result.confidence * 100).toFixed(2)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                    className={`h-3 rounded-full ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
                                    role="progressbar"
                                    aria-valuenow={(result.confidence * 100).toFixed(1)}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Solution */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-blue-50 border border-blue-100 rounded-xl p-6"
                    >
                        <h4 className="font-semibold text-blue-900 mb-3 text-lg flex items-center gap-2">
                            <Leaf size={20} className="text-blue-600" aria-hidden="true" />
                            Action Plan
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {solutionData ? solutionData.solution : "No specific recommendation available. Ensure optimal watering, sunlight, and soil conditions."}
                        </p>
                    </motion.div>
                </div>

                {/* Scan Again */}
                <div className="mt-8 text-center pt-6 border-t border-gray-100">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetScanner}
                        disabled={isScanning}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none rounded-lg px-4 py-2"
                        aria-label="Scan another plant image"
                    >
                        <Camera size={18} aria-hidden="true" />
                        Scan Another Plant
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
