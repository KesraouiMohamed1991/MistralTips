import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch} from 'react-redux';
import {login}from '../../reducers/user'
import {colors} from '../../utile/colors'
import { BACKEND_ADDRESS } from '../../utile/address.js';


const SignUp = ({ navigation }) => {


  const dispatch = useDispatch();
  
  const [username, setUsername] = useState('');
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading]=useState(false)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;


const handleSignUp = async () => {
  if (username.length === 0 || password.length === 0) {
    return;
  }

  if (!emailRegex.test(mail)) {
    return;
  }

  if (!passwordRegex.test(password)) {
    return;
  }

  try {
    const response = await fetch(`${BACKEND_ADDRESS}/bars/users/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        mail,
        phoneNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setLoading(true);

    if (response.ok) {
      setLoading(false);
      const result = await response.json();
      dispatch(login({ username, mail, token: result.token }));

      if (result.result) {
        navigation.navigate('MyTabs');
        setEmail('');
        setPhoneNumber('');
        setUsername('');
        setPassword('');
      } else {
        console.error('Sign-up failed:', result.error);
      }
    } else {
      console.error(
        'Error uploading data to the server:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={mail}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      
   <TouchableOpacity
  style={styles.btn}
  onPress={handleSignUp}
  disabled={loading}
>
  <FontAwesome
    style={{ paddingVertical: 10 }}
    name="user-plus"
    size={20}
    color={colors.DeepBlue}
  />
  <Text style={[styles.btnText, { marginRight: 20 }]}>
    {loading ? 'Connexion en cours...' : 'Connexion'}
  </Text>
</TouchableOpacity>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Marseille,
  },
  input: {
    height: 60,
    borderColor: colors.GoldenYellow,
    borderWidth: 2,
    paddingHorizontal: 28,
    borderRadius: 30,
    paddingVertical: 10,
    width: 260,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
    color: colors.DeepBlue,
    lineHeight: 40,
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
