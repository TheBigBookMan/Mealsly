import { Link } from "react-router-dom";

interface AuthMenuInterface {
    logout: () => void;
    toggleNav: (state: boolean) => void;
}

const AuthMenu = ({logout, toggleNav}: AuthMenuInterface) => {
    return (
        <div className='flex flex-col gap-1 p-2'>
            <Link onClick={() => toggleNav(false)} to="/profile" className='hover:bg-sky-100 border border-white hover:border-sky-100 rounded-2xl p-1 pl-2 transition'>
                <p className=''>Profile</p>
            </Link>

            <Link onClick={() => toggleNav(false)} to="/messages" className='hover:bg-sky-100 border border-white hover:border-sky-100 rounded-2xl p-1 pl-2 transition'>
                <p>Messages</p>
            </Link>

            <Link onClick={() => toggleNav(false)} to="/notifications" className='hover:bg-sky-100 border border-white hover:border-sky-100 rounded-2xl p-1 pl-2 transition'>
                <p>Notifications</p>
            </Link>

            <div className='hover:cursor-pointer hover:bg-pink-100 pl-2 p-1 border border-white hover:border-sky-100 rounded-2xl transition' onClick={logout}>
                <p className='text-pink-400'>Logout</p>
            </div>
        </div>
    )
}

export default AuthMenu;