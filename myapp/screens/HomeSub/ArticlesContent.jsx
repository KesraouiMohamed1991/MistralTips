import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ArticlesContent = (title) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const storedArticles = useSelector((state) => state.user.value.articles);

    const articleDetails = storedArticles.filter((e) => {
      e.titre !== title
    })
  
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{articleDetails.titre}</Text>
        {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
        ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching articles</Text>
        ) : (
        <View style={styles.articleItem}>
            <Image style={styles.articleImage} source={{ uri: articleDetails.image }} />
            <Text style={styles.articleDate}>{articleDetails.date.slice(0,10)}</Text>
            <Text style={styles.articleContent}>{articleDetails.contenu}</Text>
        </View>
        )}
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articleDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        color: colors.Midnight,
    },
    articleContent: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.Midnight,
        textAlign: 'justify',
    },
    flatList: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
    },
  });


export default ArticlesContent;
