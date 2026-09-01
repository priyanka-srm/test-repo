import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product, onAdded }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
    onAdded(product.title);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-content">
        <span className="product-category">{product.category}</span>

        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <div className="product-card-footer">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>

          <button
            type="button"
            className="add-to-cart-button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
