import React, { createContext, useContext, useState, useCallback } from "react";

// Create a context for managing favorites
const FavoritesContext = createContext();

// Provide a context provider to manage favorites state
export const FavoritesProvider = ({ children }) => {
  // State to store the IDs of favorite products
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Add a product to the list of favorites
  const addFavorite = useCallback((productId) => {
    setFavoriteIds((prevIds) => [...prevIds, productId]);
  }, []);

  // Remove a product from the list of favorites
  const removeFavorite = useCallback((productId) => {
    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== productId));
  }, []);

  // Check if a product is in the list of favorites
  const isFavorite = useCallback(
    (productId) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  // Provide the favorites context to the entire app
  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to access the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
