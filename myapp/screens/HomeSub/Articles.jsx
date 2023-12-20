import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_ADDRESS } from '../../utile/address.js';

import { colors } from '../../utile/colors';
const Articles = ({navigation}) => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  
  // let BACKEND_ADDRESS = process.env.BACKEND_ADDRESS
  
  const fetcharticles = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/bars/blogs`);

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
        console.error('Error fetching articles:', response.status, response.statusText);
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
    fetcharticles();
  }, []);

  function handlePress(params) {
    navigation.navigate('ArticlesContent', {titre: params})
  }

  const renderarticleItem = ({ item }) => (
    <View style={styles.articleItem}>
        <TouchableOpacity  onPress={() => handlePress(item.titre)}>
            <Image style={styles.articleImage} source={{ uri: item.image }} />
            <Text style={styles.articleTitle}>{item.titre}</Text>
            <Text style={styles.articleDate}>{formatDateToFrench(item.date)}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
        </TouchableOpacity>
    </View>
  );

    const formatDateToFrench = (dateString) => {
        const options = {  day: 'numeric', month: 'long',year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
      ) : error ? (
        <Text style={styles.errorText}>Une erreur s'est produite lors de la récupération des articles</Text>
        ) : (
            <>
      <Text style={styles.header}>Articles</Text>
            
        <FlatList
          data={data}
          keyExtractor={(item) => item.date}
          renderItem={renderarticleItem}
          style={styles.flatList}
          
              />
              </>
      )}
    </SafeAreaView>
  );
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
    fontFamily: 'BricolageGrotesque',
    fontSize: 20,
    // fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: colors.Radiance,
  },
  articleItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.Midnight,
    marginBottom: 10, 
  },
  articleImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius:20,
  },
  articleTitle: {
    fontSize: 22,
    // fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'BricolageGrotesque' ,

  },
  articleDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    color: colors.Midnight,
    fontFamily: 'Poppins-Regular' ,

  },
  articleDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.Midnight,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular' ,

  },
  flatList: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'BricolageGrotesque' ,

  },
});

export default Articles;
