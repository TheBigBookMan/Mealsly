import {createContext, useContext, useEffect, useState} from 'react';

type UserContextType = {
    user: User | null;
    loading: boolean;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>({
        username: 'Ben'
    });
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
