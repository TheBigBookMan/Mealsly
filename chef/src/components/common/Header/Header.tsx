import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='hidden md:flex md:justify-between md:items-center px-10 min-h-[80px] border-b w-full '>
            <Link to="/">
                <p className='text-xl font-bold'>Mealsly</p>
            </Link>
        </div>
    )
}

export default Header;