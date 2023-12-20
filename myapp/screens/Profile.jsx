import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  TextInput
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { removeData } from '../reducers/bars';
import { fetchUserAccount } from '../utile/api';
import { fetchAccountInformations } from '../utile/api';
import { colors } from '../utile/colors';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import {addPhoto, removePhoto} from '../../myapp/reducers/photo'
import { BACKEND_ADDRESS } from '../utile/address';

const Profile = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const favBars = useSelector((state) => state.favoris.value);
  const imageFromCloud = useSelector((state) => state.photo.value);
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);



  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);


const cameraRef = useRef(null);

  
  
  const handleLogout = () => {
    Alert.alert(
      'Se Deconnecter',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          onPress: () => {
            dispatch(logout());
            dispatch(removeData());
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        'Supprimer mon compte',
        'Êtes-vous sûr de vouloir supprimer votre compte ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: async () => {
              await fetchUserAccount(user.username);
              dispatch(logout());
              dispatch(removeData());
            dispatch(removePhoto())

              navigation.navigate('Home');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const handleFavorites = () => {
    navigation.navigate('BarsFavoris');
  };

  const takePicture = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera permission not granted');
        return;
      }


      if (cameraRef && cameraRef.current) {
        // Capture photo
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });

        // Prepare and send photo to the server
        const formData = new FormData();

        formData.append('photoFromFront', {
          uri: photo.uri,
          type: 'image/jpg',
          name: 'photo.jpg',
        });

        console.log('FormData:', formData);



        const response = await fetch(`${BACKEND_ADDRESS}/bars/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Upload result:', result);
          dispatch(addPhoto(result.url));
          console.log('from redux',imageFromCloud);
            setShowCamera(false)        
        } else {
          console.error(
            'Error uploading photo to the server:',
            response.status,
            response.statusText
          );
        }
      } else {
        console.error('Camera reference is invalid or not ready');
      }
    } catch (error) {
      console.error('Error in takePicture:', error);
    }
  };



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, []);





  


  const HandlePasswordChange = async () => {
    if (newPassword.length === 0 || currentPassword.length === 0) {
     
      return 
   }


    try {
        await fetchAccountInformations(currentPassword, user.username, newPassword);
      console.log('Password changed successfully.');
       setIsVisible(false); 

    } catch (error) {
        console.error('Error handling password change:', error);
    }
};
  
  
  



    

  
  return (
    <ScrollView style={styles.container}>
      {!hasPermission || !isFocused ? (
        <View></View>
      ) : (
        <View>
          {/* Modal for Camera View */}
              <Modal
              animationType="slide"
              transparent={false}
              visible={showCamera}
              onRequestClose={() => setShowCamera(false)}
              >
              <Camera  type={type}  ref={cameraRef} style={{ flex: 1 }}  />

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>


              <TouchableOpacity

              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
              >
              <FontAwesome name="rotate-right" size={30} color={colors.Radiance}/>
              </TouchableOpacity>




              <TouchableOpacity onPress={takePicture}>
              <FontAwesome name="circle-thin" size={80} color={colors.Radiance}/>
              </TouchableOpacity>



              <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.close} >
              <FontAwesome name='close' size={30} color={colors.Radiance} />
              </TouchableOpacity>


              </View>

              </Modal>


          {/* Modal for password */}

              <Modal
              transparent={true}
              animationType="slide"
              visible={isVisible}
              // onRequestClose={onClose}
              >
              <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

              <Text style={styles.modalTitle}>Changer le mot de passe</Text>

              <TextInput
              style={styles.input}
              placeholder="Mot de passe actuel"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              required
              />

              <TextInput
              style={styles.input}
              placeholder="Nouveau mot de passe"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              required
              />

              <TouchableOpacity
              style={styles.modalBtn}
              onPress={HandlePasswordChange}
              >
              <Text style={styles.buttonText}>Changer le mot de passe</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={()=>setIsVisible(false)} >
              <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
              </View>
              </View>
              </Modal>



         
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mon Profil</Text>
          </View>

          <View style={styles.profileSection}>
            
              
            <TouchableOpacity
            onPress={() => setShowCamera(true)}

            >
            <Image
            style={styles.Image}
            source={{
            uri: imageFromCloud.length>0? imageFromCloud: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            />
            </TouchableOpacity>
              
            <Text style={styles.profileName} onPress={() => setShowCamera(true)}>
              {user.username}
            </Text>
            <Text style={styles.profileEmail}>{user.mail}</Text>

              <View style={styles.buttonsContainer}>
                
              <TouchableOpacity style={styles.logOut} onPress={handleLogout}>
                <Text style={styles.logOutText}>Déconnexion</Text>
                </TouchableOpacity>
                
              <TouchableOpacity style={styles.gofav} onPress={handleFavorites}>
                <Text style={styles.buttonText}>Mes favoris</Text>
                <Text style={{ fontSize: 8, position: 'absolute', right: 28, top: 5, fontWeight: 'bold' }}>{favBars.length > 0 ? favBars.length : null}</Text>
              </TouchableOpacity>
            </View>
            
          <TouchableOpacity
          style={styles.button}
          onPress={() => setIsVisible(true)}>
          <Text style={styles.changerbtn}>Modifier Mot de passe </Text>
          </TouchableOpacity>
        
          </View>

          <View style={styles.infoSection}>
            <InfoItem title="Ville" value="Marseille" />
              <InfoItem title="Langue" value="Français" />



        
                  <Text onPress={handleDeleteAccount} style={styles.deleteAccount}>
              Supprimer mon compte
            </Text>


          </View>
          <ChangeInfoModal visible={visible} setVisible={setVisible}/>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Nos Réseaux Sociaux</Text>
            <SocialMediaItem platform="facebook" />
            <SocialMediaItem platform="linkedin" />
            <SocialMediaItem platform="instagram" />
            <SocialMediaItem platform="twitter" />
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policyText}>Politique de confidentialité</Text>
            <Text style={styles.policyText}>Conditions d'utilisation</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const ChangeInfoModal = ({visible, setVisible}) => {
  
  const [password, setPassword] = useState('');
  const [newMail, setMail] = useState(null);
  const [newUsername, setUsername] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  

  return(
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={setVisible(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text>Saisissez votre mot de passe puis les informations à modifier :</Text>
        <TextInput
          secureTextEntry
          placeholder="Mot de passe actuel"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          placeholder="Nom d'utilisateur"
          value={newUsername}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Email"
          value={newMail}
          onChangeText={setMail}
        />
        <Button title="Annuler" onPress={setVisible(false)} />
        <Button title="Confirmer" onPress={() => fetchAccountInformations(password, newUsername, newMail, newPassword)} />
      </View>
    </View>
  </Modal>)
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
    <Text style={styles.socialMediaText}>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </Text>
  </TouchableOpacity>
);

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
    fontFamily: 'BricolageGrotesque',
    marginTop: 11,
    fontSize: 20,
    color: colors.Radiance,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'BricolageGrotesque',
    marginVertical: 6,
    color: colors.DeepBlue,
  },

  close: {
    
    // position: "absolute",
    // left:20,
  },
  profileEmail: {
    fontSize: 16,
    color: colors.NavyBlue,
    fontFamily: 'Poppins-Regular',
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
    fontSize: 16,
    color: colors.Midnight,
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.DeepBlue,
  },
  contactSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontFamily: 'BricolageGrotesque',
    marginBottom: 15,
    color: colors.Radiance,
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
    fontFamily: 'Poppins-Regular',
    color: colors.DeepBlue,
  },
  policySection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  policyText: {
    fontFamily: 'BricolageGrotesque',
    textAlign: 'center',
    color: colors.Radiance,
    marginBottom: 10,
  },
    logOut: {
        marginVertical: 10,
        backgroundColor: colors.GoldenYellow,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        width: '40%',
    },
  logOutText: {
    fontFamily: 'BricolageGrotesque',
    color: 'white',
    textAlign: 'center',
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
    fontSize: 14,
        justifyContent: 'center',
    alignItems:'center'
  },
deleteAccount: {
  fontFamily: 'BricolageGrotesque',
  color: 'red',
  fontSize: 12,
  padding: 10,
  marginTop:10,
  textAlign: 'center',
  borderStyle: 'dotted', // Set border style to dotted
  borderColor: colors.DeepBlue,  // Set border color (change to your desired color)
  borderWidth: 1,        // Set border width (adjust as needed)
},

  gofav: {
    marginVertical: 10,
    backgroundColor: colors.GoldenYellow,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 20,
    width: '40%',
      justifyContent: 'center',
    alignItems:'center'

  },
  buttonsContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-evenly'
    
  }, buttonText: {
    fontFamily: 'BricolageGrotesque',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.DeepBlue,
    fontSize: 14,
    

    
  }, Image: {
    height: 150,
    width: 150,
    borderRadius:75
  },

    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'BricolageGrotesque',
    marginBottom: 10,
    textAlign:'center'
  },
  input: {
    height: 40,
    borderColor: colors.Marseille,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',


  },
  button: {
    backgroundColor: colors.GoldenYellow,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: colors.Marseille,
    borderWidth: 1,
  },
  closeButtonText: {
    color: colors.DeepBlue,
    fontFamily: 'BricolageGrotesque',
  },


  changerbtn: {
    backgroundColor: colors.GoldenYellow,
    borderRadius: 20,
    alignItems: 'center',
    fontFamily: 'BricolageGrotesque',
    paddingHorizontal: 10,
    color: colors.DeepBlue,
    

  }, modalBtn: {
    borderRadius: 5,
    color: colors.DeepBlue,
    paddingHorizontal: 10,
    backgroundColor: colors.GoldenYellow,
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    paddingVertical:10,
    
  }

});


export default Profile;
