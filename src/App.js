// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import "./styles/ProductList.css";
import "./styles/CategoryList.css";

import { getCategories, getProducts } from "./services/api";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch categories and products data on component mount
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const productsData = await getProducts();
        setCategories(categoriesData);
        setAllProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    // Handle category click
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  const renderLoadingOrError = () => {
    // Render loading or error message
    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>{error}</p>;
    }
  };

  const renderHeader = () => {
    // Render header with title and application routes
    return (
      <React.Fragment>
        <h1>{selectedProduct ? selectedProduct.title : "Products"}</h1>
        <AppRoutes
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedProduct={setSelectedProduct}
          products={allProducts}
          handleCategoryClick={handleCategoryClick}
        />
      </React.Fragment>
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {renderLoadingOrError() || renderHeader()}
        </header>
      </div>
    </Router>
  );
};

export default App;
