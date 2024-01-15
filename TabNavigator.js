import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopularMoviesScreen from './PopularMoviesScreen';
import TopRatedMoviesScreen from './TopRatedMoviesScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Actualités" component={PopularMoviesScreen} />
      <Tab.Screen name="Les mieux notés" component={TopRatedMoviesScreen} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
