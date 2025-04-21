import { Outlet } from "react-router-dom";
import { useUser } from "../contexts/userContext/useUser";
import { useState } from "react";
import ProgressBar from "../components/common/ui/ProgressBar";
import { useOnboard } from "../contexts/onboardContext/useOnboard";
import Button from "../components/common/ui/Button";

// TODO use a onboardProvider to wrap around this to hold the full state, and have it also stored to localstorage-retrieve as well
// TODO on submission maybe redirect to the create a listing page to do their first listing

const OnboardPage = () => {
    const {logout} = useUser();
    const {progress, setProgress, nextStep, backStep} = useOnboard();

    return (
        <div className="flex flex-col h-screen md:hidden w-full">
            <div className="flex w-full justify-between items-center px-4 py-4 border-b">
                <p className="text-2xl font-bold">Mealsly</p>
                <button
                    onClick={logout}
                    className="border border-slate-300 rounded-2xl w-[80px] p-2 hover:bg-red-500 hover:border-red-500 hover:text-white transition"
                >
                    <p>Logout</p>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <Outlet />
            </div>

            <div className="flex flex-col gap-2 w-full h-fit border-t px-4 py-2">
                <ProgressBar currentStep={progress.currentStep} totalSteps={progress.totalSteps} />
                <div className="flex items-center justify-between w-full">
                    <p onClick={backStep} className="underline text-sky-700 cursor-pointer">Back</p>
                    <Button onClick={nextStep}>
                        <p>Next</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OnboardPage;