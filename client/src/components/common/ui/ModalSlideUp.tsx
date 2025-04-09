import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalSlideUpProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title: string;
}

const ModalSlideUp: React.FC<ModalSlideUpProps> = ({
    isOpen,
    onClose,
    children,
    title,
    className = "",
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed top-0 left-0 right-0 bottom-[60px] z-50 bg-white rounded-t-xl shadow-xl overflow-y-auto ${className}`}
                    >
                        <div className='flex flex-col w-full h-full '>
                            <div className='flex w-full h-[60px] border-b items-center gap-8 pl-4'>
                                <XMarkIcon onClick={onClose} className='w-10 hover:cursor-pointer border rounded-full border-white hover:bg-slate-100 p-1 transition' />

                                <p className="font-bold text-black text-center">{title}</p>
                            </div>

                            <div className='flex flex-col overflow-y-auto'>
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ModalSlideUp;