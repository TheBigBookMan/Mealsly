import { useUser } from "../../../contexts/userContext/useUser";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon, HomeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useLocation } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import Login from "../../../pages/Login";
import { useEffect, useState } from "react";
import ModalSlideUp from "../ui/ModalSlideUp";
import { TfiMenuAlt } from "react-icons/tfi";

// TODO need a template profile image if they sign up with email and dont have a profile pic etc
import defaultPfp from '../../../assets/default-pfp.png';

// TODO this will need to only have Login when open and not authed 

const Navbar = () => {
    const {user, loading} = useUser();
    const {pathname} = useLocation();

    const [loginModal, setLoginModal] = useState<boolean>(false);

    return (
        <ul className='fixed bottom-0 left-0 right-0 z-49 flex w-full md:hidden h-[60px] border-t bg-white'>
            <ModalSlideUp isOpen={loginModal} onClose={() => setLoginModal(false)} title="Login">
                <Login setLoginModal={setLoginModal} />
            </ModalSlideUp>

            {!user ? (
                <div onClick={() => setLoginModal(true)} className={`flex flex-col items-center hover:cursor-pointer`}>
                    <CiLogin className='text-2xl' />
                    <p className='text-xs'>Login</p>
                </div>
            ) : (
                <div className='flex justify-around items-center w-full'>
                    <Link to="/" className={`flex flex-col items-center ${pathname === '/' && 'text-sky-600 font-bold'}`}>
                        <HomeIcon className="w-6 h-6 " />
                        <p className='text-xs'>Home</p>
                    </Link>
                    
                    <Link to="/calendar" className={`flex flex-col items-center ${pathname === '/calendar' && 'text-sky-600 font-bold'}`}>
                        <CalendarDaysIcon className="w-6 h-6 " />
                        <p className='text-xs'>Calendar</p>
                    </Link>

                    <Link to="/menu" className={`flex flex-col items-center ${pathname === '/menu' && 'text-sky-600 font-bold'}`}>
                        <TfiMenuAlt className="text-2xl" />
                        <p className='text-xs'>Menu</p>
                    </Link>

                    <Link to="/messages" className={`flex flex-col items-center ${pathname.includes('/messages') && 'text-sky-600 font-bold'}`}>
                        <ChatBubbleLeftIcon className="w-6 h-6 " />
                        <p className='text-xs'>Messages</p>
                    </Link>

                    <Link to="/profile" className={`flex flex-col items-center ${pathname.includes('/profile') && 'text-sky-600 font-bold'}`}>
                        <img src={user.profileImage === '' ? defaultPfp : user.profileImage} className={`rounded-full w-6 h-6 ${pathname.includes('/profile') && 'border-2 border-sky-600'}`} />
                        <p className='text-xs'>Profile</p>
                    </Link>
                </div>
            )}
        </ul>
    )
}

export default Navbar;