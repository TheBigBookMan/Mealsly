import LandingPageDesktop from "../components/features/LandingPage/LandingPageDesktop";
import LandingPageMobile from "../components/features/LandingPage/LandingPageMobile";

const LandingPage = () => {
    return (
        <div className='h-full w-full'>
            <LandingPageDesktop />

            <LandingPageMobile />
        </div>
    )
}

export default LandingPage;