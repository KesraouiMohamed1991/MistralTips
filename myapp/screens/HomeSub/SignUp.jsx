import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignUpForm from './element/SignUp Form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignUp = ({ navigation }) => {


  const handleSignUp = async (userData) => {
    try {
      const response = await fetch('http://10.20.2.92:3000/bars/users/signUp', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Handle the result as needed
        console.log('Server response:', result);


        navigation.navigate('MyTabs');
    //   } else {
        console.error('Error uploading data to the server:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }

     console.log('User Data:', userData);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <SignUpForm onSignUp={handleSignUp} />

      <TouchableOpacity style={styles.btn}>
        <FontAwesome style={{ padding: 10 }} name="user-plus" size={20} color={colors.DeepBlue} />
        <Text style={styles.btnText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  GoldenYellow: '#FFC436',
  Marseille: '#30AADD',
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
