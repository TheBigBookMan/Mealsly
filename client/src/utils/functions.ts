export const getMonthDifference = (dateString: string): string => {
    const now = new Date();
    const then = new Date(dateString);
    const years = now.getFullYear() - then.getFullYear();
    const months = now.getMonth() - then.getMonth();
    const totalMonths = years * 12 + months;
    return totalMonths < 1 ? "<1" : totalMonths.toString();
};