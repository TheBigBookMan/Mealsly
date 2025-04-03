import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Card from "../../../../common/ui/Card";
import { ChangeEvent, useState } from "react";

interface SearchModalInterface {
    toggleModal: (state: boolean) => void;
}

// TODO add in search bar for dishes

// TODO add in maybe a recent searches (get data from DB or localstorage???)- only 2/3
// TODO suggested search can be to go to whats hot page
// TODO addin a suggested searches section with Nearby (get IP and where they are)

// TODO filter search can be a dropdown withthe different categories
// TODO filter search for maybe areas???

const SearchModal = ({toggleModal}: SearchModalInterface) => {
    const [searchMeal, setSearchMeal] = useState<string>('');

    const searching = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSearchMeal(value);
    }

    const clearFilters = () => {
        setSearchMeal('');
    }

    const submitSearch = () => {
        console.log(searchMeal);
    }

    return (
        <div className='flex flex-col h-full w-full p-2 bg-sky-100'>
            <Card className='h-full w-full flex flex-col gap-2 justify-between'>
                <div className='flex flex-col gap-2 h-full'>
                    <div className='flex gap-4 items-center'>
                        <div onClick={() => toggleModal(false)} className="flex h-[40px] w-[40px] items-center justify-center border rounded-full border-slate-300 hover:cursor-pointer transition  hover:border-2 hover:shadow-lg">
                            <XMarkIcon className='w-6 h-6' />
                        </div>

                        <p className='text-2xl'>Meals to eat?</p>
                    </div>

                    <div className='border border-slate-300 h-[46px] w-full rounded-lg flex gap-2 items-center px-4'>
                        <MagnifyingGlassIcon className='w-6 h-6' />
                        <input type='text' placeholder='Search meals' value={searchMeal} onChange={(e) => searching(e)} className='outline-none w-full' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-xl'>Filter by</p>

                        <div className="flex flex-col ">
                            <p>Location</p>
                            <input type='text' className='border-2' />
                        </div>

                        <div className="flex flex-col ">
                            <p>Cuisine</p>
                            <select className='border-2' ></select>
                        </div>

                        <div className="flex flex-col ">
                            <p>Dietry Tags</p>
                            <select className='border-2' ></select>

                            <div className='flex flex-wrap w-full h-[120px] border-2 mt-1'></div>
                        </div>

                        <div className="flex flex-col ">
                            <p>Day of week</p>
                            <select className='border-2' ></select>
                        </div>

                        <div className="flex flex-col ">
                            <p>Price </p>
                            <select className='border-2' ></select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full items-end">
                    <p onClick={clearFilters} className='font-bold hover:cursor-pointer hover:text-rose-400 transition'>Clear all</p>

                    <button onClick={submitSearch} className='flex gap-2 border rounded-xl border-sky-500 bg-sky-500 w-[120px] h-[40px] text-slate-200 items-center justify-center hover:bg-sky-600 transition'>
                        <MagnifyingGlassIcon className='w-6 h-6' />
                        <p className=''>Search</p>
                    </button>
                </div>

            </Card>
        </div>
    )
}

export default SearchModal;