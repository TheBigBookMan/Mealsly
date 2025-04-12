import { useState } from "react";
import ModalSlideUp from "../../../common/ui/ModalSlideUp";
import { FaCar } from "react-icons/fa";
import { CameraIcon, GlobeAltIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import FileUpload from "../../../common/ui/FileUpload";
import Button from "../../../common/ui/Button";

interface IdentityVerificationInterface {
    verifiedModal: boolean;
    setVerifiedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO the drivers license and identity card need front enad back, passport just one

const IdentityVerification = ({verifiedModal, setVerifiedModal}: IdentityVerificationInterface) => {
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setLoading(true);
    
        // TODO this is temp to see styling
        // Simulate upload delay
        setTimeout(() => {
            console.log("Uploaded:", file.name);
            setLoading(false);
        }, 2000);
    };

    return (
        <ModalSlideUp title='Identity Verification' isOpen={verifiedModal} onClose={() => setVerifiedModal(false)}>
            <div className='flex flex-col'>
                <div className="flex flex-col border-b pb-2">
                    <p className='text-xl font-bold'>Let's verify your identity</p>

                    <p className='text-sm'>Verification ensures trust, safety, and accountability across our community of chefs and eaters.</p>

                    {/* TIODO link to the help center page about this */}
                    <p className='text-sky-700 underline'>How identity verification works.</p>
                </div>


                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <p className='text-lg font-bold'>Add an ID</p>
                        <p  className='text-sm'>We'll need you to add an official government ID.</p>
                    </div>

                    <div className="flex flex-col">
                        <p>Choose an ID type</p>

                        <div className="flex flex-col gap-2">
                            <div onClick={() => setSelectedId('driver')} className={`border-2  rounded-lg h-fit w-full flex gap-2 items-center p-4 hover:cursor-pointer  ${selectedId === 'driver' ? 'border-sky-700 text-sky-700 bg-slate-100' : 'border-slate-300 hover:border-sky-700 hover:text-sky-700 hover:bg-slate-100 '}`}>
                                <FaCar className="text-2xl" />
                                <p>Driver's licence</p>
                            </div>

                            <div onClick={() => setSelectedId('passport')} className={`border-2  rounded-lg h-fit w-full flex gap-2 items-center p-4 hover:cursor-pointer  ${selectedId === 'passport' ? 'border-sky-700 text-sky-700 bg-slate-100' : 'border-slate-300 hover:border-sky-700 hover:text-sky-700 hover:bg-slate-100 '}`}>
                                <GlobeAltIcon className="w-6" />
                                <p>Passport</p>
                            </div>
                            
                            <div onClick={() => setSelectedId('id')} className={`border-2  rounded-lg h-fit w-full flex gap-2 items-center p-4 hover:cursor-pointer  ${selectedId === 'id' ? 'border-sky-700 text-sky-700 bg-slate-100' : 'border-slate-300 hover:border-sky-700 hover:text-sky-700 hover:bg-slate-100'}`}>
                                <IdentificationIcon className="w-6" />
                                <p>Identity card</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <p>Upload an existing photo</p>
                        <FileUpload
                            onChange={handleFileChange}
                            isLoading={loading}
                            accept="image/*"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <p>Take a new photo</p>
                        {/* TODO add in the access to camera and take a photo */}
                        <Button>
                            <CameraIcon className='text-slate-100 w-6'/>
                        </Button>
                    </div>
                </div>
            </div>
        </ModalSlideUp>
    )
}

export default IdentityVerification;