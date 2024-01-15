import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import { useFavorites } from './FavoritesContext';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  // Autres styles si nécessaire
});

export default FavoritesScreen;
