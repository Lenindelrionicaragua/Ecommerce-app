import React from "react";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
import { useFavorites } from "../../context/FavoritesContext";

const CategoryList = ({ categories, selectedCategory, onCategoryClick }) => {
  const handleClick = (category) => {
    const newSelectedCategory = category === selectedCategory ? null : category;
    onCategoryClick(newSelectedCategory);
  };

  return (
    <ul className="category-list">
      {categories.map((category) => (
        <CategoryListItem
          key={category}
          category={category}
          isSelected={category === selectedCategory}
          onClick={() => handleClick(category)}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
