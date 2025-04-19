import { useContext } from "react";
import { UserContext } from "./UserContext";

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

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};