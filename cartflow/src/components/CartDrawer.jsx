import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";
function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const closeButtonRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  function handleClearCart() {
    dispatch(clearCart());
  }
  return (
    <div
      className={`cart-drawer ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}>
      <div className="cart-backdrop" onClick={onClose} aria-hidden="true" />
      <section
        className="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}>
        <div className="cart-panel-header">
          <div>
            <span className="eyebrow">YOUR CART</span>
            <h2 id="cart-title">Shopping cart</h2>
            <p>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="close-cart-button"
            onClick={onClose}
            aria-label="Close shopping cart"
            tabIndex={isOpen ? 0 : -1}>
            ×
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon" aria-hidden="true">
              🛒
            </span>
            <h3>Your cart is empty</h3>
            <p>Add a product from the collection to get started.</p>
            <button
              type="button"
              className="continue-shopping-button"
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <button
                type="button"
                className="checkout-button"
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}>
                Review order
              </button>
              <button
                type="button"
                className="clear-cart-button"
                onClick={handleClearCart}
                tabIndex={isOpen ? 0 : -1}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
export default CartDrawer;
