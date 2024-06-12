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

const Tabs = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default Tabs;
