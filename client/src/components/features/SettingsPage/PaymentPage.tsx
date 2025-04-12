import { CreditCardIcon } from "@heroicons/react/24/outline";
import Button from "../../common/ui/Button";
import NavToTile from "../../common/ui/NavToTile";
import { useState } from "react";
import ModalSlideUp from "../../common/ui/ModalSlideUp";
import Input from "../../common/ui/Input";

type PaymentCard = {
    cardNumber: string,
    cardExpiry: string,
    cardCvv: string,
    cardPostcode: string,
    cardCountry: string
}

const PaymentPage = () => {
    const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false);
    const [newCard, setNewCard] = useState<PaymentCard>({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        cardPostcode: '',
        cardCountry: ''
    });

    const addCard = () => {
        console.log(newCard);
    }

    return (
        <div className='flex flex-col gap-2'>
            <ModalSlideUp isOpen={addPaymentModal} onClose={() => setAddPaymentModal(false)} title="Manage payment method" className=''>
                <div className='flex flex-col gap-2 overflow-y-auto p-2'>

                
                    <div className='flex flex-col'>
                        <p className='text-sky-700 font-bold text-lg'>Added cards</p>

                        <ul className='flex flex-col w-full '>
                            <li className='h-fit p-2 rounded-lg border w-full flex flex-col text-sm'>
                                <div className='flex justify-between'>
                                    <p>123412442</p>
                                    <div className='flex gap-2'>
                                        <p>Expiry: 12/27</p>
                                        <p>CVV: 353</p>
                                    </div>
                                </div>
                                <p>Postcode: 5062</p>

                                <div className='flex justify-between w-full'>
                                    <p>Country: Australia</p>

                                    <p>VISA </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className='flex flex-col'>
                        <p className='text-sky-700 font-bold text-lg'>Add new card</p>

                        <Input label="Card number" value={newCard.cardNumber} onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})} />

                        <Input label="Expiry" value={newCard.cardExpiry} onChange={(e) => setNewCard({...newCard, cardExpiry: e.target.value})} />

                        <Input label=" CVV" value={newCard.cardCvv} onChange={(e) => setNewCard({...newCard, cardCvv: e.target.value})} />

                        <Input label="Postcode" value={newCard.cardPostcode} onChange={(e) => setNewCard({...newCard, cardPostcode: e.target.value})} />

                        <Input label="Country" value={newCard.cardCountry} onChange={(e) => setNewCard({...newCard, cardCountry: e.target.value})} />
                    </div>

                    <Button onClick={addCard} className='flex gap-2'>
                        <CreditCardIcon className="w-6" />
                        <p>Add</p>
                    </Button>
                </div>
            </ModalSlideUp>

            <div className='flex flex-col border-b gap-2 pb-4 p-2'>
                <div className='flex flex-col'>
                    <p className='text-sky-700 font-bold'>Payment methods</p>
                    <p className='text-sm'>Add a payment method using our secure payment system, then start ordering the meals you like.</p>
                </div>

                <Button onClick={() => setAddPaymentModal(true)} variant="primary" className='min-w-fit px-2'>
                    <p>Manage payment method</p>
                </Button>
            </div>

            <NavToTile navTo='/payments' title="Your payments" subtitle='Keep track of all your payments and refunds.' />
        </div>
    )
}

export default PaymentPage;