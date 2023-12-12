import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACKEND_ADDRESS = 'http://10.20.2.92:3000';
=======
import { Drawer, Button, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGripDots } from '@fortawesome/free-solid-svg-icons'
// import { SafeAreaView } from 'react-native-safe-area-context';


const BACKEND_ADDRESS = 'exp://10.20.2.91:19000';
>>>>>>> ea6a3424d85073e86f6dfb09eb34665aa988b849

const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  NavyBlue: '#1450A3',
  RoyalBlue: '#337CCF',
  Marseille: '#30AADD',
  GoldenYellow: '#FFC436',
  Radiance: '#ff6600',
};

export default function Carte() {

<<<<<<< HEAD
  return (
=======
    const [currentPosition, setCurrentPosition] = useState(null);
    const [tempCoordinates, setTempCoordinates] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [newPlace, setNewPlace] = useState('');
>>>>>>> ea6a3424d85073e86f6dfb09eb34665aa988b849

        <Text style={styles.container}>Carte</Text>
    // <SafeAreaView style={{ flex: 1 }}>
    //   <MapView
    //     initialRegion={{
    //       latitude: 43.300000,
    //       longitude: 5.400000,
    //       latitudeDelta: 0.1,
    //       longitudeDelta: 0.1,
    //     }}
    //     style={{ flex: 1 }}
    //   />
    //   {/*
    //   <View style={styles.container}>
    //     <Text>Carte</Text>
    //   </View>
    //   */}
    // </SafeAreaView>
    
    
<<<<<<< HEAD
  );
}
=======
        // fetch(`${BACKEND_ADDRESS}/all`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     data.result && dispatch(importCoords(data.coords));
        //   });
      }, []);
// create a component
    return (
      <View style={styles.container}>
        
        <MapView
            initialRegion={{
            latitude: 43.300000,
            longitude: 5.400000,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            }}
            style={{ flex: 1 }}>
            {currentPosition && <Marker coordinate={currentPosition} title="Voue êtes ici" pinColor={colors.Radiance} />}
        </MapView>
      </View>
      );


>>>>>>> ea6a3424d85073e86f6dfb09eb34665aa988b849

// define your styles
const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Marseille,
  },
=======
    container: {
      flex: 1,
      backgroundColor:colors.Marseille,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
>>>>>>> ea6a3424d85073e86f6dfb09eb34665aa988b849
});
