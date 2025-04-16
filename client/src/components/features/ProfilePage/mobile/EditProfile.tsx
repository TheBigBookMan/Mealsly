import React, { useEffect, useState } from "react";
import ModalSlideUp from "../../../common/ui/ModalSlideUp";

import Me from '../../../../assets/Me.jpg';
import FileUpload from "../../../common/ui/FileUpload";
import Button from "../../../common/ui/Button";
import Input from "../../../common/ui/Input";
import { useUser } from "../../../../contexts/UserContext";

interface EditProfileInterface {
    editProfileModal: boolean;
    setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type ProfileDetails = {
    legalName: string;
    email: string;
    phoneNumber: string;
    profilePic: string;
}

type EditProfileDetails = {
    legalName: boolean;
    email: boolean;
    phoneNumber: boolean;
}

const EditProfile = ({editProfileModal, setEditProfileModal}: EditProfileInterface) => {   
    const {user} = useUser();
    
    const [imgUploadLoading, setImgUploadLoading] = useState(false);
    
    const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
        legalName: '',
        email: '',
        phoneNumber: '',
        profilePic: ''
    });

    const [editProfileDetails, setEditProfileDetails] = useState<EditProfileDetails>({
        legalName: false,
        email: false,
        phoneNumber: false,
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setImgUploadLoading(true);
    
        // TODO this is temp to see styling
        // Simulate upload delay
        setTimeout(() => {
            console.log("Uploaded:", file.name);
            setImgUploadLoading(false);
        }, 2000);
    };

    const saveProfileInfo = async (field: keyof typeof profileDetails) => {
        console.log(profileDetails[field]);

        setEditProfileDetails({
            ...editProfileDetails,
            [field]: false
        })
    }

    const checkUnsaved = () => {
        // TODO create a better confirmation modal reuseable component
        let unsaved = 0;
        
        Object.values(editProfileDetails).forEach((v) => v && unsaved++);

        if(unsaved > 0) {
            const confirmation = confirm("You have unsaved changes, are you sure you want to exit?");

            if(!confirmation) {
                return;
            } else {
                setEditProfileDetails({
                    legalName: false,
                    email: false,
                    phoneNumber: false,
                })
                setEditProfileModal(false);
            }
        } else {
            setEditProfileDetails({
                legalName: false,
                email: false,
                phoneNumber: false,
            })
            setEditProfileModal(false);
        }
    }

    // TODO need to add in mobile number
    useEffect(() => {
        if(user) {
            setProfileDetails({
                legalName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phoneNumber: '123123123123123',
                profilePic: user.profileImage
            });
        }
    }, [user]);

    return (
        <ModalSlideUp title='Edit Profile' isOpen={editProfileModal} onClose={() => checkUnsaved()}>
            <div className='flex flex-col w-full h-full px-2'>
                <div className='flex justify-between w-full items-center border-b py-4'>
                    <img src={profileDetails.profilePic} className='w-20 rounded-full'/>
                    
                    <div className='ml-auto'>
                        <FileUpload
                            onChange={handleFileChange}
                            isLoading={imgUploadLoading}
                            accept="image/*"
                            />
                    </div>
                </div>

                <div className='flex justify-between w-full items-center border-b py-4'>
                    <div className='flex flex-col items-center'>
                        {editProfileDetails.legalName ? (
                            <Input label='Legal name' value={profileDetails.legalName} onChange={(e) => setProfileDetails({...profileDetails, legalName: e.target.value})} />
                        ) : (
                            <div className='flex flex-col'>
                                <p className='text-sky-700 font-bold'>Legal name</p>
                                <p>{profileDetails.legalName}</p>
                            </div>
                        )}
                    </div>

                    {editProfileDetails.legalName ? (
                        <Button onClick={() => saveProfileInfo('legalName')} className='max-w-[80px]'>Save</Button>
                    ) : (
                        <p onClick={() => setEditProfileDetails({...editProfileDetails, legalName: true})} className='text-black underline font-bold hover:cursor-pointer'>Edit</p>
                    )}
                </div>

                <div className='flex justify-between w-full items-center border-b py-4'>
                    <div className='flex flex-col items-center'>
                        {editProfileDetails.email ? (
                            <Input label='Email' value={profileDetails.email} onChange={(e) => setProfileDetails({...profileDetails, email: e.target.value})} />
                        ) : (
                            <div className='flex flex-col'>
                                <p className='text-sky-700 font-bold'>Email</p>
                                <p>{profileDetails.email}</p>
                            </div>
                        )}
                    </div>

                    {editProfileDetails.email ? (
                        <Button onClick={() => saveProfileInfo('email')} className='max-w-[80px]'>Save</Button>
                    ) : (
                        <p onClick={() => setEditProfileDetails({...editProfileDetails, email: true})} className='text-black underline font-bold hover:cursor-pointer'>Edit</p>
                    )}
                </div>

                <div className='flex justify-between w-full items-center border-b py-4'>
                    <div className='flex flex-col items-center'>
                        {editProfileDetails.phoneNumber ? (
                            <Input type='number' label='Phone number' value={profileDetails.phoneNumber} onChange={(e) => setProfileDetails({...profileDetails, phoneNumber: e.target.value})} />
                        ) : (
                            <div className='flex flex-col'>
                                <p className='text-sky-700 font-bold'>Phone number</p>
                                <p>{profileDetails.phoneNumber}</p>
                            </div>
                        )}
                    </div>

                    {editProfileDetails.phoneNumber ? (
                        <Button onClick={() => saveProfileInfo('phoneNumber')} className='max-w-[80px]'>Save</Button>
                    ) : (
                        <p onClick={() => setEditProfileDetails({...editProfileDetails, phoneNumber: true})} className='text-black underline font-bold hover:cursor-pointer'>Edit</p>
                    )}
                </div>
            </div>
        </ModalSlideUp>
    )
}

export default EditProfile;