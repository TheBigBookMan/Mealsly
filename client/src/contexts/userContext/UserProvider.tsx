import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../utils/firebase';
import api from "../../utils/api";
import { loginWithGoogle, registerWithEmail } from "../../utils/auth";
import { getUserLocation } from "../../utils/functions";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLocation, setUserLocation] = useState<UserLocation>({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(true);

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

    const loginWithEmail = async ({ email, password }: LoginWithEmailDetails) => {
        const token = await registerWithEmail(email, password);
        const res = await api.post("/auth/login",  {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
            setUser(res.data);
            await updateEaterLocation(res.data.eaterId);
        }
    };

    const logout = async () => {
        await auth.signOut();
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
            loginWithEmail,
            userLocation,
            updateEaterLocation,
        }}>
            {children}
        </UserContext.Provider>
    );
};