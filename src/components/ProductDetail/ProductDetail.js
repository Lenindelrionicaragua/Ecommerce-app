import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useFavorites } from "../../context/FavoritesContext";
import HeartRegularIcon from "../HeartIcons/HeartRegularIcon";
import HeartSolidIcon from "../HeartIcons/HeartSolidIcon";

const ProductDetail = ({ products, setSelectedProduct }) => {
  const { id } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    // Effect to handle product selection and cleanup on component mount and unmount
    if (products.length === 0) {
      return;
    }

    // Find the selected product based on the URL parameter 'id'
    const product = products.find((product) => product.id === parseInt(id));

    if (!product) {
      return;
    }

    // Set the selected product
    setSelectedProduct(product);

    // Cleanup function to clear the selected product on component unmount
    return () => {
      setSelectedProduct(null);
    };
  }, [id, products, setSelectedProduct]);

  // Check if products are not available
  if (products.length === 0) {
    return <p>No products available</p>;
  }

  // Find the product based on the URL parameter 'id'
  const product = products.find((product) => product.id === parseInt(id));

  // Check if the product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  const { title, image, description } = product;

  return (
    <div className="product-detail-container">
      <div className="product-content">
        <div className="product-description">
          {/* Display product description */}
          <p className="vertical-center">{description}</p>
          {/* Heart Icon for adding/removing from favorites */}
          <div className="heart-icon-container">
            {isFavorite(product.id) ? (
              <HeartSolidIcon onClick={() => removeFavorite(product.id)} />
            ) : (
              <HeartRegularIcon onClick={() => addFavorite(product.id)} />
            )}
          </div>
        </div>
        <div className="product-image">
          {/* Display product image */}
          <img className="product-detail-image" src={image} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
