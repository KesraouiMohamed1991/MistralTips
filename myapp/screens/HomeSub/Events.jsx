import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const Events = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);


// const BACKEND_ADDRESS = 'http://10.20.2.92:3000';


  const fetchEvents = async () => {
    try {
      // const response = await fetch('http://10.20.2.92:3000/bars/events');
      const response = await fetch('http://192.168.0.101:3000/bars/events');

      if (response.ok) {
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
          setError(false);
        } else {
          console.error('Invalid data format received from the server');
          setError(true);
        }
      } else {
        console.error('Error fetching events:', response.status, response.statusText);
        setError(true);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function handlePress(params) {
    navigation.navigate('EventsContent', {titre: params})
  }

    const formatDateToFrench = (dateString) => {
        const options = {  day: 'numeric', month: 'long',year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };


  const rendereventItem = ({ item }) => (
    <View style={styles.eventItem}>
        <TouchableOpacity  onPress={() => handlePress(item.titre)}>
            <Image style={styles.eventImage} source={{ uri: item.image }} />
            <Text style={styles.eventTitle}>{item.titre}</Text>
        <Text style={styles.eventDate}>{formatDateToFrench(item.date)}</Text>
        

        
            <Text style={styles.eventDescription}>{item.description}</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
     <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.Radiance} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching Events</Text>
        ) : (
            
            <>
              <Text style={styles.header}>Events</Text>
            
        <FlatList
          data={data}
          keyExtractor={(item) => item.date}
          renderItem={rendereventItem}
          style={styles.flatList}
          
              />
            
            </>
      )}
    </SafeAreaView>
  );
};

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
    fontFamily: 'BricolageGrotesque',
    marginTop: 30,
    marginBottom: 15,
    color: colors.Radiance,
    fontFamily: 'BricolageGrotesque' ,
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
    fontSize: 20,
    fontFamily: 'BricolageGrotesque' ,
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    color: colors.Midnight,
    fontFamily: 'Poppins-Regular' ,

  },
  eventDescription: {
    fontSize: 12,
    marginBottom: 10,
    color: colors.Midnight,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular' ,

  },
  eventBar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.Midnight,
    marginBottom: 5,
  },
  flatList: {
    marginTop: 10,
  },
  errorText: {
   color: 'red',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'BricolageGrotesque' ,

  },
});

export default Events;