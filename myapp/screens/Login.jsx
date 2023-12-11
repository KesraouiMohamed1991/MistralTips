import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/Poppins-Regular.ttf'),
    'BricolageGrotesque': require('../assets/BricolageGrotesque-Bold.ttf'),
    'OverusedGrotesk': require('../assets/fonts/ttf/OverusedGrotesk-ExtraBoldItalic.ttf'),
  });

  const handleSignUp = () => {


    }


    navigation.navigate('SignUp'); 
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn'); 
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderGoogleButton = () => (
    <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
      <FontAwesome style={{ padding: 10 }} name="arrow-right" size={20} color={colors.DeepBlue} />
      <Text style={{ color: colors.DeepBlue, fontFamily: 'BricolageGrotesque', fontSize: 16 }}>
                Sign In

      </Text>
    </TouchableOpacity>
  );
  const renderEmailButton = () => (
    <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
      <FontAwesome style={{ padding: 10 }} name="user-plus" size={20} color={colors.DeepBlue} />
      <Text style={{ color: colors.DeepBlue, fontFamily: 'BricolageGrotesque', fontSize: 16 }}>
        Sign Up
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, marginBottom: 50, fontFamily: 'BricolageGrotesque', textAlign:'center' }}>
        Choisissez parmi tous les etablissements de votre ville
      </Text>
      {/* <Text style={{ fontFamily: 'BricolageGrotesque' }}>Trouve ton bar parfait</Text> */}

      {renderGoogleButton()}
      {renderEmailButton()}
    </View>
  );
;

let colors = {
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
    backgroundColor: colors.Marseille,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: colors.GoldenYellow,
    borderRadius: 30,
    width: 300,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  btnText: {
    color: colors.DeepBlue,
    fontWeight: '900',
    fontFamily: 'BricolageGrotesque',
    fontSize: 20,
  },
  hello: {
    color: colors.Midnight,
    fontWeight: '900',
    fontSize: 30,
    marginBottom: 50,
    fontFamily: 'OverusedGrotesk',
  },
});

export default Login;
