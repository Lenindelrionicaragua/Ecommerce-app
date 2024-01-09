import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import "./styles/ProductList.css";
import "./styles/CategoryList.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch categories data using custom hook
  const { data: categoriesData } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  // Fetch products data using custom hook
  const { data: productsData } = useFetch(
    selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products",
    selectedCategory !== null
  );

  useEffect(() => {
    setAllProducts(productsData);
  }, [productsData]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  const renderHeader = () => (
    <>
      <div className="header-container">
        <h1>{selectedProduct ? selectedProduct.title : "Products"}</h1>
        <nav>
          <Link to="/">Products</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
      <AppRoutes
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedProduct={setSelectedProduct}
        products={allProducts}
        handleCategoryClick={handleCategoryClick}
      />
      <FavoritesPage />
    </>
  );

  return (
    <Router>
      <FavoritesProvider>
        <div className="App">
          <header className="App-header">{renderHeader()}</header>
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
