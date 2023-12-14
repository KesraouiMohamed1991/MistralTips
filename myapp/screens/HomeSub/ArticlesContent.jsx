import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesData } from "../../design_utils/api";



const ArticlesContent = ({route}) => {
    const  title  = route.params.titre;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const storedArticles = useSelector((state) => state.user.value.articles);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredData = await fetchArticlesData();
    
                const ArticleInfo = filteredData.filter((Article) => Article.title === title);
                console.log(ArticleInfo);

                setData(ArticleInfo);   // Set the fetched data to the state
                console.log(data);
            } catch (error) {
            console.error('Error fetching data in ArticleContent:', error);
        }
    };
    
    fetchData(); // Call the fetchData function immediately when the component mounts
    }, []);

    
    return (
    <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{data.date}</Text>
        <Text>{data.contenu}</Text>

        {/* <Text style={styles.header}>{data.titre}</Text>
        {loading ? (
        <ActivityIndicator size="large" color={colors.Radiance} />
        ) : error ? (
        <Text style={styles.errorText}>Error occurred while fetching articles</Text>
        ) : (
        <View style={styles.articleItem}>
            <Image style={styles.articleImage} source={{ uri: data.image }} />
            <Text style={styles.articleDate}>{data.date.slice(0,10)}</Text>
            <Text style={styles.articleContent}>{data.contenu}</Text>
        </View>
        )} */}
    </View>
  );
}

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
