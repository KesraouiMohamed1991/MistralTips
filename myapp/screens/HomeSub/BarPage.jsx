// AnotherPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Barpage = ({ route }) => {
  const { markerData } = route.params;

  return (
      <View style={styles.container}>
      <Text>Details for Marker:</Text>
      <Text>{`Latitude: ${markerData.latitude}`}</Text>
      <Text>{`Longitude: ${markerData.longitude}`}</Text>
      {/* Add more details or components as needed */}
    </View>
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
        alignItems:'center',
        backgroundColor: colors.Marseille,
    }
})
export default Barpage;
