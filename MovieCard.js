import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavorites } from './FavoritesContext';

const MovieCard = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
      <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        <Icon name={isFavorite ? 'check-square' : 'check-square-o'} size={30} color="green" />
      </TouchableOpacity>
      <Text style={styles.title}>{movie.title}</Text>
      {/* Autres détails du film */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',},
    image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    },
    description: {
    padding: 10,
    textAlign: 'center',
    },
    // Ajoutez d'autres styles ici si nécessaire
    });
    
    export default MovieCard;
    
