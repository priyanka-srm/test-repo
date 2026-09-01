import { useSelector } from "react-redux";
function Header({ onCartOpen }) {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="CartFlow home">
          <span className="brand-icon" aria-hidden="true">
            C
          </span>
          <span className="brand-copy">
            <strong>CartFlow</strong>
            <small>Smart shopping</small>
          </span>
        </a>
        <button
          type="button"
          className="cart-trigger"
          onClick={onCartOpen}
          aria-label={`Open cart. ${cartCount} ${
            cartCount === 1 ? "item" : "items"
          }`}>
          <span className="cart-trigger-icon" aria-hidden="true">
            🛒
          </span>
          <span>Cart</span>
          <span className="cart-count" aria-hidden="true">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
export default Header;
