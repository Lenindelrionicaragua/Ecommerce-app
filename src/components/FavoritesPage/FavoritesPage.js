// FavoritesPage.js

import React, { useEffect } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import useFetch from "../../hooks/useFetch";

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const {
    data: favoriteProducts,
    loading,
    error,
    fetchData,
  } = useFetch("https://fakestoreapi.com/products", favoriteIds.length > 0);

  useEffect(() => {
    if (favoriteIds.length > 0) {
      fetchData(); // Fetch only if there are favorite products
    }
  }, [favoriteIds, fetchData]);

  return (
    <div>
      <h2>Favorites Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : favoriteProducts.length > 0 ? (
        <ul>
          {favoriteProducts.map((product) => (
            <li
              key={product.id}
            >{`Product ID: ${product.id}, Title: ${product.title}`}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
