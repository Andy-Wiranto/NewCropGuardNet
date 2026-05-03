"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

export default function MobileNav({ mobileMenuOpen, setMobileMenuOpen, user, loading, displayName, handleLogout }) {
    return (
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-100 md:hidden"
                >
                    <div className="flex flex-col p-6 gap-2">
                        <Link
                            href="/learn"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-green-600 font-medium py-3 px-3 rounded-xl hover:bg-green-50 transition-all"
                        >
                            Learn More
                        </Link>
                        <Link
                            href="/scan"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-green-600 font-medium py-3 px-3 rounded-xl hover:bg-green-50 transition-all"
                        >
                            Scan Plant
                        </Link>

                        <div className="border-t border-gray-100 pt-4 mt-2">
                            {!loading && (
                                <>
                                    {user ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
                                                <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    {displayName.charAt(0).toUpperCase()}
                                                </div>
                                                <span>Signed in as <span className="font-semibold text-green-600">{displayName}</span></span>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium py-3 px-3 rounded-xl hover:bg-red-50 transition-all"
                                            >
                                                <LogOut size={18} />
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                href="/signin"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-center bg-green-600 text-white font-semibold py-3 px-3 rounded-xl hover:bg-green-700 transition-all"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/signup"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-center text-green-600 hover:text-green-700 font-medium py-3 px-3 rounded-xl border border-green-200 hover:bg-green-50 transition-all"
                                            >
                                                Create Account
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
