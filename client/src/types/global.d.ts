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
        status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
        totalPrice: number;
        chefName: string;
        pickupTime: string;
        createdAt: string;
        dealId: string;
        eaterId: string;
    }
};