import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const loginWithGoogle = async (): Promise<string> => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return token;
};

export const registerWithEmail = async (email: string, password: string): Promise<string> => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const token = await result.user.getIdToken();
        return token;
    } catch (error: any) {
        if (error.code === "auth/weak-password") {
            throw new Error("Password is too weak. Please choose a stronger password.");
        }
        if (error.code === "auth/email-already-in-use") {
            throw new Error("This email is already registered.");
        }
        if (error.code === "auth/invalid-email") {
            throw new Error("Invalid email address.");
        }

        // fallback for other unhandled errors
        console.error("Firebase registration error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const loginWithEmail = async (email: string, password: string): Promise<string> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    return token;
};