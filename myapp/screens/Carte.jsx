import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../reducers/bars.js';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {colors} from '../utile/colors'



// const BACKEND_ADDRESS = 'http://192.168.0.101:3000';
const BACKEND_ADDRESS = 'http://10.20.2.92:3000';



const FilterCheckbox = ({ label, isChecked, onToggle }) => {
  return (
    <View style={styles.checkboxContainer}>
      <BouncyCheckbox
        size={25}
        fillColor="black"
        unfillColor="#FFFFFF"
        text={label}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={[{ color: !isChecked ? 'gray' : 'black' }, { textDecorationLine: 'none' }, { fontFamily: 'BricolageGrotesque' }]}
        isChecked={isChecked}
        onPress={onToggle}
      />
    </View>
  );
};

const Carte = ({ navigation }) => {
  const [barsData, setBarsData] = useState([]);
  const [isBilliardChecked, setBilliardChecked] = useState(false);
  const [isFletchetteChecked, setFletchetteChecked] = useState(false);
  const [isBabyfootChecked, setBabyfootChecked] = useState(false);
  const [isWifiChecked, setWifiChecked] = useState(false);
  const [isRoofChecked, setRoofChecked] = useState(false);
  const [isTapasChecked, setTapasChecked] = useState(false);
  const [isCocktailChecked, setCocktailChecked] = useState(false);
  const [isFamilialChecked, setFamilialChecked] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.bars.value);
  const dispatch = useDispatch();

  const filterBars = (data) => {
    return data
      .filter((e) =>
        e.lattitude !== null &&
        e.longitude !== null &&
              //filtrer les activites Et Equipements 
        (
      (!isBabyfootChecked || checkFilter(e.activitesEtEquipements?.Babyfoot, isBabyfootChecked)) &&
      (!isFletchetteChecked || checkFilter(e.activitesEtEquipements?.Fletchette, isFletchetteChecked)) &&
      (!isBilliardChecked || checkFilter(e.activitesEtEquipements?.Billard, isBilliardChecked)) &&
      (!isWifiChecked || checkFilter(e.activitesEtEquipements?.Wifi, isWifiChecked))&&
      //filtrer les caracteristiques Et Services
      (!isRoofChecked || checkFilter(e.caracteristiquesEtServices?.RoofTop, isRoofChecked
      )) &&
      (!isTapasChecked || checkFilter(e.caracteristiquesEtServices?.Tapas, isTapasChecked)) &&
      (!isCocktailChecked || checkFilter(e.caracteristiquesEtServices?.Cocktail, isCocktailChecked)) &&
      (!isFamilialChecked || checkFilter(e.caracteristiquesEtServices?.Familial, isFamilialChecked))
        )
      )
      .map((e) => ({
        name: e.name,
        longitude: e.longitude,
        latitude: e.lattitude,
      }));
  };

