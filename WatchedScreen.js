import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import MovieCard from './MovieCard';
import { useWatched } from './WatchedContext';
import axios from 'axios';

const { width } = Dimensions.get('window');

const WatchedScreen = () => {
  const { watched } = useWatched();
  const [totalMinutesWatched, setTotalMinutesWatched] = useState(0);

  useEffect(() => {
    const fetchMovieDuration = async (movieId) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6ed9566e63bd2c5f1043ca098f5fef9d&language=fr-FR`);
        return response.data.runtime;
      } catch (error) {
        console.error("Erreur lors de la récupération de la durée du film:", error);
        return 0;
      }
    };

    const calculateTotalMinutesWatched = async () => {
      let totalDuration = 0;
      for (const movie of watched) {
        const duration = await fetchMovieDuration(movie.id);
        totalDuration += duration;
      }
      setTotalMinutesWatched(totalDuration);
    };

    calculateTotalMinutesWatched();
  }, [watched]);

  // Calculez la largeur des éléments de la liste pour toujours occuper la moitié de l'écran
  const itemWidth = width / 2;

  // Ajouter un élément factice si le nombre d'éléments est impair
  const watchedWithDummy = [...watched];
  if (watched.length % 2 !== 0) {
    watchedWithDummy.push({ isDummy: true });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`Nombre de films vus : ${watched.length}`}</Text>
      <Text style={styles.totalMinutesText}>{`Durée totale regardée : ${totalMinutesWatched} minutes`}</Text>
      <FlatList
        data={watchedWithDummy}
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
    paddingTop: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  totalMinutesText: {
    fontSize: 14,
    margin: 10,
    textAlign: 'center',
  },
});

export default WatchedScreen;
