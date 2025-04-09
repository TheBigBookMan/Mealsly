import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, className = "", ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
        {label && <label className='text-sky-700'>{label}</label>}

            <input
                value={value}
                onChange={onChange}
                className={`
                h-10 w-full px-3 rounded-md border border-slate-300 
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 
                transition ${className}
                `}
                {...props}
            />
        </div>
    );
};

export default Input;