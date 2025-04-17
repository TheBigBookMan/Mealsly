

import Curry from '../../../assets/curry.png';

interface OrderListingsInterface {
    orders: Order[];
}

const OrdersListings = ({orders}: OrderListingsInterface) => {
    return (
        <ul className='flex flex-col w-full h-full gap-2'>
            {orders.map(order => (
                <li key={order.id} className='flex w-full h-[80px] border gap-2'>
                    <img src={Curry} className='w-20 rounded-xl'/>

                    <div className='flex flex-col'>
                        <p className='text-sky-700'>{order.title}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default OrdersListings;