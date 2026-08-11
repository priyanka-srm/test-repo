import { useState } from "react";
function KeyPractice() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Keyboard", price: 2000 },
    { id: 3, name: "Mouse", price: 1000 },
    { id: 4, name: "Monitor", price: 15000 },
    { id: 5, name: "Headphones", price: 3000 },
  ]);
  const [useIndexAsKey, setUseIndexAsKey] = useState(false);
  function removeProduct(id) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }
  return (
    <div className="key-practice">
      <h2>Key Practice</h2>
      <p>
        Compare stable keys with array index keys by deleting an item from the
        middle of the list.
      </p>
      <label>
        <input
          type="checkbox"
          checked={useIndexAsKey}
          onChange={(e) => setUseIndexAsKey(e.target.checked)} />
        Use array index as key
        <span> (deliberately buggy for comparison)</span>
      </label>
      <div className="product-list">
        {products.map((product, index) => (
          <div
            className="product-item"
            key={useIndexAsKey ? index : product.id}>
            <div>
              <strong>{product.name}</strong>
              <span> - ₹{product.price}</span>
            </div>
            <input type="text" defaultValue="" placeholder="Add a note..." />
            <button type="button" onClick={() => removeProduct(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default KeyPractice;
