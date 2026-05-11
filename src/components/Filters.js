export default function Filters({ uniqueCategories }) {
  return (
    <div className="filters-container">
      <h2 className="filters-title">🏷️ Search Filter</h2>

      <div className="filter-section category-filter">
        <h3>Category</h3>
        {uniqueCategories.map((category, index) => (
          <div className="checkbox-group" key={index}>
            <input type="checkbox" id={`sample-category${index}`} />
            <label htmlFor={`sample-category${index}`}>{category}</label>
          </div>
        ))}
      </div>

      <div className="filter-section rating-filter">
        <h3>Rating</h3>
        <p>⭐⭐⭐⭐⭐</p>
        <p>⭐⭐⭐⭐ & Up</p>
        <p>⭐⭐⭐ & Up</p>
        <p>⭐⭐ & Up</p>
        <p>⭐ & Up</p>
      </div>

      <div className="filter-section price-range-filter">
        <h3>Price range</h3>
        <div className="price-inputs">
          <input type="text" placeholder="₱ Min" />
          <div className="dashed-divider"></div>
          <input type="text" placeholder="₱ Max" />
        </div>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
}
