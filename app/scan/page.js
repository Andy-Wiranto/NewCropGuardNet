"use client";

import { Leaf, Camera, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import usePlantScanner from "@/hooks/usePlantScanner";
import ImageDropzone from "@/components/features/scan/ImageDropzone";
import ScanResult from "@/components/features/scan/ScanResult";
import FeatureCard from "@/components/shared/FeatureCard";
import FadeIn from "@/components/shared/FadeIn";
import Navbar from "@/components/Navbar";

export default function ScanPlant() {
    const {
        fileInputRef,
        imgRef,
        preview,
        isDragging,
        modelReady,
        modelError,
        isScanning,
        result,
        scanError,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileChange,
        handleScan,
        triggerFileInput
    } = usePlantScanner();

    return (
        <main className="min-h-screen bg-[#c7d8cf]" >
            <Navbar />

            <div className="flex flex-col items-center px-4 py-12 md:py-16">
                <FadeIn className="flex flex-col items-center w-full">
                    {/* Logo */}
                    <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md" aria-hidden="true">
                        <Leaf className="text-white" size={28} />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
                        Plant Health Detector
                    </h1>
                    <p className="text-gray-700 text-lg mt-4 text-center max-w-xl">
                        Upload, drag-and-drop, or paste an image (Ctrl+V) to begin analysis
                    </p>
                </FadeIn>

                {/* Model loading status */}
                {!modelReady && !modelError && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-6 text-sm font-medium text-gray-600 bg-white/50 px-5 py-2.5 rounded-full shadow-sm border border-white"
                        role="status"
                        aria-live="polite"
                    >
                        <Loader2 className="animate-spin text-green-600" size={18} aria-hidden="true" />
                        <span>Initializing AI engine...</span>
                    </motion.div>
                )}
                
                {modelError && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 mt-6 text-sm font-medium text-red-700 bg-red-100 px-5 py-3 rounded-xl shadow-sm border border-red-200"
                        role="alert"
                    >
                        <AlertCircle size={18} aria-hidden="true" />
                        <span>{modelError}</span>
                    </motion.div>
                )}

                {/* Main Card */}
                <FadeIn delay={0.2} className="w-full max-w-4xl mt-10">
                    <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white p-6 md:p-10 w-full" aria-label="Upload Section">
                        
                        <ImageDropzone 
                            preview={preview}
                            isDragging={isDragging}
                            modelReady={modelReady}
                            isScanning={isScanning}
                            imgRef={imgRef}
                            fileInputRef={fileInputRef}
                            handleDragOver={handleDragOver}
                            handleDragLeave={handleDragLeave}
                            handleDrop={handleDrop}
                            handleFileChange={handleFileChange}
                            handleScan={handleScan}
                            triggerFileInput={triggerFileInput}
                            hasResult={!!result}
                        />

                        {/* Scan Error */}
                        {scanError && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 flex items-center justify-center gap-2 text-red-700 bg-red-50 border border-red-200 px-5 py-4 rounded-xl font-medium"
                                role="alert"
                            >
                                <AlertCircle size={20} aria-hidden="true" />
                                <span>{scanError}</span>
                            </motion.div>
                        )}

                        {/* Detection Result */}
                        <ScanResult 
                            result={result} 
                            isScanning={isScanning} 
                            triggerFileInput={triggerFileInput} 
                        />

                        {/* Features Section */}
                        <div className="grid md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-gray-100">
                            <FeatureCard
                                icon={<Camera size={28} aria-hidden="true" />}
                                title="Take a Photo"
                                text="Use your device camera for instant, on-the-spot analysis."
                            />
                            <FeatureCard
                                icon={<Leaf size={28} aria-hidden="true" />}
                                title="AI Analysis"
                                text="Advanced edge-AI detection of 13+ plant health conditions."
                            />
                            <FeatureCard
                                icon={<CheckCircle size={28} aria-hidden="true" />}
                                title="Get Advice"
                                text="Receive personalized, expert-curated care recommendations."
                            />
                        </div>
                    </section>
                </FadeIn>
            </div>
        </main>
    );
}
