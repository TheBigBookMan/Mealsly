import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from './SearchModal';

const SearchBar = () => {
    const [searchModal, setSearchModal] = useState<boolean>(false);

    const toggleModal = (state: boolean) => {
        setSearchModal(state);
    }

    return (
        <div className='h-[60px] flex items-center justify-center pt-2'>
            <div onClick={() => setSearchModal(!searchModal)} className='w-5/6 border rounded-3xl border-sky-200 shadow-lg h-5/6 flex items-center justify-center gap-2 hover:bg-sky-100 hover:cursor-pointer transition'>
                <MagnifyingGlassIcon className='w-6 h-6' />

                <p>Search...</p>
            </div>

            <AnimatePresence>
                {searchModal && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }} 
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute flex flex-col w-full h-full border rounded-xl top-0 bg-white shadow-lg"
                    >
                        <SearchModal toggleModal={toggleModal} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default SearchBar;