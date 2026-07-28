import { CATEGORIES } from "../constants";
function SearchFilter({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div>
      <div>
        <label>Search Expense</label>
        <input
          type="text"
          placeholder="Search by description"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}/>
      </div>
      <div>
        <label>Filter By Category</label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="All">All</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default SearchFilter;
