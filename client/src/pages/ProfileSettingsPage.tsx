import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ProfileSettingsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isNestedRoute = location.pathname !== "/profile-settings";

    return (
        <div className="flex md:hidden flex-col  gap-2 py-6 px-4 h-full w-full">
            <div className="flex w-full justify-between items-center mb-4">
                {isNestedRoute ? (
                <button
                    onClick={() => navigate("/profile-settings")}
                    className="flex items-center gap-1 text-sky-700  hover:underline"
                >
                    <ArrowLeftIcon className="w-5 h-5 " />
                </button>
                ) : <div />} 

                <p className="text-2xl font-bold">Account settings</p>

                <div className="w-[60px]" />
            </div>

            <Outlet />
        </div>
    );
};

export default ProfileSettingsPage;