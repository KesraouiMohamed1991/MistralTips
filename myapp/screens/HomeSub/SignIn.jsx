import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignInForm from './element/SignIn Form';

const SignIn = ({ navigation }) => {
  const handleSignIn = ({ email, password }) => {

    

    console.log('Email:', email);
    console.log('Password:', password);

    // Navigate to the main app screen
    navigation.navigate('MyTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.DeepBlue,
        fontFamily: 'BricolageGrotesque',
      }}>Connexion</Text>
      <SignInForm onSignIn={handleSignIn} />

      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <FontAwesome style={{ paddingHorizontal: 10 }} name="arrow-right" size={20} color={colors.DeepBlue} />
        <Text style={{ color: colors.DeepBlue, fontFamily: 'BricolageGrotesque', fontSize: 16 }}>
          Se connecter
        </Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: colors.Marseille,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: colors.GoldenYellow,
    borderRadius: 30,
    width: 260,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
      height:60,

  },
});

export default SignIn;
