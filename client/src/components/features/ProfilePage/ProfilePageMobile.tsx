import { Link } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";

const ProfilePageMobile = () => {
    return (
        <div className='flex md:hidden flex-col justify-between py-6 px-4'>
            <p className="text-2xl font-bold">Profile</p>

            <Link to='/notifications'>
                <BellIcon className="w-8" />
            </Link>
        </div>
    )
}

export default ProfilePageMobile;