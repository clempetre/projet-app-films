import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchedContext = createContext({
  watched: [],
  addWatched: () => {},
  removeWatched: () => {},
  isWatched: () => false,
});

export const useWatched = () => useContext(WatchedContext);

export const WatchedProvider = ({ children }) => {
  const [watched, setWatched] = useState([]);

  const loadWatched = async () => {
    try {
      const watchedData = await AsyncStorage.getItem('watched');
      if (watchedData !== null) {
        setWatched(JSON.parse(watchedData));
      }
    } catch (e) {
      console.error('Failed to load watched movies.');
    }
  };

  const addWatched = async movie => {
    if (!watched.find(m => m.id === movie.id)) {
      const newWatched = [...watched, { ...movie, dateWatched: new Date().toISOString() }]; // Ajoutez la dateWatched ici
      setWatched(newWatched);
      await AsyncStorage.setItem('watched', JSON.stringify(newWatched));
    }
  };

  const removeWatched = async movieId => {
    const newWatched = watched.filter(m => m.id !== movieId);
    setWatched(newWatched);
    await AsyncStorage.setItem('watched', JSON.stringify(newWatched));
  };

  const isWatched = movieId => {
    return watched.some(m => m.id === movieId);
  };

  useEffect(() => {
    loadWatched();
  }, []);

  return (
    <WatchedContext.Provider value={{ watched, addWatched, removeWatched, isWatched }}>
      {children}
    </WatchedContext.Provider>
  );
};
