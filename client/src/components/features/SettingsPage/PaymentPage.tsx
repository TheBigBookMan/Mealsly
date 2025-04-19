import { CreditCardIcon } from "@heroicons/react/24/outline";
import Button from "../../common/ui/Button";
import NavToTile from "../../common/ui/NavToTile";
import { useState } from "react";
import AddCardForm from "../../common/ui/AddCardForm";
import ModalSlideHalfUp from "../../common/ui/ModalSlideHalfUp";
import api from "../../../utils/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import ErrorMessage from "../../common/ui/ErrorMessage";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";

// TODO this needs to also determine which card is selected for payments as user may have muyltiple

const PaymentPage = () => {
    const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false);
    const [refreshCards, setRefreshCards] = useState(false);

    const fetchPaymentMethods = async () => {
        const res = await api.get('/user/payment-methods');
        const {data} = res;

        console.log(data);
        return data;
    };

    const {data: paymentMethods, isLoading, error} = useQuery({
        queryKey: ['paymentMethods'],
        queryFn: fetchPaymentMethods
    });

    const getBrandIcon = (brand: string) => {
        switch (brand.toLowerCase()) {
        case "visa":
            return <FaCcVisa className="text-blue-600 w-8 h-8" />;
        case "mastercard":
            return <FaCcMastercard className="text-red-600 w-8 h-8" />;
        default:
            return <FaCreditCard className="text-gray-500 w-8 h-8" />;
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <ModalSlideHalfUp isOpen={addPaymentModal} onClose={() => setAddPaymentModal(false)} title="Manage payment method" className=''>
                <div className="flex flex-col gap-4 p-4">
                    <AddCardForm
                        onSuccess={() => {
                            setAddPaymentModal(false);
                            setRefreshCards(!refreshCards);
                        }}
                    />
                </div>
            </ModalSlideHalfUp>

            <div className='flex flex-col gap-2 pb-4 border-b' >
                <div className='flex flex-col gap-2  p-2'>
                    <div className='flex flex-col'>
                        <p className='text-sky-700 font-bold'>Payment methods</p>
                        <p className='text-sm'>Add a payment method using our secure payment system, then start ordering the meals you like.</p>
                    </div>

                    <Button onClick={() => setAddPaymentModal(true)} variant="primary" className='min-w-fit px-2'>
                        <CreditCardIcon className="w-5" />
                        <p>Add new card</p>
                    </Button>
                </div>

                <div className='flex flex-col'>
                    <p className='text-sky-700 font-bold'>Your saved cards</p>
                    
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage />
                    ) : (
                        <ul>
                            {paymentMethods.map(card => (
                                <div
                                    className={`flex justify-between items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer `}
                                    // onClick={onSelect}
                                >
                                    <div className="flex items-center gap-4">
                                        {getBrandIcon(card.card.brand)}

                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold">**** **** **** {card.card.last4}</p>
                                            <p className="text-xs text-gray-500">Expires {card.card.exp_month}/{card.card.exp_year}</p>
                                        </div>
                                    </div>

                                    {/* {isSelected && (
                                        <span className="text-xs text-sky-600 font-semibold">Selected</span>
                                    )} */}
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <NavToTile navTo='/payments' title="Your payments" subtitle='Keep track of all your payments and refunds.' />
        </div>
    )
}

export default PaymentPage;