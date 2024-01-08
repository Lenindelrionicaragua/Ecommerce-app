// FavoritesPage.js
import React from "react";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();

  return (
    <div>
      <h2>Favorites Page</h2>
      {favoriteIds.length > 0 ? (
        <ul>
          {favoriteIds.map((productId) => (
            <li key={productId}>{`Product ID: ${productId}`}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
