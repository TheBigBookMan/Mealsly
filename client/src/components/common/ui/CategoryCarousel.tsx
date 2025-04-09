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
        <ul className="flex gap-4 overflow-x-auto w-full h-full items-center py-2 px-4 text-xs">
            {cuisines && Object.entries(cuisines).map(([cuisine, code]) => (
                <li key={cuisine} onClick={() => chooseCategory(cuisine)} className={`hover:cursor-pointer border border-white rounded-xl p-1 w-full flex flex-col justify-end items-center transition ${selectedCategory === cuisine ? 'text-sky-500 font-bold bg-slate-200 border-slate-200' : 'hover:bg-slate-200 hover:border-slate-200 hover:text-sky-500'}`}>
                    <Flag code={code} className={`${cuisine === 'Nepalese' ? 'w-6' : 'w-8'}`} />
                    <p className='whitespace-nowrap'>{cuisine}</p>
                </li>
            ))}
        </ul>
    )
}

export default CategoryCarousel;