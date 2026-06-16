"use client";

import Link from "next/link";
import { useForgotPassword } from "@/hooks/usePasswordReset";

/**
 * Spinner component used across the form buttons.
 */
function ButtonSpinner() {
    return (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
}

/**
 * The success state shown after a password reset email is sent.
 * Includes resend functionality with a cooldown timer.
 */
function SuccessState({ email, loading, cooldownRemaining, onResend }) {
    const canResend = cooldownRemaining === 0 && !loading;

    return (
        <div className="text-center">
            <div className="mb-6">
                {/* Animated envelope icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-100/50">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Check your email</h2>
                <p className="text-gray-500 leading-relaxed">
                    If an account exists for{" "}
                    <span className="font-semibold text-gray-800">{email}</span>,
                    we&apos;ve sent password reset instructions to your inbox.
                </p>
            </div>

            {/* Helpful tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm font-medium text-amber-800 mb-2">Didn&apos;t receive the email?</p>
                <ul className="text-sm text-amber-700 space-y-1">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Check your spam or junk folder</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Make sure you entered the correct email</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>Allow a few minutes for the email to arrive</span>
                    </li>
                </ul>
            </div>

            {/* Resend button with cooldown */}
            <button
                onClick={onResend}
                disabled={!canResend}
                className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
                {loading ? (
                    <span className="flex items-center justify-center text-gray-600">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                ) : cooldownRemaining > 0 ? (
                    <span className="text-gray-500">
                        Resend available in {cooldownRemaining}s
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Resend reset link
                    </span>
                )}
            </button>

            <div className="text-center mt-6">
                <Link href="/signin" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors group">
                    <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> 
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}

export default function ForgotPasswordForm() {
    const {
        email, setEmail,
        error, loading, success,
        cooldownRemaining,
        handleSubmit, handleResend
    } = useForgotPassword();

    if (success) {
        return (
            <SuccessState
                email={email}
                loading={loading}
                cooldownRemaining={cooldownRemaining}
                onResend={handleResend}
            />
        );
    }

    return (
        <>
            <div className="mb-8">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-500">Enter your email address and we&apos;ll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm flex items-start gap-3" role="alert">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p>{error}</p>
                    </div>
                )}

                {/* EMAIL */}
                <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                        id="reset-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 text-gray-900"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                            <ButtonSpinner />
                            Sending link...
                        </span>
                    ) : 'Send Reset Link'}
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
