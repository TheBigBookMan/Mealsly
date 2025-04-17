import { useEffect, useState } from "react";
import CategoryCarousel from "../../common/ui/CategoryCarousel";
import { useUser } from "../../../contexts/UserContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// TODO need to add the map

// TODO need to refresh area as move screen

// TODO need to have loading popup when loading data

// TODO need to have markers for plces

// TODO need to be able to click on marker to see small popup and then click it to go to actual page

// TODO need fall back if they reject the allow permission of geolocation sharing

const MapPageMobile = () => {
    const {userLocation} = useUser();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [mapPosition, setMapPosition] = useState<number[] | null>(null)
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDataForBounds = async (bounds: L.LatLngBounds) => {
        setLoading(true);
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
    
        console.log(`/api/chefs?neLat=${northEast.lat}&neLng=${northEast.lng}&swLat=${southWest.lat}&swLng=${southWest.lng}`);

        // Example API query with bounding box
        // const res = await fetch(`/api/chefs?neLat=${northEast.lat}&neLng=${northEast.lng}&swLat=${southWest.lat}&swLng=${southWest.lng}`);
        // const data = await res.json();
        // setChefs(data);
        setLoading(false);
    };

    const MapEvents = () => {
        const map = useMapEvents({
            moveend: () => {
                fetchDataForBounds(map.getBounds());
            },
        });
        return null;
    };

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
                <CategoryCarousel selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
        
            <div className="flex-1 relative w-full">
                {loading && (
                    <div className="absolute top-2 right-2 bg-white p-2 rounded shadow z-[1000]">
                        Loading chefs...
                    </div>
                )}
        
                {mapPosition && (
                    <MapContainer
                        center={mapPosition}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="w-full h-full z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                
                        <Marker position={mapPosition as [number, number]}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                
                        <MapEvents />
                    </MapContainer>
                )}
            </div>
        </div>
    )
}

export default MapPageMobile;