import { useState } from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';
import plusIcon from '../../assets/plus-icon.svg'
import selectedIcon from '../../assets/checked.svg'

const categories = ['General', 'Entertainment', 'Business','Technology','Sports','Science','Health'];

const Filter = ({ onFilterApply }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  }

  const handleApplyFilter = () => {
    onFilterApply(selectedCategories);
  }

  const isSelected = (category) => {
    const included = selectedCategories.includes(category);
    return {
      icon: included ? selectedIcon : plusIcon,
      isIncluded: included
    };
  }
  
  return (
    <div className="filter">
      <div className="filter-header">News</div>
      {categories.map((category, index) => {
        const result = isSelected(category);
        return (
          <div 
            key={index} 
            className={`filter-item ${result.isIncluded ? 'selected' : ''}`} 
            onClick={() => handleCategoryClick(category)}
          >
            <img src={result.icon} alt="icon" />
            {category}
          </div>
        );
      })}
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
}

Filter.propTypes = {
  onFilterApply: PropTypes.func.isRequired,
};

export default Filter;