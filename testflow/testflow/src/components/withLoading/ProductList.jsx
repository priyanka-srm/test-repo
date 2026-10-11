import withLoading from "./withLoading";

function ProductList({ products }) {
  return (
    <section>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}

const ProductListWithLoading = withLoading(ProductList);

export default ProductListWithLoading;
