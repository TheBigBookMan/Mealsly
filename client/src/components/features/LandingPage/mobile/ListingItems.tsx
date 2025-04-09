import { useState } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import { PiChefHat } from "react-icons/pi";
import { FaCarSide, FaHouseUser  } from "react-icons/fa";

import Curry1 from '../../../../assets/curry.png';
import Curry2 from '../../../../assets/curry2.png';
import Curry3 from '../../../../assets/curry3.png';
import { TEMPLISTINGS } from "./templist";

interface ListingItemsInterface {
    selectedCategory: string;
} 

// !!! TEMP
interface ListingTemp {
    title: string;
    chef: string;
    distance: number;
    date: string;
    rating: string;
    price: number;
    delivery: boolean;
    pickup: boolean;
}


const ListingItems = ({selectedCategory}: ListingItemsInterface) => {
    const [listings, setListings] = useState<ListingTemp[] | null>(null);
    // const [listings, setListings] = useState<Listing[] | null>(null);

    return (
        <ul className="flex flex-col gap-4 p-2 pb-[62px]">
            {TEMPLISTINGS.map((listing, index) => (
                <li key={index} className="flex flex-col w-full min-h-[380px] border border-slate-200 rounded-3xl hover:bg-slate-100 hover:cursor-pointer p-4">
                    <img src={Curry1} className=" w-full  rounded-3xl " />

                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <p className="text-lg font-semibold text-sky-700">{listing.title}</p>

                            <div className="flex items-center gap-1">
                                <StarIcon className='w-4 text-yellow-500' />
                                <p>{listing.rating}</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex items-start gap-1">
                                <PiChefHat className='text-xl text-slate-700' />
                                <p className="">{listing.chef}</p>
                            </div>

                            <div className='text-xs flex gap-1'>
                                <p>Ready</p>
                                <p className='text-sky-500'>{listing.date}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Distance: {listing.distance / 1000}km</p>

                            <div className='flex justify-between items-center'>
                                <p className='font-bold underline text-lg text-black'>${listing.price}</p>

                                <div className='flex gap-2 items-center'>

                                    {listing.delivery && <FaCarSide className='text-lg' />}

                                    {listing.pickup && <FaHouseUser className='text-lg' />}

                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ListingItems;