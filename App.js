import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Attendez 2 à 3 secondes, puis masquez l'écran de bienvenue
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000); // Ajustez la durée en millisecondes selon vos besoins (par exemple, 3000 pour 3 secondes)

    return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté
  }, []);

  if (showWelcome) {
    return (
      <View style={styles.welcomeContainer}>
        {/* Personnalisez cet écran de bienvenue */}
        <Image source={require('./assets/fond.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Bienvenue dans l'application !</Text>
      </View>
    );
  }

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
                } else if (route.name === 'Films visionnés') {
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
            <Tab.Screen name="Films visionnés" component={WatchedScreen} />
            <Tab.Screen name="Favoris" component={FavoritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </WatchedProvider>
    </FavoritesProvider>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
