import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Carte from './screens/Carte';
import Profile from './screens/Profile';
import HomeScreen from './screens/HomeScreen';
import Events from './screens/HomeSub/Events';
import Articles from './screens/HomeSub/Articles';
import Login from './screens/Login';

import SignIn from './screens/HomeSub/SignIn';

import SignUp from './screens/HomeSub/SignUp';
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
          height: 90,
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
            iconName = 'file-text-o';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.DeepBlue,
        tabBarInactiveTintColor: colors.RoyalBlue,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          // borderBlockColor: 'red',
          borderTopWidth: 0,
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
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="MyTabs" component={MyTabs} />
    //   </Stack.Navigator>
    // </NavigationContainer>


    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
