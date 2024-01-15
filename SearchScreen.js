import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import MovieCard from './MovieCard';

const PopularMoviesScreen = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.length > 0) {
        searchMovies();
      } else {
        setMovies([]); // Efface les résultats si la barre de recherche est vide
      }
    }, 500); // Délai de 500 ms

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR&query=${search}&page=1`);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher des films..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default PopularMoviesScreen;
