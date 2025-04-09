import React from "react";

type ButtonVariant = "primary" | "error" | "success" | "info";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
}

const baseStyles = "flex items-center justify-center w-[120px] h-[40px] transition text-slate-100 rounded-lg gap-2";

const variantStyles: Record<ButtonVariant, string> = {
    primary: "border border-sky-700 bg-sky-700 hover:bg-sky-800",
    error: "border border-red-600 bg-red-600 hover:bg-red-700",
    success: "border border-green-600 bg-green-600 hover:bg-green-700",
    info: "border border-cyan-600 bg-cyan-600 hover:bg-cyan-700",
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className, ...props }) => {
    const style = `${baseStyles} ${variantStyles[variant]} ${className ?? ""}`;

    return (
        <button className={style} {...props}>
            {children}
        </button>
    );
};

export default Button;