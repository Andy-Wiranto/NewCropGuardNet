"use client";

import Link from "next/link";

/**
 * Shared layout container for authentication pages.
 * Enforces consistent styling, animations, and responsive behavior.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.leftPanel - Content for the decorative left panel.
 * @param {React.ReactNode} props.children - Content for the right panel (the form).
 */
export default function AuthLayout({ leftPanel, children }) {
    return (
        <div className="min-h-screen bg-[#e6f2ee] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[20%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

            <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 relative z-10 border border-white/40">
                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-green-600/5 relative overflow-hidden order-last md:order-first">
                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl text-white text-2xl mb-8 shadow-lg shadow-green-600/30 hover:scale-105 transition-transform">
                            🌿
                        </Link>
                        {leftPanel}
                    </div>
                    
                    {/* Decorative abstract shapes */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
                </div>

                {/* RIGHT SIDE (FORM CARD) */}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto max-h-[90vh] md:max-h-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
