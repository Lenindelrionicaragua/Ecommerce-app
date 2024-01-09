// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import "./styles/ProductList.css";
import "./styles/CategoryList.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch categories data using custom hook
  const { data: categoriesData, loading: categoriesLoading } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  useEffect(() => {
    if (!categoriesLoading) {
      setCategories(categoriesData);
    }
  }, [categoriesData, categoriesLoading]);

  // Fetch products data using custom hook
  const { data: productsData, loading: productsLoading } = useFetch(
    selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products",
    selectedCategory !== null
  );

  useEffect(() => {
    if (!productsLoading) {
      setAllProducts(productsData);
    }
  }, [productsData, productsLoading]);

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
        products={selectedCategory ? allProducts : allProducts.slice(0, 5)} // Usamos todos los productos o solo algunos cuando no hay categoría seleccionada
        handleCategoryClick={handleCategoryClick}
      />
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
