import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import "./styles/ProductList.css";
import "./styles/CategoryList.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import useFetch from "./hooks/useFetch";

const App = () => {
  // State to store product categories
  const [categories, setCategories] = useState([]);
  // State to store the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  // State to store all products
  const [allProducts, setAllProducts] = useState([]);

  // Fetch categories data
  const { data: categoriesData, loading: categoriesLoading } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  // Update categories state after fetching data
  useEffect(() => {
    if (!categoriesLoading) {
      setCategories(categoriesData);
    }
  }, [categoriesData, categoriesLoading]);

  // Fetch all products data (remove the conditional check)
  const { data: allProductsData, loading: allProductsLoading } = useFetch(
    "https://fakestoreapi.com/products"
  );

  // Update allProducts state after fetching data
  useEffect(() => {
    if (!allProductsLoading) {
      setAllProducts(allProductsData);
    }
  }, [allProductsData, allProductsLoading]);

  // Handle category click event
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      {/* Provide favorites context to the entire app */}
      <FavoritesProvider>
        <div className="App">
          <header className="App-header">
            <div className="header-container">
              <h1>Products</h1>
              {/* Navigation links */}
              <nav>
                <Link to="/">Products</Link>
                <Link to="/favorites">Favorites</Link>
              </nav>
            </div>
          </header>
          {/* Render the main application routes */}
          <AppRoutes
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedProduct={() => {}}
            // Pass allProducts directly without slicing
            products={allProducts}
            handleCategoryClick={handleCategoryClick}
          />
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
