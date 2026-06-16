"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { historyService } from "@/services/historyService";
import { Leaf, Loader2, Calendar, AlertCircle, Trash2, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FadeIn from "@/components/shared/FadeIn";

export default function HistoryPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [scanToDelete, setScanToDelete] = useState(null); // Custom modal state

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push("/signin");
            return;
        }

        const fetchHistory = async () => {
            try {
                setLoading(true);
                const data = await historyService.getUserHistory(user.uid);
                setHistory(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load your scan history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, authLoading, router]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setScanToDelete(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const confirmDelete = async () => {
        if (!scanToDelete) return;
        
        const scanId = scanToDelete.id;
        const imageUrl = scanToDelete.imageUrl;

        try {
            setDeletingId(scanId);
            await historyService.deleteScan(scanId, imageUrl);
            // Optimistically remove from UI
            setHistory(prev => prev.filter(scan => scan.id !== scanId));
            setScanToDelete(null); // Close modal
        } catch (err) {
            console.error("Failed to delete scan:", err);
            alert("Failed to delete the scan. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    if (authLoading || loading) {
        return (
            <main className="min-h-screen bg-green-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="animate-spin text-green-700 w-12 h-12" />
                </div>
            </main>
        );
    }

    if (!user) return null; // Handled by redirect

    return (
        <main className="min-h-screen bg-green-50 flex flex-col relative">
            <Navbar />

            {/* Custom Confirmation Modal */}
            <AnimatePresence>
                {scanToDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                        onClick={() => {
                            if (deletingId !== scanToDelete.id) setScanToDelete(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-100"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <AlertTriangle className="text-red-500" size={32} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">Delete Scan?</h3>
                                <p className="text-gray-500 text-center mb-8">
                                    Are you sure you want to delete the scan for <strong className="text-gray-800">{scanToDelete.label}</strong>? This action cannot be undone.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setScanToDelete(null)}
                                        disabled={deletingId === scanToDelete.id}
                                        className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={deletingId === scanToDelete.id}
                                        className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {deletingId === scanToDelete.id ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            "Yes, delete it"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="px-6 md:px-10 py-16 md:py-24 max-w-7xl mx-auto w-full flex-1">
                <FadeIn className="flex flex-col items-center w-full mb-12">
                    <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                        <Leaf className="text-white" size={32} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight leading-tight">
                        Your Scan History
                    </h1>
                    <p className="text-gray-700 text-lg mt-4 text-center max-w-xl leading-relaxed">
                        Review your past plant health analyses and track progress over time to keep your garden healthy.
                    </p>
                </FadeIn>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center justify-center gap-2 mb-8 max-w-3xl mx-auto border border-red-200 shadow-sm">
                        <AlertCircle size={20} />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {!error && history.length === 0 && (
                    <FadeIn delay={0.2} className="bg-white rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-xl border border-green-100 mt-8">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Leaf className="text-green-300" size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No scans yet</h2>
                        <p className="text-gray-500 text-lg mb-8">You haven't analyzed any plants. Start your first scan to see it here.</p>
                        <button 
                            onClick={() => router.push("/scan")}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-green-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500"
                        >
                            Start Scanning Now
                        </button>
                    </FadeIn>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {history.map((scan, index) => (
                            <motion.div
                                key={scan.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-green-100/50 border border-green-50 flex flex-col group hover:shadow-xl transition-all hover:-translate-y-1 relative"
                            >
                                <div className="h-56 w-full relative overflow-hidden bg-gray-50">
                                    {scan.imageUrl ? (
                                        <img 
                                            src={scan.imageUrl} 
                                            alt={scan.label}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Leaf size={48} strokeWidth={1.5} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-green-700 text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                        {(scan.confidence * 100).toFixed(1)}% Match
                                    </div>
                                    
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => setScanToDelete(scan)}
                                        disabled={deletingId === scan.id}
                                        className="absolute top-4 right-4 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 p-2.5 rounded-lg shadow-sm backdrop-blur-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Delete scan"
                                        title="Delete scan"
                                    >
                                        {deletingId === scan.id ? (
                                            <Loader2 size={18} className="animate-spin text-red-500" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">{scan.label}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
                                        <Calendar size={16} className="mr-2 text-green-600" />
                                        {scan.createdAt?.toDate ? scan.createdAt.toDate().toLocaleDateString(undefined, {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        }) : new Date(scan.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
