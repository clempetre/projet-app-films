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
  const [showUnwatchedConfirmation, setShowUnwatchedConfirmation] = useState(false);
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
      setShowUnwatchedConfirmation(true);
    } else {
      const dateWatched = new Date().toLocaleString();
      addWatched({ ...movie, dateWatched });
    }
  };

  const confirmUnwatched = () => {
    removeWatched(movie.id);
    setShowUnwatchedConfirmation(false);
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
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="#ff6347" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWatchedPress} style={styles.actionButton}>
          <Icon name={isWatched(movie.id) ? 'check-square' : 'square-o'} size={30} color="#26C485" />
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
      <Modal
        visible={showUnwatchedConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUnwatchedConfirmation(false)}
        >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Confirmer la suppression</Text>
        <Text style={styles.modalDescription}>Voulez-vous retirer ce film de votre liste de films déjà vus ?</Text>
        <TouchableOpacity onPress={confirmUnwatched} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowUnwatchedConfirmation(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Annuler</Text>
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
        height: 350,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#333333',
        elevation: 3,
        borderRadius: 10,
        overflow: 'hidden',
        },
        watchedCard: {
        borderColor: '#26C485',
        borderWidth: 3,
        },
        imageContainer: {
        width: '100%',
        height: '85%',
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        textAlign: 'center',
        },
        modalDescription: {
        color: '#000',
        textAlign: 'center',
        },
        confirmButton: {
        marginTop: 10,
        backgroundColor: '#6A96CE',
        borderRadius: 5,
        padding: 10,
        },
        confirmButtonText: {
        color: '#fff',
        textAlign: 'center',
        },
        closeButton: {
        marginTop: 10,
        backgroundColor: '#6A96CE',
        borderRadius: 5,
        padding: 10,
        },
        closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        },
        });
        
        export default MovieCard;
