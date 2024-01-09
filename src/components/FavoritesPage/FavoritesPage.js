import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import useFetch from "../../hooks/useFetch";
import "./FavoritesPage.css";
import HeartSolidIcon from "../HeartIcons/HeartSolidIcon";

/**
 * FavoritesPage component displays a list of favorite products.
 */
const FavoritesPage = () => {
  const { favoriteIds, removeFavorite } = useFavorites();
  const { data, loading, error, fetchData } = useFetch(
    "https://fakestoreapi.com/products"
  );
  const [favoriteProducts, setFavoriteProducts] = React.useState([]);

  // Fetch data when favoriteIds change
  useEffect(() => {
    if (favoriteIds.length > 0) {
      fetchData();
    } else {
      setFavoriteProducts([]);
    }
  }, [favoriteIds, fetchData]);

  // Filter and set favoriteProducts when data or favoriteIds change
  useEffect(() => {
    const filteredFavorites = data.filter((product) =>
      favoriteIds.includes(product.id)
    );
    setFavoriteProducts(filteredFavorites);
  }, [favoriteIds, data]);

  // Handle click on a product
  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
  };

  // Handle click on the favorite icon
  const handleFavoriteClick = (event, productId) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Favorite button clicked for product ID:", productId);
    removeFavorite(productId);
  };

  // Render the list of favorite products
  const renderFavoriteList = () => (
    <ul className="favorites-list">
      {favoriteProducts.map((product) => (
        <li key={product.id} className="favorites-item">
          <Link to={`/product/${product.id}`}>
            <div
              className="product-container"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="favorites-image"
              />
              <h3>{product.title}</h3>
              <div className="heart-icon-container">
                <HeartSolidIcon
                  onClick={(event) => handleFavoriteClick(event, product.id)}
                />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : favoriteProducts.length > 0 ? (
        renderFavoriteList()
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
