import React, { createContext, useState, useContext } from 'react';

const WatchedContext = createContext();

export const useWatched = () => useContext(WatchedContext);

export const WatchedProvider = ({ children }) => {
  const [watched, setWatched] = useState([]);

  const addWatched = movie => {
    if (!watched.find(m => m.id === movie.id)) {
      setWatched([...watched, movie]);
    }
  };

  const removeWatched = movieId => {
    setWatched(watched.filter(m => m.id !== movieId));
  };

  const isWatched = movieId => {
    return watched.some(m => m.id === movieId);
  };

  return (
    <WatchedContext.Provider value={{ watched, addWatched, removeWatched, isWatched }}>
      {children}
    </WatchedContext.Provider>
  );
};
