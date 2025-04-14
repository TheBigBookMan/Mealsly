import { useUser } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import { MapPinIcon, MagnifyingGlassIcon, ChatBubbleLeftIcon,  ListBulletIcon } from '@heroicons/react/24/outline';
import { useLocation } from "react-router-dom";
import ME from '../../../assets/Me.jpg';

const Navbar = () => {
    const {user, loading} = useUser();
    const {pathname} = useLocation();

    return (
        <ul className='fixed bottom-0 left-0 right-0 z-49 flex justify-around items-center md:hidden h-[60px] border-t bg-white'>
            <Link to="/" className={`flex flex-col items-center ${pathname === '/' && 'text-sky-600 font-bold'}`}>
                <MagnifyingGlassIcon className="w-6 h-6 " />
                <p className='text-xs'>Explore</p>
            </Link>
            
            <Link to="/map" className={`flex flex-col items-center ${pathname === '/map' && 'text-sky-600 font-bold'}`}>
                <MapPinIcon className="w-6 h-6 " />
                <p className='text-xs'>Map</p>
            </Link>

            {user && (
                <Link to="/orders" className={`flex flex-col items-center ${pathname === '/orders' && 'text-sky-600 font-bold'}`}>
                    <ListBulletIcon className="w-6 h-6 " />
                    <p className='text-xs'>Orders</p>
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
                    <img src={ME} className={`rounded-full w-6 h-6 ${pathname.includes('/profile') && 'border-2 border-sky-600'}`} />
                    <p className='text-xs'>Profile</p>
                </Link>
            )}
        </ul>
    )
}

export default Navbar;