import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Articles = ({navigation}) => {

  const BACKEND_ADDRESS = 'http://192.168.1.24:3000';
  // const BACKEND_ADDRESS = 'http://10.20.2.91:3000';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const fetcharticles = async () => {
    try {
      // const response = await fetch('http://10.20.2.92:3000/bars/blogs');
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
            <Text style={styles.articleDate}>{item.date.slice(0,10)}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Articles</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
      ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching articles</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.date}
          renderItem={renderarticleItem}
          style={styles.flatList}
          
        />
      )}
    </SafeAreaView>
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
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'BricolageGrotesque' ,

  },
});

export default Articles;
