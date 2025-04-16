import { useEffect, useState } from "react";
import OrdersListings from "../components/features/OrdersPage/OrdersListings";
import { Link } from "react-router-dom";
import Button from "../components/common/ui/Button";
import Curry from '../assets/curry3.png';
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import ModalSlideHalfUp from "../components/common/ui/ModalSlideHalfUp";
import FilterOrders from "../components/features/OrdersPage/FilterOrders";

const ORDERTEMP: Order[] = [
    {
        id: '1232',
        status: 'COMPLETED',
        totalPrice: 23.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Ben Smerd',
        eaterId: '1',
        dealId: '',
        title: 'Hot Chicken Curry'
    },
    {
        id: '123232',
        status: 'PENDING',
        totalPrice: 11.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Big Madgey Moo Curry',
        eaterId: '1',
        dealId: '',
        title: 'Rogan Josh'
    },
    {
        id: '434',
        status: 'COMPLETED',
        totalPrice: 65.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Cafe Anthony',
        eaterId: '1',
        dealId: '',
        title: 'Best Curry in SA'
    },
]

const OrdersPage = () => {
    const [filter, setFilter] = useState<string>('All');
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [upcomingOrders, setUpcomingOrders] = useState<Order[]>([]);

    useEffect(() => {
        console.log(filter);
        // TODO TEMP
        setOrders(ORDERTEMP);
        const checkUpcoming = ORDERTEMP.filter(order => order.status === 'PENDING');
        setUpcomingOrders(checkUpcoming);
    }, [filter]);

    return (
        <div className='flex flex-col h-full w-full  p-4'>
            <ModalSlideHalfUp isOpen={filterModal} onClose={() => setFilterModal(false)} title="Filter by...">
                <FilterOrders filter={filter} setFilter={setFilter} />
            </ModalSlideHalfUp>

            <p className='font-bold text-2xl'>Orders</p>
            
            {orders.length === 0 ? (
                <div className='flex flex-col gap-2'>
                    <p className='text-xl font-bold text-black'>No meals ordered yet!</p>

                    <Link to='/' >
                        <Button variant="info" className='min-w-fit px-2'>
                            <p>Start searching</p>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <p className='text-sky-700 font-bold text-lg'>Upcoming</p>

                        {upcomingOrders && upcomingOrders.length === 0 ? (
                            <div className='flex flex-col gap-2'>
                                <p className=''>You have no upcoming meals</p>

                                <Link to='/' >
                                    <Button variant="info" className='min-w-fit px-2'>
                                        <p>Have a browse</p>
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex flex-col'>
                                {upcomingOrders.map(order => (
                                    <li className='flex w-full h-[80px] border gap-2'>
                                        <img src={Curry} className='w-20 rounded-xl'/>
                
                                        <div className='flex flex-col'>
                                            <p className='text-sky-700'>{order.title}</p>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex justify-between w-full items-center'>
                            <p className='text-sky-700 font-bold text-lg'>Past</p>

                            <div onClick={() => setFilterModal(true)} className='hover:cursor-pointer'>
                                <AdjustmentsHorizontalIcon className='w-6 text-black' />
                            </div>
                        </div>  

                        <OrdersListings orders={orders} />
                    </div>
                </div>
            )} 
        </div>
    )
}

export default OrdersPage;