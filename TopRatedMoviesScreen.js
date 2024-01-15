import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import MovieCard from './MovieCard';

const PopularMoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Numéro de page actuel
  const [loading, setLoading] = useState(false); // Pour afficher un indicateur de chargement

  const fetchMovies = async () => {
    if (loading) return; // Si le chargement est en cours, ne pas déclencher une autre requête

    setLoading(true); // Définir l'état de chargement sur vrai
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR&page=${page}`);
      const newMovies = response.data.results;

      // Ajouter les nouveaux films à la liste existante
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
      setPage(prevPage => prevPage + 1); // Augmenter le numéro de page

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Réinitialiser l'état de chargement lorsque la requête est terminée
    }
  };

  // Cette fonction est déclenchée lors du défilement
  const handleLoadMore = () => {
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []); // Charger les films initiaux lors du premier rendu

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <MovieCard movie={item} />}
      onEndReached={handleLoadMore} // Déclencher la pagination lorsque vous atteignez le bas de la liste
      onEndReachedThreshold={0.1} // Se déclenche lorsque vous atteignez les 10% restants de la liste
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#000" />} // Afficher un indicateur de chargement en bas de la liste
    />
  );
};

export default PopularMoviesScreen;
