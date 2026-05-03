"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import DesktopNav from "@/components/features/navigation/DesktopNav";
import MobileNav from "@/components/features/navigation/MobileNav";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const { showToast } = useToast();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            showToast("You've been signed out successfully.");
            setMobileMenuOpen(false);
        } catch {
            showToast("Failed to sign out. Please try again.", "error");
        }
    };

    // Get user's display name or email prefix
    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

    return (
        <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" aria-label="Go to homepage" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-2xl font-bold text-green-600 tracking-tight">PlantHealth</span>
                </motion.div>
            </Link>

            {/* Desktop Menu */}
            <DesktopNav 
                user={user} 
                loading={loading} 
                displayName={displayName} 
                handleLogout={handleLogout} 
            />

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-green-600 transition-colors p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <MobileNav 
                mobileMenuOpen={mobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen} 
                user={user} 
                loading={loading} 
                displayName={displayName} 
                handleLogout={handleLogout} 
            />
        </nav>
    );
}
