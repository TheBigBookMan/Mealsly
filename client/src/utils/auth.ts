import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export const loginWithGoogle = async (): Promise<string> => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return token;
};

export const registerWithEmail = async (email: string, password: string): Promise<string> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    return token;
};