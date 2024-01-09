import React, { createContext, useContext, useState, useCallback } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const addFavorite = useCallback((productId) => {
    setFavoriteIds((prevIds) => [...prevIds, productId]);
  }, []);

  const removeFavorite = useCallback((productId) => {
    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== productId));
  }, []);

  const isFavorite = useCallback(
    (productId) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
