export {};

declare global {
    interface User {
        username: string;
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
        pickupTime: string;
        createdAt: string;
        dealId: string?;
        chefId: string;
        eaterId: string;
    }
};