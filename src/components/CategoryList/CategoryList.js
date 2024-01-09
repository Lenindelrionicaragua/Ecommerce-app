import React from "react";
import CategoryListItem from "../CategoryListItem/CategoryListItem";

const CategoryList = ({ categories, selectedCategory, onCategoryClick }) => {
  // Verifies if categories is an array before calling map
  if (!Array.isArray(categories)) {
    console.error("Categories is not an array:", categories);
    return null;
  }

  // Handles click on a category item, toggling the selected state.
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
