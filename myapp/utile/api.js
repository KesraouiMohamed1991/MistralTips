// api.js
const BACKEND_ADDRESS = 'http://10.20.2.92:3000';



// const BACKEND_ADDRESS = 'http://192.168.0.101:3000';


export const fetchBarsData = async () => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
        const data = await response.json();
        const filtreddata = data.filter((e) => e.latitude !== null && e.longitude !== null);
        return filtreddata

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



export const fetchUserAccount = async (username) => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/users/deleteOne`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user account. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.result);
        console.log(username); // Log the username if needed
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error;
    }
};