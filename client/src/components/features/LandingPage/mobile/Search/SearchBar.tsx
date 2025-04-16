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
        <div className='h-[60px] flex items-center justify-center pt-2 sticky top-0 bg-slate-100 z-50'>
            <div onClick={() => setSearchModal(!searchModal)} className='w-5/6 bg-white border rounded-3xl border-sky-200 shadow-lg h-5/6 flex items-center justify-center gap-2 hover:bg-sky-100 hover:cursor-pointer transition'>
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
                        className="fixed top-0 left-0 right-0 bottom-[60px] z-50 bg-white flex flex-col"
                    >
                        <SearchModal toggleModal={toggleModal} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default SearchBar;