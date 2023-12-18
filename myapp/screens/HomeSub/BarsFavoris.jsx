// Import necessary modules
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../utile/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { removeFav } from '../../reducers/favoris'; // Assuming you have a deleteFav action creator

const BarsFavoris = () => {
  const favBars = useSelector((state) => state.favoris.value);
  const dispatch = useDispatch();

  const handleDelete = (name) => {
    dispatch(removeFav(name)); // Assuming deleteFav takes the name of the bar to delete
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>

      <ScrollView style={styles.listContainer}>
        {favBars.length === 0 ? (
          <Text style={styles.noFavText}>Pas encore de bars favoris ☹︎</Text>
        ) : (
          favBars.map((bar, index) => (
            <View key={index} style={styles.barContainer}>
              <Image source={{ uri: bar.image }} style={styles.barImage} />
              <View style={styles.barInfoContainer}>
                <Text style={styles.barName}>{bar.name}</Text>
                <Text style={styles.barAddress}>{bar.adresse}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(bar.name)} style={styles.deleteButton}>
                <FontAwesome name="trash" size={20} color={colors.Radiance} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'BricolageGrotesque',
    color: colors.Radiance,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  barContainer: {
    margin: 15,
      flexDirection: 'row',
    justifyContent:'space-between',
    width: '92%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  barImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
    width: '30%',
  },
  barInfoContainer: {
    width: '50%',
    padding: 10,
  },
  barName: {
    fontSize: 18,
    fontFamily: 'BricolageGrotesque',
  },
  barAddress: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
  deleteButton: {
    justifyContent: 'center',
      alignItems: 'center',
    paddingHorizontal:20,
  },
  noFavText: {
    padding: 100,
    marginLeft: 10,
    width: '100%',
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
  },
});

export default BarsFavoris;
