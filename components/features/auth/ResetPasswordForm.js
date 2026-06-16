"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/usePasswordReset";
import { Suspense } from "react";

function ResetPasswordFormInner() {
    const searchParams = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    
    const {
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, loading,
        handleSubmit
    } = useResetPassword(oobCode);

    if (!oobCode) {
        return (
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Invalid Link</h2>
                <p className="text-gray-500 mb-6">This password reset link is invalid or has expired.</p>
                <Link href="/forgot-password" className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                    Request new link
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
                <p className="text-gray-500">Your new password must be different from previous used passwords.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {/* NEW PASSWORD */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 text-gray-900"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                    <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 text-gray-900"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-green-600/20 active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resetting password...
                        </span>
                    ) : 'Reset Password'}
                </button>
            </form>

            <div className="text-center mt-8">
                <Link href="/signin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors group">
                    <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> 
                    Back to sign in
                </Link>
            </div>
        </>
    );
}

export default function ResetPasswordForm() {
    return (
        <Suspense fallback={
            <div className="flex justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        }>
            <ResetPasswordFormInner />
        </Suspense>
    );
}
