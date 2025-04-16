import { PiBowlFoodLight } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";

interface FoodTypesInterface {
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

const FoodTypes = ({selectedType, setSelectedType}: FoodTypesInterface) => {
    return (
        <div className='flex gap-2 items-center justify-around w-full h-[40px]'>
            <div onClick={() => setSelectedType("Listings")} className={`flex gap-1 items-center ${selectedType === 'Listings' ? 'underline text-sky-700 ' : ''}`}>
                <PiBowlFoodLight className='text-xl' />
                <p>Listings</p>
            </div>

            <div onClick={() => setSelectedType("Deals")} className={`flex gap-1 items-start ${selectedType === 'Deals' ? 'underline text-sky-700 ' : ''}`}>
                <IoFastFoodOutline className='text-xl' />
                <p>Deals</p>
            </div>
        </div>
    )
}

export default FoodTypes;