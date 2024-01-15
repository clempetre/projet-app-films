import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import { useWatched } from './WatchedContext';

const WatchedScreen = () => {
  const { watched } = useWatched();

  return (
    <View style={styles.container}>
      {watched.length > 0 ? (
        <FlatList
          data={watched}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      ) : (
        <Text style={styles.noMoviesText}>Aucun film vu pour le moment.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noMoviesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default WatchedScreen;
