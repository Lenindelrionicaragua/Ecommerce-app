// ProductList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import HeartRegularIcon from "../HeartIcons/HeartRegularIcon";
import HeartSolidIcon from "../HeartIcons/HeartSolidIcon";
import useFetch from "../../hooks/useFetch";
import "./ProductList.css";

const ProductList = ({
  selectedCategory,
  onProductClick,
  setSelectedProduct,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const {
    data: productsData,
    loading,
    error,
    fetchData,
  } = useFetch(
    selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products",
    selectedCategory !== null
  );

  useEffect(() => {
    if (productsData.length > 0) {
      setProducts(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    fetchData(); // Se llama al fetch cuando cambia selectedCategory
  }, [selectedCategory, fetchData]);

  const handleProductClick = async (product) => {
    if (typeof onProductClick === "function") {
      onProductClick({
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.image,
      });
    }

    if (selectedCategory) {
      // Si hay una categoría seleccionada, actualizamos los productos
      await fetchData();
      setProducts(productsData);
    }

    if (!selectedCategory && typeof setSelectedProduct === "function") {
      setSelectedProduct(product);
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
            <div className="product-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              {/* Heart Icon */}
              <div className="heart-icon-container">
                {isFavorite(product.id) ? (
                  <HeartSolidIcon
                    onClick={() => handleFavoriteClick(product.id)}
                  />
                ) : (
                  <HeartRegularIcon
                    onClick={() => handleFavoriteClick(product.id)}
                  />
                )}
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
      ) : (
        renderProductList()
      )}
    </div>
  );
};

export default ProductList;
