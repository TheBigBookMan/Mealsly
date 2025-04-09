import ProfilePageDesktop from "../components/features/ProfilePage/ProfilePageDesktop";
import ProfilePageMobile from "../components/features/ProfilePage/ProfilePageMobile";


const ProfilePage = () => {
    return (
        <div className='flex flex-col h-full w-full '>
            <ProfilePageMobile />

            <ProfilePageDesktop />
        </div>
    )
}

export default ProfilePage;