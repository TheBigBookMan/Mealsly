import React, { ReactNode, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import api from "../../../utils/api";

interface MapInterface {
    mapPosition: number[];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setChefsInBoundary: (chefs: Chef[]) => void;
    children: ReactNode;
}

const Map = ({mapPosition, setLoading, setChefsInBoundary, children}: MapInterface) => {
    

    const fetchDataForBounds = async (bounds: L.LatLngBounds) => {
        setLoading(true);
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
    
        // const res = await api.get(`/map/chefs?neLat=${northEast.lat}&neLng=${northEast.lng}&swLat=${southWest.lat}&swLng=${southWest.lng}`);

        // console.log(res);

        // setChefsInBoundary(data);

        setTimeout(() => {

            setLoading(false);
        }, 2000);
    };
    
    const MapEvents = () => {
        const map = useMapEvents({
            moveend: () => {
                fetchDataForBounds(map.getBounds());
            },
        });
        return null;
    };
    
    return mapPosition ? (
        <MapContainer
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />

                <Marker position={mapPosition as [number, number]}>
                    <Popup>
                        {children}
                    </Popup>
                </Marker>

            <MapEvents />
        </MapContainer>
    ) : (
        <p>Loading</p>
    )
}

export default Map;