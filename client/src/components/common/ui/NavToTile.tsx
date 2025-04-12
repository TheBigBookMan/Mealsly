import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

interface NavToTileInterface {
    navTo: string;
    title: string;
    subtitle: string | null;
}

const NavToTile = ({navTo, title, subtitle}: NavToTileInterface) => {
    return (
        <Link to={navTo} className='min-h-[60px] w-full flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 rounded-xl gap-4 border-2 shadow py-2 px-4 transition'>
            <div className='flex flex-col justify-center'>
                <p className='text-sky-700 font-bold'>{title}</p>
                <p className='text-sm'>{subtitle}</p>
            </div>

            <ChevronRightIcon className='w-6' />
        </Link>
    )
}

export default NavToTile