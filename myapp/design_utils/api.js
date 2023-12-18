// api.js

// import { useDispatch, useSelector } from 'react-redux';

// const BACKEND_ADDRESS = 'http://192.168.0.102:3000';
const BACKEND_ADDRESS = 'http://10.20.2.91:3000';


// const user = useSelector((state) => state.user.value);

export const fetchBarsData = async () => {
    try {
        const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
        const data = await response.json();
        const filtreddata = data.filter((e) => e.latitude !== null && e.longitude !== null);
        console.log(filtreddata);
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

// export const fetchUserAccount = async () => {
//     try {
//         const response = await fetch(`${BACKEND_ADDRESS}/bars/users/deleteOne`, {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user.username),
//           }).then(response => response.json())
//             .then(data => {
//               data.result;
//               console.log(data.result);
//             });
//             console.log(user.username);
//     } catch (error) {
//         console.error('Error fetching bar data:', error);
//         throw error;
//     }
// };