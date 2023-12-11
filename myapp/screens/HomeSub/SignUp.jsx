import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignUpForm from './element/SignUp Form'; // Importez votre composant SignUpForm
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignUp = ({ navigation }) => {
  const handleSignUp = (userData) => {
    // Implémentez votre logique d'enregistrement d'utilisateur en utilisant les données utilisateur (nom d'utilisateur, email, mot de passe, numéro de téléphone)
    console.log('Données utilisateur :', userData);

    // Pour l'instant, naviguez vers l'écran principal de l'application
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
      }}>Inscription</Text>
      {/* Votre formulaire d'inscription ici */}
      <SignUpForm onSignUp={handleSignUp} />

      {/* Votre bouton d'inscription */}
      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <FontAwesome style={{ padding: 10 }} name="user-plus" size={20} color={colors.DeepBlue} />
        <Text style={styles.btnText}>S'inscrire</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
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
    marginTop: 20,
  },
  btnText: {
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SignUp;
