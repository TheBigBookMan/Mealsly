import Flag from 'react-world-flags';

interface CategoryCarouselInterface {
    chooseCategory: (category: string) => void;
    selectedCategory: string;
}

// TODO codes match up to here- https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// !!! TEMP 
const cuisines = {
    'Indian': 'IN',
    'Vietnamese': 'VN',
    'Spanish': 'ES',
    'Nepalese': 'NP',
    'Filipino': 'PH',
    'French': 'FR',
    'Japanese': 'JP',
    'Chinese': 'CN',
    'South African': 'ZA',
    'Korean': 'KP',
    'American': 'US',
}

const CategoryCarousel = ({chooseCategory, selectedCategory}: CategoryCarouselInterface) => {
    return (
        <ul className="flex gap-2 overflow-x-auto w-full items-end px-4 py-2 text-xs">
            {cuisines && Object.entries(cuisines).map(([cuisine, code]) => {
                const isSelected = selectedCategory === cuisine;
        
                return (
                    <li
                        key={cuisine}
                        onClick={() => chooseCategory(cuisine)}
                        className={`
                        hover:cursor-pointer 
                        rounded-xl 
                        flex flex-col items-center justify-end
                        px-3 py-2
                        transition-all duration-200 ease-in-out
                        ${isSelected 
                            ? 'text-sky-500 font-bold bg-slate-200 border border-slate-300'
                            : 'text-slate-500 hover:text-sky-500 hover:bg-slate-100 hover:border-slate-200 border border-transparent'}
                        `}
                    >
                        <div className="h-[28px] flex items-center justify-center">
                            <Flag code={code} className="h-[24px] w-auto" />
                        </div>
            
                        <p className="mt-1 whitespace-nowrap">{cuisine}</p>
                    </li>
                );
            })}
        </ul>
    )
}

export default CategoryCarousel;