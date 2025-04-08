import SearchBar from "./mobile/Search/SearchBar";
import CategoryCarousel from "../../common/ui/CategoryCarousel";
import ListingItems from "./mobile/ListingItems";
import { useState } from "react";

// TODO clicking the category can save the category in the local storage so when user comes back to it that category will be shown

const LandingPageMobile = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const chooseCategory = (category: string): void => {
        setSelectedCategory(category);
    }

    return (
        <div className="h-screen w-full md:hidden flex flex-col overflow-hidden">
      {/* Sticky header section */}
      <div className="sticky top-0 bg-white z-50 border-b">
        <SearchBar />
        <div className="h-[80px] w-full">
          <CategoryCarousel
            chooseCategory={chooseCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <ListingItems selectedCategory={selectedCategory} />
      </div>
    </div>
    )
}

export default LandingPageMobile;