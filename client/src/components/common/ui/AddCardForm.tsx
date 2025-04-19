import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import Button from "./Button";

export default function AddCardForm({ onSuccess }: { onSuccess?: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchIntent = async () => {
            const { data } = await api.post("/user/create-setup-intent");
            setClientSecret(data.clientSecret);
        };
        fetchIntent();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const result = await stripe.confirmCardSetup(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        if (result.error) {
            console.error(result.error.message);
        } else {
        // success
            onSuccess?.();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full w-full gap-2">
            <CardElement className="border p-2 rounded-md h-full w-full" />
            <Button className="bg-sky-700 text-white p-2 rounded-md">Add Card</Button>
        </form>
    );
}