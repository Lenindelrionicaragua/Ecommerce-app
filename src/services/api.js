const API_BASE_URL = "https://fakestoreapi.com";

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  const categories = await response.json();
  return categories;
};

export const getProducts = async (selectedCategory = null) => {
  const url = selectedCategory
    ? `${API_BASE_URL}/products/category/${selectedCategory}`
    : `${API_BASE_URL}/products`;

  const response = await fetch(url);
  const products = await response.json();
  return products;
};

export const getProductDetails = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  const productDetails = await response.json();
  return productDetails;
};
