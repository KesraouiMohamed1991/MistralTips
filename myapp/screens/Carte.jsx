//import liraries
import React, { Component, useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const BACKEND_ADDRESS = 'http://BACKEND_IP:3000';

const colors = {
  Midnight:     '#0f0a0a',
  DeepBlue:     '#191D88',
  NavyBlue:     '#1450A3',
  RoyalBlue:    '#337CCF',
  Marseille:    '#30AADD',
  GoldenYellow: '#FFC436',
  Radiance:     '#ff6600',
};

export default function Carte() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [currentPosition, setCurrentPosition] = useState(null);
    const [tempCoordinates, setTempCoordinates] = useState(null);
    const [newPlace, setNewPlace] = useState('');

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
    
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
              (location) => {
                setCurrentPosition(location.coords);
              });
          }
        })();
    
        fetch(`${BACKEND_ADDRESS}/all`)
          .then((response) => response.json())
          .then((data) => {
            data.result && dispatch(importCoords(data.coords));
          });
      }, []);
// create a component
    return (
      <SafeAreaProvider>
        <MapView
            initialRegion={{
            latitude: 43.300000,
            longitude: 5.400000,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            }}
            style={{ flex: 1 }}>
       {/* <View style={styles.container}>
            <Text>Carte</Text>
        </View> */}
        </MapView>
       </SafeAreaProvider>
    );



// define your styles


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.Marseille,
    },
});
