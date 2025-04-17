import React, {createContext, useContext, useEffect, useState} from 'react';
import { loginWithGoogle } from '../utils/auth';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase';
import api from '../utils/api';
import { getUserLocation } from '../utils/functions';

type UserContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
    loginGoogle: () => void;
    loginFacebook: () => void;
    loginWithEmail: ({email, password}: LoginWithEmailDetails) => void;
    userLocation: UserLocation;
    updateEaterLocation: (eaterId: string) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    logout() {},
    loginFacebook() {},
    loginGoogle() {},
    loginWithEmail() {},
    userLocation: {
        lat: 0,
        lon: 0
    },
    updateEaterLocation() {}
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const updateEaterLocation = async (eaterId: string): Promise<void> => {
        if(!eaterId) return;

        try {
            const location = await getUserLocation();

            await api.put(`/eater/${eaterId}/lat-lon`, {
                latitude: location.lat,
                longitude: location.lon,
            });

            setUserLocation({
                lat: location.lat,
                lon: location.lon
            });

            console.log("Location updated");
            
        } catch (err) {
            console.error("Location error:", err);
        }
    }

    // TODO these need to also return lat lon to store in context
    // ? Login with google
    const loginGoogle = async (): Promise<void> => {
        try {
            const token = await loginWithGoogle();
        
            // Call your backend to get user profile
            const res = await api.post("/auth/login", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if(res.data) {
                setUser(res.data);
                await updateEaterLocation(res.data.eaterId);
            }
            
        } catch (err: any) {
            const message = err?.response?.data?.message || "Login with Google failed.";
            throw new Error(message);
        }
    };

    // ? Login with facebook
    const loginFacebook = async (): Promise<void> => {
        console.log('login with facebook');
        return;

        try {

            const token = await loginWithGoogle();
        
            // Call your backend to get user profile
            const res = await api.post("/auth/login", {
                headers: { Authorization: `Bearer ${token}` },
            });
        
            console.log(res);
            // setUser(data);

        } catch(err) {
            console.error("Login error with facebook", err);
        }
    }

    // ? Login with email
    const loginWithEmail = async ({email, password}: LoginWithEmailDetails): Promise<void> => {
        try {

            console.log(email);
            console.log(password);
            return;

            // TODO make a simple email and password login
            // Call your backend to get user profile
            const res = await api.post("/auth/login-email", {
                
            });
        
            console.log(res);
            // setUser(data);

        } catch(err) {
            console.error('Login error with email', err);
        }
    }

    const logout = async () => {
        await auth.signOut();
        setUser(null);
    }

    // ✅ Persist session on refresh
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();

                    const res = await api.post("/auth/login", {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUser(res.data);
                    setUserLocation({
                        lat: res.data.lat,
                        lon: res.data.lon
                    })
                } catch (error) {
                    console.error("Auto-login error:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup
    }, []);

    return (
        <UserContext.Provider value={{user, loading, logout, loginGoogle, loginWithEmail, loginFacebook, userLocation, updateEaterLocation}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
