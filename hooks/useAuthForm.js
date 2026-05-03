import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { authService } from "@/services/authService";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

// Define strict validation schemas
const authSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long.")
        .max(100, "Password is too long."),
    name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name is too long.").optional(),
});

/**
 * Maps raw Firebase error codes to secure, user-friendly messages.
 * Prevents leaking exact system states to potential attackers.
 */
function getFriendlyErrorMessage(err) {
    if (!err || !err.code) return "An unexpected error occurred. Please try again.";
    
    switch (err.code) {
        case "auth/email-already-in-use":
            return "This email is already associated with an account. Please sign in.";
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Invalid email or password. Please try again.";
        case "auth/too-many-requests":
            return "Too many failed login attempts. Please try again later.";
        case "auth/weak-password":
            return "Your password is too weak. Please use a stronger password.";
        default:
            return "Authentication failed. Please check your connection and try again.";
    }
}

/**
 * Custom hook to handle authentication form state and business logic.
 * Decouples form UI from Firebase API interactions.
 *
 * @param {'signin' | 'signup'} mode - The mode of the auth form.
 * @returns {Object} Form state and submission handlers.
 */
export function useAuthForm(mode) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    
    const router = useRouter();
    const { showToast } = useToast();

    /**
     * Handles standard email/password authentication (both sign-in and sign-up).
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 1. Sanitize Inputs (Defense-in-depth against XSS)
        const sanitizedEmail = DOMPurify.sanitize(email.trim());
        const sanitizedName = DOMPurify.sanitize(name.trim());
        
        // 2. Validate Inputs
        if (mode === "signup" && password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            authSchema.parse({
                email: sanitizedEmail,
                password: password,
                name: mode === "signup" ? sanitizedName : undefined
            });
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                return setError(validationError.errors[0].message);
            }
            return setError("Invalid input data.");
        }

        setLoading(true);

        try {
            if (mode === "signup") {
                await authService.signUpWithEmail(sanitizedName, sanitizedEmail, password);
                showToast(`Account created successfully! Welcome, ${sanitizedName}!`);
            } else {
                const userCredential = await authService.signInWithEmail(sanitizedEmail, password);
                const displayName = userCredential.user.displayName || userCredential.user.email?.split("@")[0] || "User";
                showToast(`Welcome back, ${displayName}!`);
            }
            router.push("/");
        } catch (err) {
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles Google OAuth authentication.
     */
    const handleGoogleAuth = async () => {
        setError("");
        setGoogleLoading(true);
        
        try {
            const result = await authService.signInWithGoogle();
            const displayName = result.user.displayName || result.user.email?.split("@")[0] || "User";
            
            if (mode === "signup") {
                showToast(`Account created successfully! Welcome, ${displayName}!`);
            } else {
                showToast(`Welcome back, ${displayName}!`);
            }
            router.push("/");
        } catch (err) {
            // Check if it's a closed popup error, which we can ignore
            if (err.code !== "auth/popup-closed-by-user") {
                setError(getFriendlyErrorMessage(err));
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, loading, googleLoading,
        handleSubmit, handleGoogleAuth
    };
}
