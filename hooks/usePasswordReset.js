import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { authService } from "@/services/authService";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

const emailSchema = z.string().email("Please enter a valid email address.");
const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password is too long.");

/**
 * Maps Firebase error codes to user-friendly messages for the password reset flow.
 * Prevents leaking exact system states to potential attackers.
 */
function getFriendlyErrorMessage(err) {
    if (!err || !err.code) return "An unexpected error occurred. Please try again.";
    
    switch (err.code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/too-many-requests":
            return "Too many requests. Please wait a few minutes before trying again.";
        case "auth/weak-password":
            return "Your password is too weak. Please use a stronger password with at least 8 characters.";
        case "auth/expired-action-code":
            return "This reset link has expired. Please request a new one.";
        case "auth/invalid-action-code":
            return "This reset link is invalid or has already been used. Please request a new one.";
        default:
            return "An error occurred. Please check your connection and try again.";
    }
}

/** Minimum interval between resend attempts (in seconds). */
const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Custom hook for the "Forgot Password" form.
 * Handles email submission, resend with cooldown, and anti-enumeration security.
 */
export function useForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const cooldownTimerRef = useRef(null);

    /**
     * Starts a countdown that prevents resend spam.
     */
    const startCooldown = useCallback(() => {
        setCooldownRemaining(RESEND_COOLDOWN_SECONDS);
        
        if (cooldownTimerRef.current) {
            clearInterval(cooldownTimerRef.current);
        }
        
        cooldownTimerRef.current = setInterval(() => {
            setCooldownRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(cooldownTimerRef.current);
                    cooldownTimerRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    /**
     * Core function that sends the password reset email through Firebase Auth.
     * @param {string} targetEmail - the sanitized and validated email address.
     */
    const sendResetEmail = useCallback(async (targetEmail) => {
        setError("");
        setLoading(true);

        try {
            await authService.sendPasswordReset(targetEmail);
            setSuccess(true);
            startCooldown();
        } catch (err) {
            // Security: never reveal whether a specific email exists.
            // Firebase may throw auth/user-not-found, auth/invalid-email, etc.
            console.error("[PasswordReset] Error code:", err?.code);
            
            if (err?.code === "auth/user-not-found" || err?.code === "auth/user-disabled") {
                // Pretend it succeeded to prevent email enumeration
                setSuccess(true);
                startCooldown();
            } else if (err?.code === "auth/too-many-requests") {
                setError(getFriendlyErrorMessage(err));
            } else if (err?.code === "auth/invalid-email") {
                setError(getFriendlyErrorMessage(err));
            } else {
                setError(getFriendlyErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    }, [startCooldown]);

    /**
     * Handles initial form submission.
     */
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const sanitizedEmail = DOMPurify.sanitize(email.trim());

        try {
            emailSchema.parse(sanitizedEmail);
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                return setError(validationError.errors[0].message);
            }
            return setError("Invalid email format.");
        }

        await sendResetEmail(sanitizedEmail);
    }, [email, sendResetEmail]);

    /**
     * Handles resending the reset email (uses the already-stored email).
     */
    const handleResend = useCallback(async () => {
        if (cooldownRemaining > 0 || loading) return;
        
        const sanitizedEmail = DOMPurify.sanitize(email.trim());
        await sendResetEmail(sanitizedEmail);
    }, [email, cooldownRemaining, loading, sendResetEmail]);

    return {
        email, setEmail,
        error, loading, success,
        cooldownRemaining,
        handleSubmit, handleResend
    };
}

/**
 * Custom hook for the "Reset Password" form.
 * Handles new password submission using Firebase's oobCode.
 */
export function useResetPassword(oobCode) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!oobCode) {
            return setError("Invalid or missing reset code. Please request a new reset link.");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            passwordSchema.parse(password);
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                return setError(validationError.errors[0].message);
            }
            return setError("Invalid password format.");
        }

        setLoading(true);

        try {
            await authService.confirmPasswordResetWithCode(oobCode, password);
            showToast("Password has been successfully reset! You can now sign in.");
            router.push("/signin");
        } catch (err) {
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return {
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, loading,
        handleSubmit
    };
}
