import Flag from 'react-world-flags';
import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface CuisineCarouselInterface {
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    selectedCuisine: string;
}

const CuisineCarousel = ({setSelectedCuisine, selectedCuisine}: CuisineCarouselInterface) => {
    const fetchCuisines = async (): Promise<Cuisine[]> => {
        const res = await api.get('/cuisine');
        const {data} = res;

        const orderByPopularity = data.sort((a: Cuisine, b: Cuisine) => b.popularity - a.popularity);

        return orderByPopularity;
    };
    
    const { data: cuisines, isLoading, error } = useQuery<Cuisine[]>({
        queryKey: ['cuisines'],
        queryFn: fetchCuisines,
    });

    return (
        <AnimatePresence mode="wait">
            {isLoading && <LoadingSpinner key="loading" />}

            {error && <ErrorMessage key="error" message="Error loading cuisines" />}

            {!isLoading && !error && cuisines && (
                <ul
                key="content"
                className="flex gap-2 overflow-x-auto w-full items-end px-4 py-1 text-xs bg-slate-100"
                >
                {cuisines.map((cuisine) => {
                    const isSelected = selectedCuisine === cuisine.name;

                    return (
                    <li
                        key={cuisine.id}
                        onClick={() => setSelectedCuisine(cuisine.name)}
                        className={`
                        hover:cursor-pointer 
                        rounded-xl 
                        flex flex-col items-center justify-end
                        px-3 py-1
                        transition-all duration-200 ease-in-out
                        ${
                            isSelected
                            ? 'text-sky-500 font-bold bg-slate-200 border border-slate-300'
                            : 'text-slate-500 hover:text-sky-500 hover:bg-slate-100 hover:border-slate-200 border border-transparent'
                        }
                        `}
                    >
                        <div className="h-[28px] flex items-center justify-center">
                        <Flag code={cuisine.flagCode} className="h-[20px] w-auto" />
                        </div>

                        <p className="mt-1 whitespace-nowrap">{cuisine.name}</p>
                    </li>
                    );
                })}
                </ul>
            )}
        </AnimatePresence>
    )
}

export default CuisineCarousel;