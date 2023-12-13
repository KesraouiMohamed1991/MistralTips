//import liraries
import React, { Component, useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Button, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGripDots } from '@fortawesome/free-solid-svg-icons'
// import { SafeAreaView } from 'react-native-safe-area-context';


const BACKEND_ADDRESS = 'http://10.20.2.91:3000';

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
    const [barsLoc, setBarsLoc] = useState([]);
    let barsData =[]
 

    console.log(barsLoc)
    let getBarsData = ()=> {        
      fetch(`${BACKEND_ADDRESS}/bars/all`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data[0].name, data[0].longitude);

        for (let bar of data){
            barsData = {
            name: bar.name,
            lattitude: bar.longitude,
            longitude : bar.lattitude,
          }
          setBarsLoc(barsData)
          // console.log(barsData);
        }
     });
   }

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
    
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
              (location) => {
                setCurrentPosition(location.coords);
                getBarsData()
              });
          }
        })();
      }, []);


      // const markers = barsData.map((data, i) => {
      //   return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
      // })
   
      
// create a component
    return (
      <View style={styles.container}>
        
        <MapView
            initialRegion={{
            latitude: 43.300000,
            longitude: 5.400000,
            latitudeDelta: 0.1, // Zoom level. Smaller values zoom in, larger values zoom out.

            longitudeDelta:  0.0421,
            }}
            style={{ flex: 1 }}>
            {currentPosition && <Marker coordinate={currentPosition} title="Voue êtes ici" pinColor={colors.Radiance} />}
            {barsData.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.lattitude, longitude: data.longitude }} title={data.name} />;
      })}
        </MapView>
      </View>
      );




}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.Marseille,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
});