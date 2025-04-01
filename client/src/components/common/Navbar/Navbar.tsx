import { useUser } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import { MapPinIcon, MagnifyingGlassIcon, ChatBubbleLeftIcon, UserCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const {user, loading} = useUser();
    const [selectedNav, setSelectedNav] = useState<string>('');
    const {pathname} = useLocation();
    
    useEffect(() => {
        if(pathname) {
            console.log(pathname);
            
        }
    }, [pathname]);

    return (
        <ul className='flex justify-around items-center md:hidden h-[60px] border-t'>
            <Link to="/" className={`flex flex-col items-center ${pathname === '/' && 'text-sky-600 font-bold'}`}>
                <MagnifyingGlassIcon className="w-6 h-6 " />
                <p className='text-xs'>Explore</p>
            </Link>
            
            <Link to="/map" className={`flex flex-col items-center ${pathname === '/map' && 'text-sky-600 font-bold'}`}>
                <MapPinIcon className="w-6 h-6 " />
                <p className='text-xs'>Map</p>
            </Link>

            <Link to="/listings" className={`flex flex-col items-center ${pathname === '/listings' && 'text-sky-600 font-bold'}`}>
                <ListBulletIcon className="w-6 h-6 " />
                <p className='text-xs'>Listings</p>
            </Link>

            <Link to="/messages" className={`flex flex-col items-center ${pathname === '/messages' && 'text-sky-600 font-bold'}`}>
                <ChatBubbleLeftIcon className="w-6 h-6 " />
                <p className='text-xs'>Messages</p>
            </Link>

            <Link to="/profile" className={`flex flex-col items-center ${pathname === '/profile' && 'text-sky-600 font-bold'}`}>
                <UserCircleIcon className="w-6 h-6 " />
                <p className='text-xs'>Profile</p>
            </Link>
        </ul>
    )
}

export default Navbar;