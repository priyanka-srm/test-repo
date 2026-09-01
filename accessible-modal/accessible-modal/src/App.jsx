import { useRef, useState } from "react";
import AccessibleModal from "./components/AccessibleModal";
import FavoriteButton from "./components/FavoriteButton";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const feedbackRef = useRef(null);
  const topRef = useRef(null);

  function handleOpenModal() {
    setActionMessage("");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleConfirm() {
    setIsModalOpen(false);
    setActionMessage("Action confirmed successfully.");
  }

  function handleFeedbackNavigation(event) {
    event.preventDefault();

    feedbackRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    requestAnimationFrame(() => {
      feedbackRef.current?.focus();
    });
  }

  function handleBrandNavigation(event) {
    event.preventDefault();

    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    requestAnimationFrame(() => {
      topRef.current?.focus();
    });
  }

  return (
    <>
      <div ref={topRef} tabIndex={-1} className="page-top-anchor" />

      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <a
            href="#top"
            className="brand"
            onClick={handleBrandNavigation}
          >
            <span className="brand-mark" aria-hidden="true">
              A
            </span>

            <span>
              <strong>Accessibility Lab</strong>
              <small>React Practice</small>
            </span>
          </a>

          <a
            href="#feedback"
            className="nav-link"
            onClick={handleFeedbackNavigation}
          >
            Feedback
          </a>
        </nav>
      </header>

      <main>
        <section
          className="hero"
          aria-labelledby="page-title"
        >
          <div className="hero-content">
            <p className="eyebrow">Accessibility</p>

            <h1 id="page-title">
              Build interfaces everyone can use.
            </h1>

            <p className="hero-description">
              A practical accessibility lab covering semantic HTML,
              keyboard navigation, ARIA, forms, portals, and deliberate
              focus management.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={handleOpenModal}
              >
                Open confirmation
              </button>

              <a
                href="#accessibility-checklist"
                className="secondary-link"
              >
                View checklist
              </a>
            </div>

            {actionMessage && (
              <p
                className="success-message"
                role="status"
                aria-live="polite"
              >
                {actionMessage}
              </p>
            )}
          </div>

          <aside
            className="hero-card"
            aria-label="Accessibility highlights"
          >
            <div
              className="hero-card-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <h2>Keyboard ready</h2>

            <p>
              Every important interaction can be completed without a mouse.
            </p>

            <div className="keyboard-hints">
              <span>Tab</span>
              <span>Enter</span>
              <span>Space</span>
              <span>Esc</span>
            </div>
          </aside>
        </section>

        <section
          className="features-section"
          id="accessibility-checklist"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <p className="eyebrow">What we practice</p>

            <h2 id="features-title">
              Accessibility fundamentals
            </h2>
          </div>

          <ul className="feature-grid">
            <li className="feature-card">
              <span aria-hidden="true">01</span>

              <h3>Semantic HTML</h3>

              <p>
                Meaningful landmarks and native interactive elements.
              </p>
            </li>

            <li className="feature-card">
              <span aria-hidden="true">02</span>

              <h3>Keyboard navigation</h3>

              <p>
                Navigate and interact using Tab, Enter, Space, and Escape.
              </p>
            </li>

            <li className="feature-card">
              <span aria-hidden="true">03</span>

              <h3>Focus management</h3>

              <p>
                Move focus deliberately when the modal opens and closes.
              </p>
            </li>

            <li className="feature-card">
              <span aria-hidden="true">04</span>

              <h3>Accessible forms</h3>

              <p>
                Proper labels, controlled inputs, validation, and live status.
              </p>
            </li>
          </ul>
        </section>

        <section
          className="interaction-section"
          aria-labelledby="interaction-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Try it</p>

            <h2 id="interaction-title">
              Accessible interaction
            </h2>

            <p>
              The favorite control below demonstrates an icon-only button
              with an accessible name.
            </p>
          </div>

          <div className="favorite-demo">
            <span>Favorite this interaction</span>

            <FavoriteButton />
          </div>
        </section>

        <section
          ref={feedbackRef}
          id="feedback"
          tabIndex={-1}
          className="feedback-section-wrapper"
          aria-labelledby="feedback-title"
        >
          <FeedbackForm />
        </section>
      </main>

      <footer className="site-footer">
        <p>
          Built with semantic HTML, React, and accessibility-first patterns.
        </p>
      </footer>

      <AccessibleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default App;
