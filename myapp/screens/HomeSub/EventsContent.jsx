import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { fetchEventsData } from '../../utile/api';
import {colors} from '../../utile/colors'

import { FontAwesome } from '@expo/vector-icons'; 

const EventsContent = ({ route, navigation }) => {
    const title = route.params.titre;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredData = await fetchEventsData();
                const eventInfo = filteredData.filter((event) => event.title === title);
                setLoading(false);
                setData(eventInfo);

                console.log('events data ', eventInfo[0]);
            } catch (error) {
                console.error('Error fetching data in EventsContent:', error);
                setLoading(false); 
            }
        };

        fetchData();
    }, [title]); 

    const formatDateToFrench = (dateString) => {
        const options = {  day: 'numeric', month: 'long',year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };


    const goEvent = () => {
    
    navigation.navigate('Evénement');

}


    return (
        <SafeAreaView style={styles.container}>

            {loading ? (
                <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.Radiance} />
                </View>
            ) : data.length > 0 ? (
                <>
                    <Text style={styles.header}>Evénements </Text>
                <TouchableOpacity style={styles.icon} onPress={goEvent} >
        <FontAwesome style={{ padding: 10 }} name="arrow-left" size={25} color={colors.Midnight} />
        </TouchableOpacity>
                    <Image
                        source={{ uri: data[0].img }}
                        style={styles.eventImage}
                    />
                    <Text style={styles.eventTitle}>{data[0].bar}</Text>
                    <Text style={styles.eventDate}>{formatDateToFrench(data[0].date)}</Text>
                    <Text style={styles.eventContent}>{data[0].description}</Text>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText}>Intéressé</Text>
                            <FontAwesome
                                style={{ padding: 10 }}
                                name="thumbs-up"
                                size={20}
                                color={colors.Radiance}
                            />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>Pas de données disponibles</Text>
            )}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'flex-start',
    },
    eventImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 15,
        borderRadius:20,
    },
    eventTitle: {
        fontSize: 22,
        marginBottom: 10,
        color: colors.Radiance,
        marginLeft: 20,
        fontFamily: 'BricolageGrotesque',
    },
    eventDate: {
        fontSize: 16,
        color: colors.Midnight,
        marginBottom: 10,
        marginLeft: 20,
        fontFamily: 'Poppins-Regular',
    },
    eventContent: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.Midnight,
        textAlign: 'justify',
        margin: 20,
        fontFamily: 'Poppins-Regular',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginHorizontal: 10,
    },
    header: {
        fontSize: 20,
        fontFamily: 'BricolageGrotesque',
        marginTop: 30,
        marginBottom: 15,
        color: colors.Radiance,
        fontFamily: 'BricolageGrotesque',
        textAlign: 'center',
        width: '100%',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical: 10,
        backgroundColor: colors.GoldenYellow,
        borderRadius: 30,
        width: 260,
        alignItems: 'center',
        marginTop: 40,
    },
    btnText: {
        fontFamily: 'BricolageGrotesque',
        fontSize: 18,
        color:colors.DeepBlue,
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loaderContainer: {
        marginVertical: 400,
        marginHorizontal:150,
     
    },
  icon: {
            top: 36,
            left: 5,
            // backgroundColor: colors.GoldenYellow,
            position: 'absolute',
            zIndex:10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            fontFamily: 'Poppins-Regular',
        },

 
});

export default EventsContent;
