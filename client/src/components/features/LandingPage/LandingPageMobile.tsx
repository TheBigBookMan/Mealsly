import SearchBar from "./mobile/Search/SearchBar";
import CuisineCarousel from "../../common/ui/CuisineCarousel";
import ListingItems from "./mobile/ListingItems";
import { useState } from "react";
import FoodTypes from "./mobile/FoodTypes";

// TODO clicking the Cuisine can save the Cuisine in the local storage so when user comes back to it that Cuisine will be shown

const LandingPageMobile = () => {
    const [selectedCuisine, setSelectedCuisine] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('Listings');

    return (
        <div className="h-screen w-full md:hidden flex flex-col overflow-hidden">
            <div className="sticky top-0 bg-white z-49 ">
                <SearchBar />
                
                <div className="h-[70px] w-full">
                    <CuisineCarousel setSelectedCuisine={setSelectedCuisine} selectedCuisine={selectedCuisine}/>
                </div>

                <FoodTypes selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <ListingItems selectedCuisine={selectedCuisine} selectedType={selectedType} />
            </div>
        </div>
    )
}

export default LandingPageMobile;