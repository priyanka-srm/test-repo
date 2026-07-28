function Filter({ filterCategory, setFilterCategory, expenses }) {
  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),];
  return (
    <div className="filter">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Filter;
