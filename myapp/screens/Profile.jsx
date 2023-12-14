// Profile.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user'; 
import { removeData } from '../reducers/bars'; 


const Profile = ({navigation}) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  // console.log('from the profile', user);
  



  function hundleLogOut() {
    dispatch(logout())
    dispatch(removeData())


    navigation.navigate('Home');
}


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      <View style={styles.profileSection}>
        <FontAwesome name="user-circle" size={80} color={colors.DeepBlue} />
        <Text style={styles.profileName}>{user.username}</Text>
        <Text style={styles.profileEmail}>{user.mail}</Text>
        <TouchableOpacity style={styles.logOut} onPress={hundleLogOut}>
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.infoSection}>
        <InfoItem title="Ville" value="Marseille" />
        <InfoItem title="Langue" value="Français" />
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Réseaux Sociaux</Text>
        <SocialMediaItem platform="facebook" />
        <SocialMediaItem platform="linkedin" />
        <SocialMediaItem platform="instagram" />
      </View>

      <View style={styles.policySection}>
        <Text style={styles.policyText}>Politique de confidentialité</Text>
        <Text style={styles.policyText}>Conditions d'utilisation</Text>
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ title, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoText}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const SocialMediaItem = ({ platform }) => (
  <TouchableOpacity style={styles.socialMediaItem}>
    <FontAwesome name={platform} size={24} color={colors.Radiance} />
    <Text style={styles.socialMediaText}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Text>
  </TouchableOpacity>
);

const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  NavyBlue: '#1450A3',
  RoyalBlue: '#337CCF',
  SkyBlue: '#87C4FF',
  GoldenYellow: '#FFC436',
  Radiance: '#ff6600',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 18,
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    marginTop: 11,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.Radiance,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
    color: colors.DeepBlue,
  },
  profileEmail: {
    fontSize: 16,
    color: colors.Midnight,
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.NavyBlue,
  },
  infoText: {
    fontSize: 18,
    color: colors.Midnight,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.DeepBlue,
  },
  contactSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.Midnight,
    textAlign: 'center',
  },
  socialMediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.NavyBlue,
    marginBottom: 10,
  },
  socialMediaText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: 'bold',
    color: colors.DeepBlue,
  },
  policySection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  policyText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.Radiance,
    marginBottom: 10,
  },
  logOut: {
    marginVertical:10,
    backgroundColor: colors.Radiance,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius:20,
  }, 
  logOutText: {
    fontWeight: 'bold',
    color:'white'
  }
});

export default Profile;
