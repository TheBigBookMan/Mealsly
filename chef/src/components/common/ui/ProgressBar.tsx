interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    height?: string;
    colorClass?: string;
}

const ProgressBar = ({
    currentStep,
    totalSteps,
    height = "h-2",
    colorClass = "bg-sky-600",
}: ProgressBarProps) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
    <div className={`w-full bg-slate-200 ${height} rounded-full overflow-hidden`}>
        <div
        className={`${colorClass} h-full rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%` }}
        />
    </div>
    );
};

export default ProgressBar;