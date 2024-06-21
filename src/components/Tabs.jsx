import PropTypes from "prop-types";

const categories = [
  "All",
  "Aircraft",
  "Animals",
  "Architectural",
  "Exterior",
  "Interior",
  "Car",
  "Character",
  "Food",
  "Furniture",
  "Household",
  "Industrial",
  "Plant",
  "Space",
  "Vehicle",
  "Watercraft",
  "Military",
];

const Tabs = ({ selectedCategory, onCategorySelect }) => (
  <div className="tabs">
    <div className="container">
      <ul className="tabs-list">
        {categories.map((category) => (
          <li
            key={category}
            className={
              selectedCategory === category ? "tab-item active" : "tab-item"
            }
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Tabs.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default Tabs;
