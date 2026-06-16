import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import { auth } from "@/config/firebase";

/**
 * Authentication service handling all Firebase Auth interactions.
 * Enforces separation of concerns by keeping API calls out of UI components.
 */
class AuthService {
    /**
     * Signs in a user with email and password.
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<import("firebase/auth").UserCredential>}
     */
    async signInWithEmail(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    /**
     * Creates a new user and updates their display name.
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<import("firebase/auth").UserCredential>}
     */
    async signUpWithEmail(name, email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        return userCredential;
    }

    /**
     * Signs in a user using the Google Auth provider.
     * @returns {Promise<import("firebase/auth").UserCredential>}
     */
    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    /**
     * Signs out the current user.
     * @returns {Promise<void>}
     */
    async logout() {
        return await signOut(auth);
    }

    /**
     * Sends a password reset email to the given email address.
     * Uses actionCodeSettings so the reset link redirects back to the app.
     * @param {string} email 
     * @returns {Promise<void>}
     */
    async sendPasswordReset(email) {
        const actionCodeSettings = {
            // Firebase will append oobCode as a query parameter to this URL
            url: typeof window !== "undefined" 
                ? `${window.location.origin}/signin` 
                : "http://localhost:3000/signin",
            handleCodeInApp: false,
        };
        return await sendPasswordResetEmail(auth, email, actionCodeSettings);
    }

    /**
     * Confirms a password reset with the code from the email link.
     * @param {string} code 
     * @param {string} newPassword 
     * @returns {Promise<void>}
     */
    async confirmPasswordResetWithCode(code, newPassword) {
        return await confirmPasswordReset(auth, code, newPassword);
    }
}

export const authService = new AuthService();
