import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage = ({ message = "Something went wrong" }: ErrorMessageProps) => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 max-w-sm mx-auto "
        >
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            <span className="text-sm font-medium">{message}</span>
        </motion.div>
    );
};

export default ErrorMessage;