import { useState } from "react";
import Curry1 from '../../../../assets/curry.png';
import Curry2 from '../../../../assets/curry2.png';
import Curry3 from '../../../../assets/curry3.png';

interface ListingItemsInterface {
    selectedCategory: string;
} 

// !!! TEMP
interface ListingTemp {
    title: string;
    distance: string;
    date: string;
    rating: string;
    price: number;
}

const ListingItems = ({selectedCategory}: ListingItemsInterface) => {
    const [listings, setListings] = useState<ListingTemp[] | null>(null);
    // const [listings, setListings] = useState<Listing[] | null>(null);

    return (
        <ul className="flex flex-col gap-4 p-2">
      {[1, 2, 3].map((_, index) => (
        <li
          key={index}
          className="flex flex-col w-full min-h-[380px] border border-slate-200 rounded-lg p-2"
        >
          {/* Replace this with real content */}
          <p className="text-lg font-semibold">Listing {index + 1}</p>
          <img src={Curry1} className="w-full h-40 object-cover rounded-md my-2" />
          <p className="text-sm text-gray-500">Distance: 2.4km • $12.99</p>
        </li>
      ))}
    </ul>
    )
}

export default ListingItems;