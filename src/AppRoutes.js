import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CategoryList from "./components/CategoryList/CategoryList";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage"; // Importa la nueva página de favoritos
import { useFavorites } from "../src/context/FavoritesContext";

const AppRoutes = ({
  categories,
  selectedCategory,
  setSelectedProduct,
  products,
  handleCategoryClick,
}) => (
  <RoutesContainer>
    {/* Route for displaying the details of a specific product */}
    <Route
      path="/product/:id"
      element={
        <ProductDetail
          products={products}
          setSelectedProduct={setSelectedProduct}
        />
      }
    />

    {/* Default route for displaying categories and product list */}
    <Route
      path="/"
      element={
        <React.Fragment>
          {/* Component for displaying a list of categories */}
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          {/* Component for displaying a list of products */}
          <ProductList
            selectedCategory={selectedCategory}
            setSelectedProduct={setSelectedProduct}
            products={products}
          />
        </React.Fragment>
      }
    />

    {/* Route for displaying products based on a specific category */}
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

    {/* Route for displaying the user's favorite products */}
    <Route
      path="/favorites"
      element={
        <FavoritesPage
        // You may pass necessary props for the FavoritesPage
        />
      }
    />
  </RoutesContainer>
);

export default AppRoutes;
