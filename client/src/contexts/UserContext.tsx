import {createContext, useContext, useEffect, useState} from 'react';

type UserContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    logout() {},
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>({
        username: 'Ben'
    });
    const [loading, setLoading] = useState<boolean>(true);

    const logout = async () => {
        console.log('logout');
    }

    return (
        <UserContext.Provider value={{user, loading, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
