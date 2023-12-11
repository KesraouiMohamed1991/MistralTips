import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = () => {
    // Send the form data to the parent to check and register in the database
    onSignUp({ username, email, password, phoneNumber });
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
        value={email}
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

      <Button title="S'inscrire" onPress={handleSignUp} />
    </View>
  );
};

const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  GoldenYellow: '#FFC436',
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
});

export default SignUpForm;
