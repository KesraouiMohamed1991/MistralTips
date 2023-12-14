// AnotherPage.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchBarsData } from '../../design_utils/api';




console.log('the log from the api',fetchBarsData());

const Barpage = ({ route }) => {
    const { markerData } = route.params;
        const starSize = 30;
  return (
    <ScrollView style={styles.container}>
      

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <View style={styles.ratingSection}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome key={i} name="star" size={starSize} color={colors.GoldenYellow} />
          ))}
        </View>
          </View>
          
               {/* <Text>{`Latitude: ${markerData.latitude}`}</Text>
      <Text>{`Longitude: ${markerData.longitude}`}</Text> */}

      <View style={styles.profileSection}>
              <Text style={styles.profileName}>{markerData.title }</Text>
        <Text style={styles.profileAddress}>123 Rue Exemple, Ville, Code Postal</Text>
        <View style={styles.characteristicSection}>
          <Characteristic label="Lounge" />
          <Characteristic label="Billard" />
          <Characteristic label="Wifi" />
          <Characteristic label="Pétanque" />
        </View>
        <Text style={styles.profileDescription}>
          Description concise et attrayante du bar. Quelques phrases qui captent l'essence du lieu et de l'ambiance.
        </Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <FontAwesome name="heart" size={20} color="white" />
          <Text style={styles.favoriteButtonText}>Ajouter aux favoris</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Characteristic = ({ label }) => (
  <View style={styles.characteristicItemContainer}>
    <Text style={styles.characteristicItem}>{label}</Text>
  </View>
);



const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  NavyBlue: '#1450A3',
  RoyalBlue: '#337CCF',
  SkyBlue: '#87C4FF',
  GoldenYellow: '#FFC436',
  Radiance: '#ff6600',
  LightGray: '#f2f2f2',
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:65,
    flex: 1,
    backgroundColor: colors.SkyBlue,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: colors.NavyBlue,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.GoldenYellow,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 360,
    height: 200,
    marginBottom: 10,
    borderRadius:10,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileSection: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: colors.Midnight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.DeepBlue,
    marginBottom: 5,
  },
  profileAddress: {
    fontSize: 16,
    color: colors.Midnight,
    marginBottom: 10,
  },
  characteristicSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    
  },
  characteristicItemContainer: {
    backgroundColor: colors.DeepBlue,
    padding: 10,
    borderRadius: 20,
    margin: 4,
    paddingHorizontal: 14,
  },
  characteristicItem: {
    color: 'white',
    fontSize: 14,
  },
  profileDescription: {
    fontSize: 16,
    color: colors.Midnight,
    textAlign: 'justify',
    marginTop: 10,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.GoldenYellow,
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    justifyContent: 'center',
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});

export default Barpage;
