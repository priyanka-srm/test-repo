import { useState } from "react";
function KeyPractice() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Keyboard", price: 2000 },
    { id: 3, name: "Mouse", price: 1000 },
    { id: 4, name: "Monitor", price: 15000 },
    { id: 5, name: "Headphones", price: 3000 },
  ]);
  function removeProduct(id) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }
  return (
    <div className="key-practice">
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <span>
            {product.name} - ₹{product.price}
          </span>
          <button type="button" onClick={() => removeProduct(product.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
export default KeyPractice;
