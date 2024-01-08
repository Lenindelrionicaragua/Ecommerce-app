import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api";
import { useFavorites } from "../../context/FavoritesContext";
import HeartRegularIcon from "../HeartIcons/HeartRegularIcon";
import HeartSolidIcon from "../HeartIcons/HeartSolidIcon";
import "./ProductList.css";

const ProductList = ({ selectedCategory, onProductClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(selectedCategory);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleProductClick = (product) => {
    if (typeof onProductClick === "function") {
      onProductClick(product);
    }
  };

  const handleFavoriteClick = (productId) => {
    if (isFavorite(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  const renderProductList = () => (
    <ul className="product-list">
      {products.map((product, index) => (
        <li key={index} className="product-item">
          <Link to={`/product/${product.id}`}>
            <button
              type="button"
              onClick={() => handleProductClick(product)}
              className="product-link"
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
            </button>
          </Link>
          {/* Heart Icon */}
          <div className="heart-icon-container">
            {isFavorite(product.id) ? (
              <HeartSolidIcon onClick={() => handleFavoriteClick(product.id)} />
            ) : (
              <HeartRegularIcon
                onClick={() => handleFavoriteClick(product.id)}
              />
            )}
          </div>
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
      ) : (
        renderProductList()
      )}
    </div>
  );
};

export default ProductList;
