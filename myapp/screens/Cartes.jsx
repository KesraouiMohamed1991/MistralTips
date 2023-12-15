// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, DrawerLayoutAndroid, Text, Button, Pressable, ActivityIndicator } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import { addData } from '../reducers/bars.js';

// // const BACKEND_ADDRESS = 'http://192.168.0.102:3000';
// const BACKEND_ADDRESS = 'http://10.20.2.92:3000';




// const colors = {
//   Midnight: '#0f0a0a',
//   DeepBlue: '#191D88',
//   NavyBlue: '#1450A3',
//   RoyalBlue: '#337CCF',
//   Marseille: '#30AADD',
//   GoldenYellow: '#FFC436',
//   Radiance: '#ff6600',
// };




// const Carte = ({navigation}) => {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const drawer = useRef(null);
//   const [loading, setLoading] = useState(true);

//   const userData = useSelector((state) => state.bars.value);
//   const dispatch = useDispatch();

//   const getBarsData = async () => {

//     try {
//       setLoading(true);
//       const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
//       const data = await response.json();
//       setLoading(false);

//       const barsData = data
//         .filter((e) => e.lattitude !== null && e.longitude !== null)
//         .map((e) => ({
//           name: e.name,
//           longitude: e.longitude,
//           latitude: e.lattitude,
//         }));
      
//       if (userData.length > 0) {

//         console.log(('no fetching'));

//         return
//       } else {
//         dispatch(addData(barsData));
//         console.log(('we fetched'));
//       }

//     } catch (error) {
//       console.error('Error fetching bar data:', error);
//     }
//   };


//   useEffect(() => {
//     const getLocationPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === 'granted') {
//         Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
//           setCurrentPosition(location.coords);
//           getBarsData();
//         });
//       }
//     };

//     getLocationPermission();
//   }, []);

//   const navigationView = () => (
//     <View style={[styles.container, styles.navigationContainer]}>
//       <Text style={styles.paragraph}>I'm in the Drawer!</Text>
//       <Button title="Close drawer" onPress={() => drawer.current.closeDrawer()} />
//       <Text>yes</Text>
//     </View>
//   );

  

//   const handleMarkerPress = (marker) => {
//     navigation.navigate('Barpage', { markerData: marker });
//   };


//   return (
//     <DrawerLayoutAndroid ref={drawer} drawerWidth={300} renderNavigationView={navigationView}>
//       <View style={styles.container}>
//         {loading ? (
//           <View style={styles.loaderContainer}>
            
//             <Text style={{fontFamily: 'BricolageGrotesque', fontSize: 20,}}>Hi, Please wait...</Text>
//       <ActivityIndicator size="large" color={colors.Radiance} />
//     </View>        ) : (
//           <MapView
//             initialRegion={{
//               latitude: currentPosition ? currentPosition.latitude : 43.300000,
//               longitude: currentPosition ? currentPosition.longitude : 5.4,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.0121,
//             }}
//             style={styles.map} // Updated map style
//           >
//             {currentPosition && (
//             <Marker
//             coordinate={currentPosition}
//             title="Vous êtes ici"
//             pinColor={colors.NavyBlue}
//             >

//             </Marker>

//             )}

//             {userData.slice(20,100).map((bar, index) => {
//               if (bar && bar.latitude !== null && bar.longitude !== null) {
//                 return (
//                   <Marker
//                     key={index}
//                     coordinate={{ latitude: bar.longitude, longitude: bar.latitude }}
//                     title={bar.name}
//                     pinColor={colors.Radiance}
//                     onCalloutPress={() => handleMarkerPress({title:bar.name})}
//                   >
//                     <FontAwesome style={{ padding: 10 }} name="glass" size={22} color={colors.Radiance} />
//                   </Marker>
//                 );
//               } else {
//                 console.error(`Invalid coordinates for marker with index ${index}:`, bar);
//                 return null;
//               }
//             })}
//           </MapView>
//         )}

//         {/* <FontAwesomeIcon icon="fa-solid fa-hand-middle-finger" /> */}

//         <Pressable style={styles.btnDrawer} onPress={() => drawer.current.openDrawer()}>
//           <FontAwesome style={{ padding: 10 }} name="bars" size={40} color={colors.Radiance} />
//         </Pressable>
//       </View>
//     </DrawerLayoutAndroid>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.Marseille,
//   },
//   navigationContainer: {
//     backgroundColor: '#ecf0f1',
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnDrawer: {
//     position: 'absolute',
//     top: 50,
//     left: 30,
//   },  loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     flex: 1,
//   }, // Added map style
// });

// export default Carte;
// Carte.js