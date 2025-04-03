import { ReactNode } from "react";

interface Card {
    children: ReactNode;
    className: string;
}

const Card = ({children, className}: Card) => {
    return (
        <div className={`rounded-xl p-4 shadow-lg bg-white ${className}`}>
            {children}
        </div>
    )
}

export default Card;