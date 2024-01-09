// FavoritesPage.js
import React, { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import useFetch from "../../hooks/useFetch";

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { data, loading, error, fetchData } = useFetch(
    "https://fakestoreapi.com/products"
  );

  useEffect(() => {
    if (favoriteIds.length > 0) {
      fetchData(); // Fetch all products
    } else {
      // If there are no favorite products, set an empty array
      setFavoriteProducts([]);
    }
  }, [favoriteIds, fetchData]);

  useEffect(() => {
    // Filter out only the favorite products from the fetched data
    const filteredFavorites = data.filter((product) =>
      favoriteIds.includes(product.id)
    );
    setFavoriteProducts(filteredFavorites);
  }, [favoriteIds, data]);

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
            <li key={product.id}>
              {`Product ID: ${product.id}, Title: ${product.title}, Image: ${product.image}`}
              <img src={product.image} alt={product.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
