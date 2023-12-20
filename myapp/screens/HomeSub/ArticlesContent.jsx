import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { fetchArticlesData } from '../../utile/api';
import {colors} from '../../utile/colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ArticlesContent = ({ route, navigation }) => {
  const title = route.params.titre;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredData = await fetchArticlesData();
        const ArticleInfo = filteredData.filter((Article) => Article.title === title);

        setData(ArticleInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data in ArticleContent:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);


    const goArtcile = () => {
    navigation.navigate('Articles');
}



  const renderContentSection = () => {
    if (loading) {
      return        <View style={{marginVertical:400}} >
          <ActivityIndicator size="large" color={colors.Radiance} />
        </View>
    
    }

    if (error) {
      return<>
        <Text style={styles.errorText}>Une erreur s'est produite lors de la récupération des articles</Text>;
      
      </>
    
    }

    if (!data || data.length === 0) {
      return <Text>No data available</Text>;
    }

    const article = data[0];

    return (
      <SafeAreaView style={styles.section}>
        <Text style={styles.header}>Articles </Text>
        
                <TouchableOpacity style={styles.icon} onPress={goArtcile} >
        <FontAwesome style={{ padding: 10 }} name="arrow-left" size={25} color={colors.Midnight} />
        </TouchableOpacity>
        <Image style={styles.articleImage} source={{ uri: article.img }} />
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.date}>{formatDate(article.date)}</Text>

        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>Description :</Text>
          <Text style={styles.contentText}>{article.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>Content :</Text>
          <Text style={styles.contentText}>{article.content}</Text>
        </View>
      </SafeAreaView>
    );
  };

  return   <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>{renderContentSection()}</ScrollView>
  </SafeAreaView>
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor: 'white',
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: 'BricolageGrotesque',
    marginTop: 15,
    marginBottom: 10,
    color: colors.Radiance,
  },
  date: {
    fontSize: 14,
    color: colors.Midnight,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  articleImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 20,
  },
  contentSection: {
    marginTop: 15,
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: 'BricolageGrotesque',
    marginBottom: 10,
    color: colors.Midnight,
  },
  contentText: {
    fontSize: 16,
    color: colors.Midnight,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
      header: {
        fontSize: 20,
        fontFamily: 'BricolageGrotesque',
        marginTop: 30,
        marginBottom: 15,
        color: colors.Radiance,
        textAlign: 'center',
        width: '100%',
  },
  title: {
        textAlign: 'left',
        fontSize: 22,
        marginBottom: 15,
        fontFamily: 'BricolageGrotesque',
        

      },  icon: {
            top: 22,
            left: 5,
            // backgroundColor: colors.GoldenYellow,
            position: 'absolute',
            zIndex:10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            fontFamily: 'Poppins-Regular',
        },
});

export default ArticlesContent;
