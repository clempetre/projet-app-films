import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useFavorites } from './FavoritesContext';
import { useWatched } from './WatchedContext';
import moment from 'moment';

const MovieCard = ({ movie }) => {
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const { addWatched, removeWatched, isWatched } = useWatched();

  const toggleDescription = async () => {
    if (!showDescriptionPopup && !detailedMovie) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR`);
        setDetailedMovie(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film:", error);
      }
    }
    setShowDescriptionPopup(!showDescriptionPopup);
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
      const dateWatched = new Date().toLocaleString();
      addWatched({ ...movie, dateWatched });
    }
  };

  return (
    <View style={[styles.card, isWatched(movie.id) && styles.watchedCard]}>
      <TouchableOpacity onPress={toggleDescription} style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.fullImage}
        />
        {isWatched(movie.id) && (
          <View style={styles.dateLabel}>
            <Text style={styles.dateText}>Vu le : {moment(movie.dateWatched).format("DD/MM/YYYY")}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.actionButton}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWatchedPress} style={styles.actionButton}>
          <Icon name={isWatched(movie.id) ? 'check-square' : 'square-o'} size={30} color="green" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={showDescriptionPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDescriptionPopup(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Description de {movie.title}</Text>
            {detailedMovie && (
              <Text style={styles.modalDescription}>{detailedMovie.overview || "Pas de description disponible"}</Text>
            )}
            <TouchableOpacity onPress={() => setShowDescriptionPopup(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  watchedCard: {
    borderColor: 'green', // Couleur du cerclage vert
    borderWidth: 3, // Épaisseur du cerclage
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%',
    height: '100%',
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
  dateLabel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 5,
  },
  dateText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MovieCard;
