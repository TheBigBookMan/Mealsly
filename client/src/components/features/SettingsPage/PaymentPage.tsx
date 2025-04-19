import { CreditCardIcon } from "@heroicons/react/24/outline";
import Button from "../../common/ui/Button";
import NavToTile from "../../common/ui/NavToTile";
import { useState } from "react";
import ModalSlideUp from "../../common/ui/ModalSlideUp";
import AddCardForm from "../../common/ui/AddCardForm";

// TODO this needs to link into Stripe and stuff for setting up the data in DB

const PaymentPage = () => {
    const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false);
    const [refreshCards, setRefreshCards] = useState(false);

    return (
        <div className='flex flex-col gap-2'>
            <ModalSlideUp isOpen={addPaymentModal} onClose={() => setAddPaymentModal(false)} title="Manage payment method" className=''>
                <div className="flex flex-col gap-4 p-4">
                    <AddCardForm
                        onSuccess={() => {
                            setAddPaymentModal(false);
                            setRefreshCards(!refreshCards);
                        }}
                    />
                </div>
            </ModalSlideUp>

            <div className='flex flex-col border-b gap-2 pb-4 p-2'>
                <div className='flex flex-col'>
                    <p className='text-sky-700 font-bold'>Payment methods</p>
                    <p className='text-sm'>Add a payment method using our secure payment system, then start ordering the meals you like.</p>
                </div>

                <Button onClick={() => setAddPaymentModal(true)} variant="primary" className='min-w-fit px-2'>
                    <CreditCardIcon className="w-5" />
                    <p>Add new card</p>
                </Button>
            </div>

            <NavToTile navTo='/payments' title="Your payments" subtitle='Keep track of all your payments and refunds.' />
        </div>
    )
}

export default PaymentPage;