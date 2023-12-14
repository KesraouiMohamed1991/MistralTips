import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsData } from "../../design_utils/api";



const EventsContent = ({route}) => {
    const  title  = route.params.titre;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const storedEvents = useSelector((state) => state.user.value.events);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredData = await fetchEventsData();
    
                const EventInfo = filteredData.filter((Event) => Event.title === title);

                setData(EventInfo); 



            } catch (error) {
            console.error('Error fetching data in EventsContent:', error);
        }
    };
    
    fetchData(); // Call the fetchData function immediately when the component mounts
    }, []);


    return (
    <View style={styles.container}>
        <Text>{title}</Text>
        {/* <Text>{data.date}</Text>
        <Text>{data.content}</Text> */}

        {/* <Text style={styles.header}>{data.titre}</Text>
        {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
        ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching events</Text>
        ) : (
        <View style={styles.eventItem}>
            <Image style={styles.eventImage} source={{ uri: data.image }} />
            <Text style={styles.eventDate}>{data.date.slice(0,10)}</Text>
            <Text style={styles.eventContent}>{data.contenu}</Text>
        </View>
        )} */}
    </View>
      );
    }

const colors = {
    Midnight: '#0f0a0a',
    DeepBlue: '#191D88',
    NavyBlue: '#1450A3',
    RoyalBlue: '#337CCF',
    Marseille: '#30AADD',
    GoldenYellow: '#FFC436',
    Radiance: '#ff6600',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
        color: colors.Radiance,
    },
    eventItem: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.Midnight,
        marginBottom: 10, 
    },
    eventImage: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        marginBottom: 15,
        borderRadius:20,
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        color: colors.Midnight,
    },
    eventContent: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.Midnight,
        textAlign: 'justify',
    },
    flatList: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
    },
    });



export default EventsContent;