import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesProvider } from './FavoritesContext';
import PopularMoviesScreen from './PopularMoviesScreen';
import TopRatedMoviesScreen from './TopRatedMoviesScreen';
import FavoritesScreen from './FavoritesScreen';
import SearchScreen from './SearchScreen';
import WatchedScreen from './WatchedScreen';
import { WatchedProvider } from './WatchedContext';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <WatchedProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Actualités') {
                  iconName = 'newspaper-o';
                } else if (route.name === 'Les mieux notés') {
                  iconName = 'star';
                } else if (route.name === 'Recherche') {
                  iconName = 'search';
                } else if (route.name === 'Vus') {
                  iconName = 'eye';
                } else if (route.name === 'Favoris') {
                  iconName = 'heart';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: [{ display: 'flex' }, null],
            })}
          >
            <Tab.Screen name="Actualités" component={PopularMoviesScreen} />
            <Tab.Screen name="Les mieux notés" component={TopRatedMoviesScreen} />
            <Tab.Screen name="Recherche" component={SearchScreen} />
            <Tab.Screen name="Vus" component={WatchedScreen} />
            <Tab.Screen name="Favoris" component={FavoritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </WatchedProvider>
    </FavoritesProvider>
  );
};

export default App;
