import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACKEND_ADDRESS = 'http://10.20.2.92:3000';

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

  return (

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
    
    
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Marseille,
  },
});
