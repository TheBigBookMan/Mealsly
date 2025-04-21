import { useState } from "react";
import { OnboardContext } from "./OnboardContext";

export const OnboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [onboardDetails, setOnboardDetails] = useState<OnboardDetails>({
        email: '',
        firstName: '',
        lastName: '',
        profileImage: '',
        postcode: '',
        suburb: '',
        state: '',
        latitude: 0,
        longitude: 0,
        bio: '',
    });
    // TODO fix the totalSteps when know it
    const [progress, setProgress] = useState<StepsType>({
        currentStep: 0,
        totalSteps: 6
    });

    const nextStep = (): void => {
        const {currentStep, totalSteps} = progress;

        if(currentStep === totalSteps) return;

        const newCurrentStep = currentStep + 1;
        setProgress({
            ...progress,
            currentStep: newCurrentStep
        })
    };

    const backStep = (): void => {
        const {currentStep} = progress;

        if(currentStep === 0) return;

        const newCurrentStep = currentStep - 1;
        setProgress({
            ...progress,
            currentStep: newCurrentStep
        })
    };

    const submitOnboardDetails = () => {
        console.log("submitttt");
        console.log(onboardDetails);

        // TODO submit to database

        // TODO check off isOnboarded

        // TODO navigate to add in a listing page
    }

    return (
        <OnboardContext.Provider value={{
            onboardDetails,
            setOnboardDetails,
            progress,
            nextStep,
            backStep,
            submitOnboardDetails
        }}>
            {children}
        </OnboardContext.Provider>
    );
}