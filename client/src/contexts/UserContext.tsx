import {createContext, useContext, useEffect, useState} from 'react';
import { loginWithGoogle } from '../utils/auth';

type UserContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
    login: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    logout() {},
    login() {}
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>({
        username: 'Ben'
    });
    const [loading, setLoading] = useState<boolean>(true);

    const login = async () => {
        try {
            const token = await loginWithGoogle();
        
            // Call your backend to get user profile
            const res = await fetch("/api/auth/login", {
                headers: { Authorization: `Bearer ${token}` },
            });
        
            const data = await res.json();
            setUser(data);
            
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const logout = async () => {
        console.log('logout');
    }

    return (
        <UserContext.Provider value={{user, loading, logout, login}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
