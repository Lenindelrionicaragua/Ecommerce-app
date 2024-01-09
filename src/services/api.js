const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Fetches product categories from the API.
 * @returns {Promise<Array>} Resolves to an array of product categories.
 */
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  return response.json();
};

/**
 * Fetches products from the API based on the selected category.
 * @param {string|null} selectedCategory - The selected product category (optional).
 * @returns {Promise<Array>} Resolves to an array of products.
 */
export const getProducts = async (selectedCategory = null) => {
  // Construct the URL based on the selected category
  const url = selectedCategory
    ? `${API_BASE_URL}/products/category/${selectedCategory}`
    : `${API_BASE_URL}/products`;

  // Fetch products from the API
  const response = await fetch(url);
  return response.json();
};

/**
 * Fetches details of a specific product from the API.
 * @param {number} productId - The ID of the product to fetch details for.
 * @returns {Promise<Object>} Resolves to an object containing product details.
 */
export const getProductDetails = async (productId) => {
  // Fetch product details from the API
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  return response.json();
};
