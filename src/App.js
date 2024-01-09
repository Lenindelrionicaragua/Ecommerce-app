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

  // Fetch products data based on selected category
  const { data: productsData, loading: productsLoading } = useFetch(
    selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products",
    selectedCategory !== null
  );

  // Update allProducts state after fetching data
  useEffect(() => {
    if (!productsLoading) {
      setAllProducts(productsData);
    }
  }, [productsData, productsLoading]);

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
            // Display all products or limit to first 5 based on the selected category
            products={selectedCategory ? allProducts : allProducts.slice(0, 5)}
            handleCategoryClick={handleCategoryClick}
          />
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
