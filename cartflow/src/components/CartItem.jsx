import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
function CartItem({ item }) {
  const dispatch = useDispatch();
  const itemTotal = item.price * item.quantity;
  return (
    <article className="cart-item">
      <img src={item.image} alt="" className="cart-item-image" />
      <div className="cart-item-main">
        <span className="cart-item-category">{item.category}</span>
        <h3>{item.title}</h3>
        <p>₹{item.price.toLocaleString("en-IN")} each</p>
        <div className="cart-item-actions">
          <div
            className="quantity-control"
            aria-label={`Quantity for ${item.title}`}>
            <button
              type="button"
              onClick={() => dispatch(decreaseQuantity(item.id))}
              disabled={item.quantity === 1}
              aria-label={`Decrease ${item.title} quantity`}>
              −
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button
              type="button"
              onClick={() => dispatch(increaseQuantity(item.id))}
              aria-label={`Increase ${item.title} quantity`}>
              +
            </button>
          </div>
          <button
            type="button"
            className="remove-item-button"
            onClick={() => dispatch(removeFromCart(item.id))}
            aria-label={`Remove ${item.title} from cart`}>
            Remove
          </button>
        </div>
      </div>
      <strong className="cart-item-price">
        ₹{itemTotal.toLocaleString("en-IN")}
      </strong>
    </article>
  );
}
export default CartItem;
