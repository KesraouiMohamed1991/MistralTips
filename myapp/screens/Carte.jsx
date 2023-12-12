//import liraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADDRESS = 'http://10.20.2.92:3000';

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
  const [currentPosition, setCurrentPosition] = useState(null);
  const [barsLoc, setBarsLoc] = useState([]);

  const getBarsData = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
      const data = await response.json();

      const barsData = data
        .filter((e) => e.lattitude !== null && e.longitude !== null)
        .map((e) => ({
          name: e.name,
          longitude: e.longitude,
          latitude: e.lattitude,
        }));

      setBarsLoc(barsData);
    } catch (error) {
      console.error('Error fetching bar data:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          getBarsData();
        });
      }
    })();
  }, []);



  // create a component
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 43.300000,
          longitude: 5.4,
          latitudeDelta: 0.1,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="Vous êtes ici"
            pinColor={colors.Radiance}
          />
        )}

{barsLoc.map((bar, index) => {
  if (bar.latitude !== null && bar.longitude !== null) {
    return (
      <Marker
        key={index}
        coordinate={{ latitude: bar.longitude, longitude: bar.latitude }}
        title={bar.name}
        pinColor={colors.Radiance}

      >

 <FontAwesome
    style={{ padding: 10 }}
    name="beer"
    size={20}
    color={colors.Radiance}
  />
      </Marker>
    );
  } else {
    console.error(`Invalid coordinates for marker with index ${index}:`, bar);
    return null;
  }
})}


      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Marseille,
  },
});
