import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const addFavorite = (productId) => {
    setFavoriteIds((prevIds) => [...prevIds, productId]);
  };

  const removeFavorite = (productId) => {
    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  const isFavorite = (productId) => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext; // Exporting the context for use in other files
