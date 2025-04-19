import { useEffect, useState } from "react";
import CuisineCarousel from "../../common/ui/CuisineCarousel";
import { useUser } from "../../../contexts/userContext/useUser";
import Map from "../../common/ui/Map";
import { AnimatePresence, motion } from "framer-motion";

// TODO need to add the map

// TODO need to refresh area as move screen

// TODO need to have loading popup when loading data

// TODO need to have markers for plces

// TODO need to be able to click on marker to see small popup and then click it to go to actual page

// TODO need fall back if they reject the allow permission of geolocation sharing

const MapPageMobile = () => {
    const {userLocation} = useUser();
    const [selectedCuisine, setSelectedCuisine] = useState<string>('');
    const [mapPosition, setMapPosition] = useState<number[] | null>(null)
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [loading, setLoading] = useState(false);

    const setChefsInBoundary = (chefs: Chef[]) => {
        setChefs(chefs);
    }

    useEffect(() => {
        if(userLocation) {
            setMapPosition([userLocation.lat, userLocation.lon]);
            console.log([userLocation.lat, userLocation.lon]);
            console.log(userLocation);
        }
    }, [userLocation]);

    return (
        <div className="flex flex-col md:hidden h-screen w-full">
            <div className="h-[70px] w-full sticky top-0 z-10 bg-white">
                <CuisineCarousel selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} />
            </div>
        
            <div className="flex-1 relative w-full">
                <AnimatePresence>
                    {loading && (
                        <>
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 130 }}
                                exit={{ x: "210%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`absolute top-2 right-36 bg-white p-2 rounded shadow text-sky-700 z-[1000] `}
                            >

                                    Loading chefs...
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
        
                {mapPosition && (
                    <Map mapPosition={mapPosition} setLoading={setLoading} setChefsInBoundary={setChefsInBoundary}>
                        <p>Tjhs is a popup</p>
                
                        
                    </Map>
                )}
            </div>
        </div>
    )
}

export default MapPageMobile;