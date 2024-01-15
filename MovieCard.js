import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useFavorites } from './FavoritesContext';
import { useWatched } from './WatchedContext';

const MovieCard = ({ movie }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const { addWatched, removeWatched, isWatched } = useWatched();

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR`);
      setDetailedMovie(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du film:", error);
    }
  };

  const toggleDescription = () => {
    if (!showDescription && !detailedMovie) {
      fetchMovieDetails();
    }
    setShowDescription(!showDescription);
  };

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handleWatchedPress = () => {
    if (isWatched(movie.id)) {
      removeWatched(movie.id);
    } else {
      addWatched(movie);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleDescription} style={styles.imageContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.fullImage} />
        {showDescription && detailedMovie && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{detailedMovie.overview || "Pas de description disponible"}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.actionButton}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWatchedPress} style={styles.actionButton}>
          <Icon name={isWatched(movie.id) ? 'check-square' : 'check-square-o'} size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  descriptionContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  actionButton: {
    padding: 0,
  },
});

export default MovieCard;
