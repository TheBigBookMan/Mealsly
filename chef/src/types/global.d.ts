export {};

declare global {
    interface LoginWithEmailDetails {
        email: string;
        password: string;
    }

    interface User {
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        postcode: string;
        suburb: string;
        state: string;
        eaterId: string;
        createdAt: string;
        chef: Chef;
    }

    interface UserLocation {
        lat: number;
        lon: number;
    }

    interface Chef {
        id: string;
        latitude: number;
        longitude: number;
        bio: string;
        isOnboarded: boolean;
    }

    type UserContextType = {
        user: User | null;
        loading: boolean;
        logout: () => void;
        loginGoogle: () => void;
        loginFacebook: () => void;
        loginWithEmailFirebase: ({email, password}: LoginWithEmailDetails) => void;
        userLocation: UserLocation;
        updateChefLocation: (eaterId: string) => void;
        signupWithEmail: ({email, password}: LoginWithEmailDetails) => void;
    };
};