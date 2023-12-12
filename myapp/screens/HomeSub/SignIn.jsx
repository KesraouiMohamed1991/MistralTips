import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  GoldenYellow: '#FFC436',
  Marseille: '#30AADD',
};

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(false)

  const handleSignIn = async () => {


  if (username.length ===0 || password.length ===0) {
    return;
  }

    try {
      const response = await fetch('http://10.20.2.92:3000/bars/users/signin', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(true)

      if (response.ok) {
      setLoading(false)

        const result = await response.json();
        console.log('Server response:', result);

        if (result.result) {
          navigation.navigate('MyTabs');
          setUsername('')
          setPassword('')
        } else {
          console.error('Sign-in failed:', result.error);
           { error&&  
          <Text>Sign-in failed</Text>
        
          }
        }
      } else {
        console.error('Error uploading data to the server:', response.status, response.statusText);
        setError(true)
        { error&&  
          <Text>Error uploading data to the server</Text>
        
          }

      }
    } catch (error) {
        setError(true)

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
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      

   <TouchableOpacity
  style={styles.btn}
  onPress={handleSignIn}
  disabled={loading}
>
  <FontAwesome
    style={{ padding: 10 }}
    name="sign-in"
    size={20}
    color={colors.DeepBlue}
  />
  <Text style={styles.btnText}>
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

export default SignIn;
