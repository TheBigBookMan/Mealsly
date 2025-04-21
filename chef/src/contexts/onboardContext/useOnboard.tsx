import { useContext } from "react";
import { OnboardContext } from "./OnboardContext";

export const useOnboard = (): OnboardContextType => {
    const context = useContext(OnboardContext);
    if (!context) {
        throw new Error("useOnboard must be used within a OnboardProvider");
    }
    return context;
};