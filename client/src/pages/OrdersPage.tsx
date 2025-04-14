import { Link } from "react-router-dom";
import Button from "../components/common/ui/Button";

import Curry from '../assets/curry.png';

const ORDERTEMP: Order[] = [
    {
        id: '1232',
        status: 'COMPLETED',
        totalPrice: 23.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Ben Smerd',
        eaterId: '1',
        dealId: ''
    },
    {
        id: '123232',
        status: 'PENDING',
        totalPrice: 11.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Big Madgey Moo Curry',
        eaterId: '1',
        dealId: ''
    },
    {
        id: '434',
        status: 'COMPLETED',
        totalPrice: 65.45,
        pickupTime: '12-04-2025',
        createdAt: '11-04-2025',
        chefName: 'Cafe Anthony',
        eaterId: '1',
        dealId: ''
    },
]

const OrdersPage = () => {
    return (
        <div className='flex flex-col h-full w-full gap-4 p-4'>
            <p className='font-bold text-2xl'>Orders</p>
            
            {ORDERTEMP.length === 0 ? (
                <div className='flex flex-col gap-2'>
                    <p className='text-xl font-bold text-black'>No meals ordered yet!</p>

                    <Link to='/' >
                        <Button variant="info" className='min-w-fit px-2'>
                            <p>Start searching</p>
                        </Button>
                    </Link>
                </div>
            ) : (
                <ul className='flex flex-col w-full h-full gap-2'>
                    {ORDERTEMP.map(order => (
                        <li className='flex w-full h-[80px] border gap-2'>
                            <img src={Curry} className='w-20 rounded-xl'/>

                            <div className='flex flex-col'>
                                <p className='text-sky-700'>{order.chefName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}  
        </div>
    )
}

export default OrdersPage;