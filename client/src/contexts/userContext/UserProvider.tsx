import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../utils/firebase';
import api from "../../utils/api";
import { loginWithEmail, loginWithGoogle, registerWithEmail } from "../../utils/auth";
import { getUserLocation } from "../../utils/functions";
import { UserContext } from "./UserContext";
import { MdError } from "react-icons/md";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLocation, setUserLocation] = useState<UserLocation>({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(true);
    
    const skipAutoLoginRef = useRef(false);

    const updateEaterLocation = async (eaterId: string) => {
        if (!eaterId) return;
        try {
            const location = await getUserLocation();
            await api.put(`/eater/${eaterId}/lat-lon`, {
                latitude: location.lat,
                longitude: location.lon,
            });
            setUserLocation(location);
        } catch (err) {
            console.error("Location error:", err);
        }
    };

    const loginGoogle = async (): Promise<void> => {
        try {
            skipAutoLoginRef.current = true;
            const token = await loginWithGoogle();

            const res = await api.post("/auth/login", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data) {
                setUser(res.data);
                await updateEaterLocation(res.data.eaterId);
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || "Login with Google failed.";
            throw new Error(message);
        }
    };

    const loginFacebook = async () => {
        console.log("Login with Facebook – placeholder");
    };

    const loginWithEmailFirebase = async ({ email, password }: LoginWithEmailDetails) => {
        try {
            skipAutoLoginRef.current = true;
            const token = await loginWithEmail(email, password);

            const res = await api.post("/auth/login", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (res.data) {
                setUser(res.data);
                await updateEaterLocation(res.data.eaterId);
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || "Login with email failed.";
            throw new Error(message);
        }
    };

    const signupWithEmail = async ({email, password}: LoginWithEmailDetails) => {
        try {
            skipAutoLoginRef.current = true;
            const token = await registerWithEmail(email, password);

            const res = await api.post("/auth/signup-email", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            
            if (res.data) {
                setUser(res.data);
                await updateEaterLocation(res.data.eaterId);
            }

        } catch(err: any) {
            console.error("Signup with email failed.", err);
            const message = err.message;
            throw new Error(message);
        } finally {
            setTimeout(() => {
                skipAutoLoginRef.current = false;
            }, 300);
        }
    }

    const logout = async () => {
        await auth.signOut();
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (skipAutoLoginRef.current) return;

            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();
                    const res = await api.post("/auth/login", {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data);
                    setUserLocation({ lat: res.data.lat, lon: res.data.lon });
                } catch (error) {
                    console.error("Auto-login error:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            logout,
            loginGoogle,
            loginFacebook,
            loginWithEmailFirebase,
            userLocation,
            updateEaterLocation,
            signupWithEmail
        }}>
            {children}
        </UserContext.Provider>
    );
};