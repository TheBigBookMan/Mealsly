import { Link } from "react-router-dom";

interface UnathMenuInterface {
    toggleNav: (state: boolean) => void;
}

// TODO add in login, sign up etc

const UnauthMenu = ({toggleNav}: UnathMenuInterface) => {
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

        </div>
    )
}

export default UnauthMenu;