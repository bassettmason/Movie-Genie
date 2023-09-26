import 'react-native-gesture-handler';
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

import LoginScreen from '../screens/LoginScreen';
import SavedScreen from '../screens/SavedScreen';
import TrendingScreen from '../screens/TrendingScreen';
import SubscreenMediaDetails from '../screens/SubscreenMediaDetails';
// import DiscoverScreen from '../screens/DiscoverScreen';
// import TrailersScreen from '../screens/TrailersScreen';
export const AppContext = React.createContext();

const Stack = createStackNavigator();

const AppNavigator = () => {

  const [refresh, setRefresh] = useState(false);
  
  return (
    <AppContext.Provider value={{refresh, setRefresh}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="App" component={BottomTabNavigator} />
          <Stack.Screen name="Saved" component={SavedScreen}/>
          <Stack.Screen name="Trending" component={TrendingScreen} />
          {/* <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="Trailers" component={TrailersScreen} /> */}
          <Stack.Screen name="MediaDetails" component={SubscreenMediaDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default AppNavigator;
