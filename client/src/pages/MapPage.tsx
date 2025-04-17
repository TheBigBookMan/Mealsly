import MapPageDesktop from "../components/features/MapPage/MapPageDesktop";
import MapPageMobile from "../components/features/MapPage/MapPageMobile";

const MapPage = () => {
    return (
        <div className='flex flex-col w-full h-full '>
            <MapPageDesktop />

            <MapPageMobile />
        </div>
    )
}

export default MapPage;