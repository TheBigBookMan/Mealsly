import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

export default function StripeWrapper({ children }: { children: React.ReactNode }) {
    return <Elements stripe={stripePromise}>{children}</Elements>;
}