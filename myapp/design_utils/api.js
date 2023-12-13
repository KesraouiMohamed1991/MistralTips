// api.js
const BACKEND_ADDRESS = 'http://192.168.0.103:3000';

export const fetchBarsData = async () => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
        const data = await response.json();

        return data
            .filter((e) => e.latitude !== null && e.longitude !== null)
            .map((e) => ({
                name: e.name,
                longitude: e.longitude,
                latitude: e.latitude,
            }));

    } catch (error) {
        console.error('Error fetching bar data:', error);
        throw error;
    }
};