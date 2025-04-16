import { Link } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon, PencilSquareIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HiOutlineLogout } from "react-icons/hi";
import { PiChefHat } from "react-icons/pi";


import ME from '../../../assets/Me.jpg';
import Card from "../../common/ui/Card";
import Button from "../../common/ui/Button";
import Input from "../../common/ui/Input";
import { useState } from "react";
import IdentityVerification from "./mobile/IdentityVerification";
import EditProfile from "./mobile/EditProfile";
import NavToTile from "../../common/ui/NavToTile";
import { useUser } from "../../../contexts/UserContext";

// !!! TEMP verified field
const PROFILETEMP = {
    firstName: "Ben",
    LastName: "Smerd",
    createdAt: "1",
    verified: false,
    emailConfirm: '',
    mobileConfirm: ''
}

const ProfilePageMobile = () => {
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [verifiedModal, setVerifiedModal] = useState<boolean>(false);
    const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
    const {logout} = useUser();
    

    const logoutConfirm = async (): Promise<void> => {
        const confirmation = confirm("Are you sure you want to logout?");
        if(!confirmation) return;

        await logout();
    }

    return (
        <div className='flex md:hidden flex-col items-center gap-2 py-6 px-4 h-full w-full pb-[60px]'>
            <IdentityVerification verifiedModal={verifiedModal} setVerifiedModal={setVerifiedModal} />

            <EditProfile editProfileModal={editProfileModal} setEditProfileModal={setEditProfileModal} />

            <div className='flex w-full justify-between' >
                <p className="text-2xl font-bold">Profile</p>

                <div className='flex gap-4'>
                    <PencilSquareIcon onClick={() => setEditProfileModal(true)} className='w-8 hover:cursor-pointer hover:text-sky-700' />

                    <Link to='/notifications'>
                        <BellIcon className="w-8 hover:text-sky-700" />
                    </Link>
                </div>
            </div>

            <Card className="w-full flex justify-between items-center">
                <div className='flex flex-col items-center gap-2'>
                    <img src={ME} className='w-24 rounded-full' />

                    <p className='text-2xl font-bold'>{PROFILETEMP.firstName}</p>
                </div>

                <div className='flex flex-col'>
                    <p className="text-xl text-black">{PROFILETEMP.createdAt}</p>
                    <p>Month on Measly</p>
                </div>
            </Card>

            {/* TODO This will need to a href to the other become a chef signup dashboard thing */}
            <div className={`h-[120px] w-full flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 rounded-xl gap-4 border-2 shadow-lg py-2 px-4 transition`}>
                <div className='flex flex-col'>
                    <p className='text-sky-700 font-bold text-lg'>Become a chef</p>
                    <p>It's easy to start cooking and earn extra income.</p>
                </div>
                <PiChefHat className='text-7xl' />
            </div>

            <NavToTile navTo="/profile-settings" title="Settings" subtitle={null} />

            <Card className="w-full flex flex-col gap-4">
                <div className='flex flex-col border-b pb-4'>
                    <p className='text-xl font-bold'>Confirmed Information</p>

                    <div className="flex flex-col gap-2">
                        <div className='flex flex-col'>
                            <p className='text-sky-700'>Email Address</p>

                            {PROFILETEMP.emailConfirm !== '' ? (
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm'>{PROFILETEMP.emailConfirm}</p>
                                    <CheckIcon className="w-6" />
                                </div>
                            ) : (
                                <div className='flex gap-4 justify-between'>
                                    <Input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />

                                    <Button>
                                        <p>Confirm</p>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-sky-700'>Mobile Number</p>

                            {PROFILETEMP.mobileConfirm !== '' ? (
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm'>{PROFILETEMP.mobileConfirm}</p>
                                    <CheckIcon className="w-6" />
                                </div>
                            ) : (
                                <div className='flex gap-4 justify-between'>
                                    <Input  type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile..." />

                                    <Button>
                                        <p>Confirm</p>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p className='text-xl font-bold'>Verify Your Identity</p>

                    <div className="flex flex-col gap-2">
                        <p className='text-sm'>Before you order a meal or become a chef, you need to complete this step.</p>

                        {PROFILETEMP.verified ? (
                            <div className='flex justify-between'>
                                <p>Verified</p>
                                <ShieldCheckIcon className='w-6 text-sky-700' />
                            </div>
                        ) : (
                            <Button onClick={() => setVerifiedModal(true)} variant='primary' className='min-w-[120px]'>
                                <ShieldCheckIcon className='w-6 ' />
                                <p>Verify</p>
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="w-full flex flex-col gap-4 items-center">
                <Button onClick={logoutConfirm} variant="error" className='min-w-full'>
                    <HiOutlineLogout className='text-xl' />
                    <p>Logout</p>
                </Button>
            </Card>
        </div>
    )
}

export default ProfilePageMobile;