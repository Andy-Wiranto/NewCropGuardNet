import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut 
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
}

export const authService = new AuthService();
