import React from "react";
import { useFavorites } from "../../context/FavoritesContext";

const CategoryListItem = ({ category, isSelected, onClick }) => (
  <li
    className={`category-list-item ${isSelected ? "active" : ""}`}
    onClick={() => onClick(category)}
  >
    {category}
  </li>
);

export default CategoryListItem;
