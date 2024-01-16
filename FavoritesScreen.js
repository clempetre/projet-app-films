import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import MovieCard from './MovieCard';
import { useFavorites } from './FavoritesContext';

const { width } = Dimensions.get('window');

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  // Calculez la largeur des éléments de la liste pour toujours occuper la moitié de l'écran
  const itemWidth = width / 2;

  // Ajouter un élément factice si le nombre d'éléments est impair
  const favoritesWithDummy = [...favorites];
  if (favorites.length % 2 !== 0) {
    favoritesWithDummy.push({ isDummy: true });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritesWithDummy}
        numColumns={2}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `dummy-${index}`}
        renderItem={({ item }) => {
          if (item.isDummy) {
            return <View style={{ width: itemWidth, height: 0 }} />; // Espace réservé pour l'élément factice
          }
          return <MovieCard movie={item} itemWidth={itemWidth} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  // Autres styles si nécessaire
});

export default FavoritesScreen;
