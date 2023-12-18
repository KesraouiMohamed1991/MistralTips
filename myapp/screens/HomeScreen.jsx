import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import {  useSelector } from 'react-redux';
import {colors} from '../utile/colors'

function HomeScreen({ navigation }) {
  

  const user = useSelector((state) => state.user.value);



  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/Poppins-Regular.ttf'),
    'Voyage-Regular': require('../assets/Voyage-Regular.otf'),
    'BricolageGrotesque': require('../assets/BricolageGrotesque-Bold.ttf'),
    'Menhir': require('../assets/menhir/Menhir-Bold-SemiCondensed.otf'),
    'OverusedGrotesk-bold': require('../assets/OverusedGrotesk-Bold.ttf'),
    'OverusedGrotesk': require('../assets/fonts/ttf/OverusedGrotesk-ExtraBoldItalic.ttf'),
    'OverusedGrotesk-Medium': require('../assets/fonts/ttf/OverusedGrotesk-Medium.ttf'),
    'OverusedGrotesk-Book': require('../assets/fonts/ttf/OverusedGrotesk-Book.ttf'),
  });



  if (!fontsLoaded) {
    return null;
  }

const goToTabs = () => {
  if (user.token && user.token.length > 0) {
    navigation.navigate('MyTabs');
  } else {
    navigation.navigate('Login');
  }
};


  return (
    <View style={styles.container}>

      <View style={styles.logoHolder}>
            <Image source={require('../assets/bg.png')} style={styles.logoImage} />

      <View style={styles.logo}>
        <Text style={{ fontFamily: 'BricolageGrotesque', fontSize: 36, width:'100%' }}> 🥂  MistralTip's 🍾</Text>
        <Text style={{ fontFamily: 'BricolageGrotesque', fontSize: 16 }}>✻ Explorez, Connectez, Vivez ✻</Text>
      </View>
      </View>


      <TouchableOpacity style={styles.btn} onPress={goToTabs}>
      <Text style={[styles.btnText, { marginRight: -10 }] }>Explorer →</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.Marseille,
  },
  btn: {
    ustifyContent:'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    backgroundColor: colors.GoldenYellow,
    borderRadius: 30,
    width: 200,
    alignItems:'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  wrapper: {
    width: '90%',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'OverusedGrotesk',
  },
  btnText: {
    color:colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
    fontSize: 20,
  },
  logoImage: {
    height: 100,
    width:400,
    objectFit:'cover'
  },
  
  logoHolder: {
    height: 400,
    justifyContent:'center',
    alignItems:'center',
  }
});

export default HomeScreen;
