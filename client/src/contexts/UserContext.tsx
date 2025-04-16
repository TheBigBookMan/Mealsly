import {createContext, useContext, useEffect, useState} from 'react';
import { loginWithGoogle } from '../utils/auth';

type UserContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
    loginWithGoogle: () => void;
    loginWithFacebook: () => void;
    loginWithEmail: ({email, password}: LoginWithEmailDetails) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    logout() {},
    loginWithFacebook() {},
    loginWithGoogle() {},
    loginWithEmail() {}
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // ? Login with google
    const loginWithGoogle = async (): Promise<void> => {
        console.log('login with google');
        return;
        try {
            const token = await loginWithGoogle();
        
            // Call your backend to get user profile
            const res = await fetch("/api/auth/login", {
                headers: { Authorization: `Bearer ${token}` },
            });
        
            const data = await res.json();
            setUser(data);
            
        } catch (err) {
            console.error("Login error with google", err);
        }
    };

    // ? Login with facebook
    const loginWithFacebook = async (): Promise<void> => {
        try {
            console.log('login with facebook');

        } catch(err) {
            console.error("Login error with facebook", err);
        }
    }

    // ? Login with email
    const loginWithEmail = async ({email, password}: LoginWithEmailDetails): Promise<void> => {
        try {

            console.log(email);
            console.log(password);

        } catch(err) {
            console.error('Login error with email', err);
        }
    }

    const logout = async () => {
        console.log('logout');
    }

    return (
        <UserContext.Provider value={{user, loading, logout, loginWithGoogle, loginWithEmail, loginWithFacebook}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
