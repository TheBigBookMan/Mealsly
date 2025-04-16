import { useUser } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import { MapPinIcon, MagnifyingGlassIcon, ChatBubbleLeftIcon,  CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useLocation } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import Login from "../../../pages/Login";
import { useEffect, useState } from "react";
import ModalSlideUp from "../ui/ModalSlideUp";

const Navbar = () => {
    const {user, loading} = useUser();
    const {pathname} = useLocation();

    const [loginModal, setLoginModal] = useState<boolean>(false);

    return (
        <ul className='fixed bottom-0 left-0 right-0 z-49 flex justify-around items-center md:hidden h-[60px] border-t bg-white'>
            <ModalSlideUp isOpen={loginModal} onClose={() => setLoginModal(false)} title="Login">
                <Login setLoginModal={setLoginModal} />
            </ModalSlideUp>
            
            <Link to="/" className={`flex flex-col items-center ${pathname === '/' && 'text-sky-600 font-bold'}`}>
                <MagnifyingGlassIcon className="w-6 h-6 " />
                <p className='text-xs'>Explore</p>
            </Link>
            
            <Link to="/map" className={`flex flex-col items-center ${pathname === '/map' && 'text-sky-600 font-bold'}`}>
                <MapPinIcon className="w-6 h-6 " />
                <p className='text-xs'>Map</p>
            </Link>

            {!user && (
                <div onClick={() => setLoginModal(true)} className={`flex flex-col items-center hover:cursor-pointer`}>
                    <CiLogin className='text-2xl' />
                    <p className='text-xs'>Login</p>
                </div>
            )}

            {user && (
                <Link to="/plan" className={`flex flex-col items-center ${pathname === '/plan' && 'text-sky-600 font-bold'}`}>
                    <CalendarDaysIcon className="w-6 h-6 " />
                    <p className='text-xs'>Plan</p>
                </Link>
            )}

            {user && (
                <Link to="/messages" className={`flex flex-col items-center ${pathname.includes('/messages') && 'text-sky-600 font-bold'}`}>
                    <ChatBubbleLeftIcon className="w-6 h-6 " />
                    <p className='text-xs'>Messages</p>
                </Link>
            )}

            {user && (
                <Link to="/profile" className={`flex flex-col items-center ${pathname.includes('/profile') && 'text-sky-600 font-bold'}`}>
                    <img src={user.profileImage} className={`rounded-full w-6 h-6 ${pathname.includes('/profile') && 'border-2 border-sky-600'}`} />
                    <p className='text-xs'>Profile</p>
                </Link>
            )}
        </ul>
    )
}

export default Navbar;