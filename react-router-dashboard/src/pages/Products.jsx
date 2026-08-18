import { Link, useSearchParams } from "react-router-dom";
const PRODUCTS = [
  { id: 101, name: "Wireless Mouse" },
  { id: 202, name: "Mechanical Keyboard" },
  { id: 303, name: "USB-C Hub" },
];
function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "id";
  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.id - b.id;
  });
  function handleSortChange(e) {
    setSearchParams({ sort: e.target.value });
  }
  return (
    <div>
      <h1>Products</h1>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sort} onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.id} - {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Products;
