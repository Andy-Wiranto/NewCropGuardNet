"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 4000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const isSuccess = type === "success";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-6 right-6 z-[100] max-w-sm"
        >
            <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${
                isSuccess
                    ? "bg-green-50/90 border-green-200 text-green-800"
                    : "bg-red-50/90 border-red-200 text-red-800"
            }`}>
                {isSuccess ? (
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" aria-hidden="true" />
                ) : (
                    <XCircle size={20} className="text-red-600 flex-shrink-0" aria-hidden="true" />
                )}
                <p className="text-sm font-medium flex-1">{message}</p>
                <button
                    onClick={onDismiss}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    aria-label="Dismiss notification"
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    );
}
