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
    }

    interface PaymentCard {
        cardNumber: string,
        cardExpiry: string,
        cardCvv: string,
        cardPostcode: string,
        cardCountry: string
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
        cuisines: string[];
    }

    interface Cuisine {
        id: string;
        name: string;
        popularity: number;
        flagCode: string;
    }

    interface ChefCuisine {
        id: string;
        chefId: string;
        cuisineId: string;
        cuisine: Cuisine;
    }

    interface Listing {
        id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        available: boolean;
        createdAt: string;

    }

    interface Message {
        id: string;
        senderType: "CHEF" | "EATER";
        content: string;
        createdAt: string;
        seen: boolean;
    };

    interface Order {
        id: string;
        title: string;
        status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
        totalPrice: number;
        chefName: string;
        pickupTime: string;
        createdAt: string;
        dealId: string;
        eaterId: string;
    }

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
};