import SearchBar from "./mobile/Search/SearchBar";
import CategoryCarousel from "../../common/ui/CategoryCarousel";
import ListingItems from "./mobile/ListingItems";
import { useState } from "react";
import FoodTypes from "./mobile/FoodTypes";

// TODO clicking the category can save the category in the local storage so when user comes back to it that category will be shown

const LandingPageMobile = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('Listings');

    const chooseCategory = (category: string): void => {
        setSelectedCategory(category);
    }

    return (
        <div className="h-screen w-full md:hidden flex flex-col overflow-hidden">
            <div className="sticky top-0 bg-white z-49 ">
                <SearchBar />
                
                <div className="h-[70px] w-full">
                    <CategoryCarousel chooseCategory={chooseCategory} selectedCategory={selectedCategory}/>
                </div>

                <FoodTypes selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <ListingItems selectedCategory={selectedCategory} selectedType={selectedType} />
            </div>
        </div>
    )
}

export default LandingPageMobile;