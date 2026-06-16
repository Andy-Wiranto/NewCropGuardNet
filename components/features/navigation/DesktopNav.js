"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function DesktopNav({ user, loading, displayName, handleLogout }) {
    return (
        <div className="hidden md:flex items-center gap-8">
            <Link
                href="/learn"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-md px-2 py-1"
            >
                Learn More
            </Link>

            {user && (
                <Link
                    href="/history"
                    className="text-gray-600 hover:text-green-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-md px-2 py-1"
                >
                    History
                </Link>
            )}

            <div className="flex items-center gap-4">
                <Link href="/scan" tabIndex={-1}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-green-600 text-green-600 font-semibold px-5 py-2 rounded-xl hover:bg-green-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        Scan Plant
                    </motion.button>
                </Link>

                {/* Auth Section */}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                    >
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium max-w-[120px] truncate">
                                        {displayName}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-200"
                                    aria-label="Sign out"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden lg:inline">Sign Out</span>
                                </motion.button>
                            </div>
                        ) : (
                            <Link href="/signin" tabIndex={-1}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-green-600 text-white font-semibold px-5 py-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                >
                                    Sign In
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
