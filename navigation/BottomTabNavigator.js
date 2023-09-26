import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SavedScreen from '../screens/SavedScreen';
import TrendingScreen from '../screens/TrendingScreen';
// import DiscoverScreen from '../screens/DiscoverScreen';
// import TrailersScreen from '../screens/TrailersScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Saved') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Trending') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } 
          // else if (route.name === 'Discover') {
          //   iconName = focused ? 'compass' : 'compass-outline';
          // } else if (route.name === 'Trailers') {
          //   iconName = focused ? 'film-outline' : 'film-outline';
          // }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Trending" 
        component={TrendingScreen} 
        options={{headerTitleAlign: 'center'}}
      />
      {/* <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{headerTitleAlign: 'center'}}
      />
      <Tab.Screen 
        name="Trailers" 
        component={TrailersScreen} 
        options={{headerTitleAlign: 'center'}}
      /> */}
      <Tab.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{headerTitleAlign: 'center'}} 
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