const getBarsData = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${BACKEND_ADDRESS}/bars/all`);
    const data = await response.json();
    setLoading(false);

    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      return;
    }

    // Dispatch the original data to update the Redux store
    dispatch(addData(data));

  } catch (error) {
    console.error('Error fetching bar data:', error);
  }
};

useEffect(() => {
  const fetchData = async () => {
    // Fetch data if userData is empty
    if (userData.length === 0) {
      await getBarsData();
    }

    // Filter the bars based on checkboxes
    const filteredBars = filterBars(userData);

    // Update the state with the filtered bars
    setBarsData(filteredBars);

    console.log(filteredBars.length);
  };

  fetchData();
}, [userData]); // Trigger the effect when userData changes


  const checkFilter = (value, isChecked) => {
    return value === (isChecked ? true : false);
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Use a normal function instead of arrow function here for easier removal in cleanup
        function handleLocationChange(location) {
          setCurrentPosition(location.coords);
          getBarsData();
        }

        const watchPosition = Location.watchPositionAsync({ distanceInterval: 10 }, handleLocationChange);

        return () => {
          // Cleanup on component unmount
          watchPosition.remove();
        };
      }
    };

    getLocationPermission();
  }, []);

  const handleMarkerPress = (marker) => {
    navigation.navigate('Barpage', { markerData: marker });
  };

  const handleModalVisibility = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleFilters = () => {
    // Call getBarsData to fetch filtered data
    getBarsData();
    // close modal
    closeModal();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.Radiance} />
        </View>
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Filtres</Text>
                <Pressable style={styles.buttonClose} onPress={closeModal}>
                  <FontAwesome style={{ paddingTop: 17 }} name="close" size={30} color={colors.Radiance} />
                </Pressable>

                <Text style={{ fontSize: 20, padding: 10, fontFamily: 'BricolageGrotesque', color: colors.Radiance }}>Equipements</Text>
                <View>
                  <FilterCheckbox label="Wifi" isChecked={isWifiChecked} onToggle={() => setWifiChecked(!isWifiChecked)} />
                  <FilterCheckbox label="Fléchette" isChecked={isFletchetteChecked} onToggle={() => setFletchetteChecked(!isFletchetteChecked)} />
                  <FilterCheckbox label="Billiard" isChecked={isBilliardChecked} onToggle={() => setBilliardChecked(!isBilliardChecked)} />
                  <FilterCheckbox label="Babyfoot" isChecked={isBabyfootChecked} onToggle={() => setBabyfootChecked(!isBabyfootChecked)} />
                </View>

                <Text style={{ fontSize: 20, padding: 10, fontFamily: 'BricolageGrotesque', color: colors.Radiance }}>Types</Text>
                <View>
                  <FilterCheckbox label="Roof-top" isChecked={isRoofChecked} onToggle={() => setRoofChecked(!isRoofChecked)} />
                  <FilterCheckbox label="Tapas" isChecked={isTapasChecked} onToggle={() => setTapasChecked(!isTapasChecked)} />
                  <FilterCheckbox label="Cocktail" isChecked={isCocktailChecked} onToggle={() => setCocktailChecked(!isCocktailChecked)} />
                  <FilterCheckbox label="Familial" isChecked={isFamilialChecked} onToggle={() => setFamilialChecked(!isFamilialChecked)} />
                </View>

                <TouchableOpacity style={styles.filterBtn} onPress={handleFilters}>
                  <Text style={{ padding: 10, color: colors.DeepBlue, fontFamily: 'BricolageGrotesque' }}>Filtrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <MapView
            initialRegion={{
              latitude: currentPosition ? currentPosition.latitude : 43.300000,
              longitude: currentPosition ? currentPosition.longitude : 5.4,
              latitudeDelta: 0.01,
              longitudeDelta: 0.0121,
            }}
            style={styles.map}
          >
            {currentPosition && (
              <Marker
                coordinate={currentPosition}
                title="Vous êtes ici"
                pinColor={colors.NavyBlue}
              >
                <FontAwesome style={{ padding: 10 }} name="street-view" size={26} color={colors.DeepBlue} />
              </Marker>
            )}

            {barsData.map((bar, index) => {
              if (bar && bar.latitude !== null && bar.longitude !== null) {
                return (
                  <Marker
                    key={index}
                    coordinate={{ latitude: bar.longitude, longitude: bar.latitude }}
                    title={bar.name}
                    pinColor={colors.Radiance}
                    onCalloutPress={() => handleMarkerPress({ title: bar.name })}
                  >
                    <FontAwesome style={{ padding: 10 }} name="beer" size={22} color={colors.Radiance} />
                  </Marker>
                );
              } else {
                console.error(`Invalid coordinates for marker with index ${index}:`, bar);
                return null;
              }
            })}
          </MapView>
        </>
      )}
      <Pressable
        style={styles.btnModal}
        onPress={handleModalVisibility}>
        <FontAwesome style={{ padding: 10 }} name="bars" size={40} color={colors.Radiance} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Marseille,
  },
  btnModal: {
    position: 'absolute',
    top: 50,
    right: 25,
  },
  buttonClose: {
    position: 'absolute',
    top: 16,
    right: 25,
  },
  modalView: {
    height: 250,
  },
  modalText: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'BricolageGrotesque'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  checkboxContainer: {
    padding: 10,
  },
  centeredView: {
    backgroundColor: 'white',
    height: '100%'
  },
  filterBtn: {
    backgroundColor: colors.GoldenYellow,
    paddingHorizontal: 20,
    width: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
  }
});

export default Carte;
