import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView } from 'react-native';

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://10.20.2.92:3000/bars/events');

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

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image style={styles.eventImage} source={{ uri: item.image }} />
      <Text style={styles.eventTitle}>{item.titre}</Text>
      <Text style={styles.eventDate}>{item.date.slice(0,10)}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventBar}>{item.bar}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Events</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
      ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching events</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.date}
          renderItem={renderEventItem}
          style={styles.flatList}
          
        />
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
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: colors.Radiance,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.Midnight,
    marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
      marginBottom: 10,
    borderRadius:20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    color: colors.Midnight,


  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.Midnight,
  },
  eventBar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.Midnight,
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

export default Events;
