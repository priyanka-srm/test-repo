import { Link } from "react-router-dom";

function Products() {
  return (
    <div>
      <h1>Products</h1>

      <ul>
        <li>
          <Link to="/products/101">Product 101</Link>
        </li>

        <li>
          <Link to="/products/202">Product 202</Link>
        </li>

        <li>
          <Link to="/products/303">Product 303</Link>
        </li>
      </ul>
    </div>
  );
}

export default Products;
