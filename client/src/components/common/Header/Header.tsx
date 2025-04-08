import { Link } from "react-router-dom";
import Me from '../../../assets/Me.jpg';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../../../contexts/UserContext";
import AuthMenu from "./AuthMenu";
import UnauthMenu from "./UnauthMenu";

const Header = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const {logout, user} = useUser();

    const toggleNav = (state: boolean) => {
        setNavOpen(state);
    }

    return (
        <div className='hidden md:flex md:justify-between md:items-center px-10 min-h-[80px] border-b w-full '>
            <Link to="/">
                <p className='text-xl font-bold'>Mealsly</p>
            </Link>

            <div className='flex justify-end items-center gap-12 w-full'>
                <div className='flex gap-4'>
                    <Link to="/register-chef" className='hover:font-bold hover:text-sky-500'>Become a chef</Link>
                </div>

                <div className='relative'>
                    <div onClick={() => setNavOpen(!navOpen)} className={`flex border rounded-3xl  w-[100px] h-[50px] hover:cursor-pointer transition items-center justify-between pr-2 pl-4 ${navOpen ? 'border-sky-300 shadow-lg' : 'border-slate-300 hover:shadow-lg hover:border-sky-300'}`}>
                        <div className='flex flex-col gap-1'>
                            <div className='h-[2px] w-[16px] bg-slate-500'></div>
                            <div className='h-[2px] w-[16px] bg-slate-500'></div>
                            <div className='h-[2px] w-[16px] bg-slate-500'></div>
                        </div>

                        <img src={Me} className='w-[36px] h-[36px] rounded-full ' />
                    </div>

                    <AnimatePresence>
                        {navOpen && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className="absolute flex flex-col w-[220px] h-[400px] border rounded-xl right-2 top-14 bg-white shadow-lg"
                            >
                                {user ? (
                                    <AuthMenu logout={logout} toggleNav={toggleNav} />
                                ) : (
                                    <UnauthMenu toggleNav={toggleNav} />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Header;