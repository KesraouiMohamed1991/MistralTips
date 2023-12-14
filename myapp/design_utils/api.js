// api.js
const BACKEND_ADDRESS = 'http://10.20.2.92:3000';

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
                name: e.name,
                adress: e.adress
            }));

    } catch (error) {
        console.error('Error fetching bar data:', error);
        throw error;
    }
};

export const fetchArticlesData = async () => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/blogs`);
        const data = await response.json();

        return data.map((e) => ({
                title: e.titre,
                description: e.description,
                date: e.date,
                img: e.image,
                content: e.contenu
            }));

    } catch (error) {
        console.error('Error fetching bar data:', error);
        throw error;
    }
};

export const fetchEventsData = async () => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/events`);
        const data = await response.json();

        return data.map((e) => ({
            title: e.titre,
            description: e.description,
            date: e.date,
            img: e.image,
            bar: e.bar
        }));

    } catch (error) {
        console.error('Error fetching bar data:', error);
        throw error;
    }
};