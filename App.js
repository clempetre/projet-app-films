import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './FavoritesContext';
import PopularMoviesScreen from './PopularMoviesScreen';
import TopRatedMoviesScreen from './TopRatedMoviesScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <FavoritesProvider>
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Actualités" component={PopularMoviesScreen} />
      <Tab.Screen name="Les mieux notés" component={TopRatedMoviesScreen} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
