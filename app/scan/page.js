"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, Camera, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { loadModel, predict } from "@/lib/modelUtils";

export default function ScanPlant() {
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);

    // Model & scanning states
    const [modelReady, setModelReady] = useState(false);
    const [modelError, setModelError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [scanError, setScanError] = useState(null);

    // Load model on page open (eager loading)
    useEffect(() => {
        loadModel()
            .then(() => {
                setModelReady(true);
                console.log("Model is ready for inference");
            })
            .catch((err) => {
                console.error("Failed to load model:", err);
                setModelError("Failed to load AI model. Please refresh the page.");
            });
    }, []);

    const handleButtonClick = (plant) => {
        setSelectedPlant(plant);
        setResult(null);
        setScanError(null);
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setScanError(null);
        }
    };

    const handleScan = async () => {
        if (!imgRef.current) return;

        setIsScanning(true);
        setScanError(null);
        setResult(null);

        try {
            const prediction = await predict(imgRef.current);
            setResult(prediction);
        } catch (err) {
            console.error("Scan failed:", err);
            setScanError("Analysis failed. Please try again with a different image.");
        } finally {
            setIsScanning(false);
        }
    };

    // Determine result accent color
    const isHealthy = result?.rawLabel?.toLowerCase().includes("healthy");
    const resultAccent = isHealthy ? "green" : "red";

    return (
        <div className="min-h-screen bg-[#c7d8cf]" >
            {/* Navbar */}
            <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center" >
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
            <div className="min-h-screen bg-[#c7d8cf] flex flex-col items-center px-4 py-10">

                {/* Logo */}
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Leaf className="text-white" size={28} />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Plant Health Detector
                </h1>
                <p className="text-gray-600 mt-2 text-center">
                    Select a plant category to begin analysis
                </p>

                {/* Model loading status */}
                {!modelReady && !modelError && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                        <Loader2 className="animate-spin" size={16} />
                        <span>Loading AI model...</span>
                    </div>
                )}
                {modelError && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                        <AlertCircle size={16} />
                        <span>{modelError}</span>
                    </div>
                )}

                {/* Main Card */}
                <div className="bg-gray-100 rounded-2xl shadow-md p-8 mt-10 w-full max-w-4xl">

                    <h2 className="text-xl font-semibold text-center mb-8">
                        Choose Plant Type
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Potato Card */}
                        <div className="border-2 border-yellow-400 rounded-xl p-8 bg-yellow-50 flex flex-col items-center text-center">
                            <div className="text-5xl mb-4">🥔</div>
                            <h3 className="text-xl font-semibold mb-2">Potato</h3>
                            <p className="text-gray-600 mb-6">
                                Detect potato diseases and leaf issues
                            </p>
                            <button
                                onClick={() => handleButtonClick("potato")}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
                            >
                                Select Potato
                            </button>

                        </div>

                        {/* Tomato Card */}
                        <div className="border-2 border-red-300 rounded-xl p-8 bg-red-50 flex flex-col items-center text-center">
                            <div className="text-5xl mb-4">🍅</div>
                            <h3 className="text-xl font-semibold mb-2">Tomato</h3>
                            <p className="text-gray-600 mb-6">
                                Identify tomato plant health issues
                            </p>

                            <button
                                onClick={() => handleButtonClick("tomato")}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Select Tomato
                            </button>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-8 flex flex-col items-center">
                            <p className="text-sm text-gray-500 mb-2">
                                Uploaded image for <span className="font-semibold capitalize">{selectedPlant}</span>
                            </p>
                            <img
                                ref={imgRef}
                                src={preview}
                                alt="Uploaded plant"
                                crossOrigin="anonymous"
                                className="rounded-xl shadow-md max-h-80 object-contain"
                            />
                            <button
                                onClick={() => {
                                    fileInputRef.current.click();
                                }}
                                className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
                            >
                                Upload a different photo
                            </button>
                            <button
                                onClick={handleScan}
                                disabled={isScanning || !modelReady}
                                className={`mt-4 font-semibold px-8 py-3 rounded-lg transition flex items-center gap-2
                                    ${isScanning || !modelReady
                                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                            >
                                {isScanning ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Analyzing...
                                    </>
                                ) : !modelReady ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Model Loading...
                                    </>
                                ) : (
                                    "Scan Now"
                                )}
                            </button>
                        </div>
                    )}

                    {/* Scan Error */}
                    {scanError && (
                        <div className="mt-6 flex items-center justify-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                            <AlertCircle size={18} />
                            <span>{scanError}</span>
                        </div>
                    )}

                    {/* Detection Result */}
                    {result && (
                        <div className={`mt-8 mx-auto max-w-md border-2 rounded-2xl p-6 shadow-sm
                            ${isHealthy
                                ? "border-green-300 bg-green-50"
                                : "border-red-300 bg-red-50"
                            }`}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                                🔬 Detection Result
                            </h3>

                            {/* Disease Name */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Detected Condition</p>
                                <p className={`text-2xl font-bold ${isHealthy ? "text-green-700" : "text-red-700"}`}>
                                    {result.label}
                                </p>
                            </div>

                            {/* Confidence Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm text-gray-500">Confidence</p>
                                    <p className={`text-sm font-semibold ${isHealthy ? "text-green-700" : "text-red-700"}`}>
                                        {(result.confidence * 100).toFixed(2)}%
                                    </p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-700 ease-out ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
                                        style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Status badge */}
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                                ${isHealthy
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                                }`}
                            >
                                {isHealthy ? (
                                    <><CheckCircle size={14} /> Plant is Healthy</>
                                ) : (
                                    <><AlertCircle size={14} /> Disease Detected</>
                                )}
                            </div>

                            {/* Scan Again */}
                            <button
                                onClick={handleScan}
                                disabled={isScanning}
                                className="mt-4 block w-full text-center text-sm text-gray-600 hover:text-gray-800 underline"
                            >
                                Scan Again
                            </button>
                        </div>
                    )}

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                        <FeatureCard
                            icon={<Camera size={24} />}
                            title="Take a Photo"
                            text="Use your device camera for instant analysis"
                        />

                        <FeatureCard
                            icon={<Leaf size={24} />}
                            title="AI Analysis"
                            text="Advanced detection of plant health issues"
                        />

                        <FeatureCard
                            icon={<CheckCircle size={24} />}
                            title="Get Advice"
                            text="Receive personalized care recommendations"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ---------- Feature Card ---------- */

function FeatureCard({ icon, title, text }) {
    return (
        <div className="bg-gray-100 rounded-xl p-6 shadow-sm text-center">
            <div className="text-green-600 mb-3 flex justify-center">
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{text}</p>
        </div>
    );
}
