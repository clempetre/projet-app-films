import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import MovieCard from './MovieCard';

const PopularMoviesScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <MovieCard movie={item} />}
    />
  );
};

export default PopularMoviesScreen;
