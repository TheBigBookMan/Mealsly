export const getMonthDifference = (dateString: string): string => {
    const now = new Date();
    const then = new Date(dateString);
    const years = now.getFullYear() - then.getFullYear();
    const months = now.getMonth() - then.getMonth();
    const totalMonths = years * 12 + months;
    return totalMonths < 1 ? "<1" : totalMonths.toString();
};

export const getUserLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported by your browser."));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                });
            },
            (error) => {
                reject(new Error("Unable to retrieve your location. Please enable location access."));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};