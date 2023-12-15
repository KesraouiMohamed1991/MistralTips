import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import bars from './reducers/bars';



import Carte from '../myapp/screens/Carte';
import Profile from './screens/Profile';
import HomeScreen from './screens/HomeScreen';
import Events from './screens/HomeSub/Events';
import Articles from './screens/HomeSub/Articles';
import Login from './screens/Login';
import SignIn from './screens/HomeSub/SignIn';
import SignUp from './screens/HomeSub/SignUp';
import Barpage from './screens/HomeSub/BarPage';
import ArticlesContent from './screens/HomeSub/ArticlesContent';
import EventsContent from './screens/HomeSub/EventsContent';


const reducers = combineReducers({ user, bars });
const persistConfig = { key: 'myapp', storage: AsyncStorage };



const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the middleware causing the warning
      immutableCheck: false, // Disable immutable state checks
    }),
});
const persistor = persistStore(store);




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const colors = {
  Midnight: '#0f0a0a',
  DeepBlue: '#191D88',
  NavyBlue: '#1450A3',
  RoyalBlue: '#337CCF',
  Marseille: '#30AADD',
  massilia: '#5A96E3',
  GoldenYellow: '#FFC436',
  Radiance: '#ff6600',
  gray: "#A0BCC2"
};


const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: false,
        style: {
          borderRadius: 15,
          height: 70,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Carte') {
            iconName = 'map';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Articles') {
            // iconName = 'file-text-o';
            iconName = 'list';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.Radiance,
        tabBarInactiveTintColor: colors.RoyalBlue,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          // borderBlockColor: 'white',
          // borderTopWidth: 1,
          // borderBottomWidth: 1,
          height: 60,
        },
      })}

    >
      <Tab.Screen name="Carte" component={Carte} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Articles" component={Articles} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

function App() {
  return (


    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Barpage" component={Barpage} />
            <Stack.Screen name="ArticlesContent" component={ArticlesContent} />
            <Stack.Screen name="EventsContent" component={EventsContent} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}

export default App;
