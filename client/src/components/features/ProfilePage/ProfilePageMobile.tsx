import { Link } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";

import ME from '../../../assets/Me.jpg';
import Card from "../../common/ui/Card";
import Button from "../../common/ui/Button";
import Input from "../../common/ui/Input";
import { useState } from "react";

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

    return (
        <div className='flex md:hidden flex-col items-center gap-2 py-6 px-4 h-full w-full'>
            <div className='flex w-full justify-between' >
                <p className="text-2xl font-bold">Profile</p>

                <Link to='/notifications'>
                    <BellIcon className="w-8" />
                </Link>
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
                            <Button variant='primary' className='min-w-[120px]'>
                                <p>Verify</p>
                                <ShieldCheckIcon className='w-6 ' />
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProfilePageMobile;