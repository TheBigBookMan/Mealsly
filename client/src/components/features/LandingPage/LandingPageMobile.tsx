import SearchBar from "./mobile/Search/SearchBar";
import CategoryCarousel from "../../common/ui/CategoryCarousel";
import { useState } from "react";

// TODO clicking the category can save the category in the local storage so when user comes back to it that category will be shown

const LandingPageMobile = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const chooseCategory = (category: string): void => {
        setSelectedCategory(category);
    }

    return (
        <div className='h-full w-full md:hidden'>
            <SearchBar />

            <div className='flex h-[80px] w-full border-b'>
                <CategoryCarousel chooseCategory={chooseCategory} selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}

export default LandingPageMobile;