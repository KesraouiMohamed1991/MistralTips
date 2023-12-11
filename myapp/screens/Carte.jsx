//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Carte = () => {
    return (
        <View style={styles.container}>
            <Text>Carte</Text>
        </View>
    );
};



const colors = {
  Midnight:     '#0f0a0a',
  DeepBlue:     '#191D88',
  NavyBlue:     '#1450A3',
  RoyalBlue:    '#337CCF',
  Marseille:    '#30AADD',
  GoldenYellow: '#FFC436',
  Radiance:     '#ff6600',
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.Marseille,
    },
});

//make this component available to the app
export default Carte;
