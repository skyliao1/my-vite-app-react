import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  // 获取分类列表
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <strong>分类：</strong>
      <button onClick={() => onCategoryChange('')}>全部</button>
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
