import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import { products } from "./data/products";

function App() {
  const cartItems = useSelector((state) => state.cart.items);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    localStorage.setItem("cartflow-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  function handleProductAdded(productTitle) {
    setFeedback(`${productTitle} added to your cart.`);

    window.clearTimeout(handleProductAdded.timeoutId);

    handleProductAdded.timeoutId = window.setTimeout(() => {
      setFeedback("");
    }, 2500);
  }

  function handleExploreProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="app" id="top">
      <Header onCartOpen={handleCartOpen} />

      {feedback && (
        <div className="feedback" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          {feedback}
        </div>
      )}

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">SIMPLE SHOPPING</span>

              <h1>
                Find what you need.
                <span>Flow through checkout.</span>
              </h1>

              <p>
                CartFlow is a clean shopping cart experience built with React
                and Redux Toolkit.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={handleExploreProducts}
              >
                Explore products
                <span aria-hidden="true">↓</span>
              </button>
            </div>

            <div className="hero-feature-card">
              <div className="hero-feature-icon" aria-hidden="true">
                🛍️
              </div>

              <span>BUILT FOR EVERYDAY SHOPPING</span>

              <h2>Everything you need in one cart.</h2>

              <p>
                Add products, adjust quantities and keep your cart ready even
                after refreshing the page.
              </p>

              <div className="hero-stats">
                <div>
                  <strong>06</strong>
                  <span>Products</span>
                </div>

                <div>
                  <strong>100%</strong>
                  <span>Responsive</span>
                </div>

                <div>
                  <strong>RTK</strong>
                  <span>State</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="products-section"
          id="products"
          aria-labelledby="products-heading"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">CURATED COLLECTION</span>

                <h2 id="products-heading">Featured products</h2>
              </div>

              <p>{products.length} products available</p>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdded={handleProductAdded}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>CartFlow</strong>

            <p>Redux Toolkit shopping cart mini-project.</p>
          </div>

          <p>Built with React + Redux Toolkit</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
