import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center w-full h-full p-10">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
                <ArrowPathIcon className="h-8 w-8 text-sky-500" />
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;