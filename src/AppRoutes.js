import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CategoryList from "./components/CategoryList/CategoryList";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";

// AppRoutes component handles application routes.
const AppRoutes = ({
  categories,
  selectedCategory,
  setSelectedProduct,
  products,
  handleCategoryClick,
}) => (
  <RoutesContainer>
    {/* Route to display details of a product. */}
    <Route
      path="/product/:id"
      element={
        <ProductDetail
          products={products}
          setSelectedProduct={setSelectedProduct}
        />
      }
    />
    {/* Main route displaying the list of categories and products. */}
    <Route
      path="/"
      element={
        <>
          {/* Component to show the list of categories. */}
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          {/* Component to show the list of products. */}
          <ProductList
            selectedCategory={selectedCategory}
            setSelectedProduct={setSelectedProduct}
            products={products}
          />
        </>
      }
    />
    {/* Route to display the list of products from a specific category. */}
    <Route
      path="/category/:category"
      element={
        <ProductList
          selectedCategory={selectedCategory}
          setSelectedProduct={setSelectedProduct}
          products={products}
        />
      }
    />
    {/* Route to show the favorites page. */}
    <Route path="/favorites" element={<FavoritesPage />} />
  </RoutesContainer>
);

export default AppRoutes;
