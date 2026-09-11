import Navbar from "./components/Navbar/Navbar";
import TailwindBadge from "./components/TailwindBadge.jsx";
function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="page-section hero-section">
          <div className="page-container hero-grid">
            <div>
              <span className="eyebrow">PHASE 13 • STYLING IN REACT</span>
              <h1>
                Build interfaces that look <span>intentional.</span>
              </h1>
              <p className="hero-text">
                StyleFlow is a responsive React styling playground built with
                CSS Modules, clsx, inline styles, Tailwind and responsive
                component architecture.
              </p>
              <div className="hero-actions">
                <a href="#features" className="primary-button">
                  Explore features
                </a>
                <a href="#components" className="secondary-button">
                  View components
                </a>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-top">
                <span className="status-dot" />
                <span>System status</span>
                <strong>Healthy</strong>
              </div>
              <div className="hero-card-content">
                <span className="metric-label">Responsive architecture</span>
                <strong className="metric-value">Desktop ↔ Mobile</strong>
                <span className="metric-description">
                  Actual component switching with useMediaQuery.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="page-section">
          <div className="page-container">
            <div className="section-heading">
              <span className="eyebrow">WHY THIS PROJECT</span>
              <h2>One project. Multiple styling strategies.</h2>
              <p>
                Each approach has a clear responsibility instead of mixing
                everything randomly.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-number">01</div>
                <h3>Scoped styling</h3>
                <p>
                  CSS Modules keep component styles isolated and prevent global
                  class collisions.
                </p>
              </article>
              <article className="feature-card">
                <div className="feature-number">02</div>
                <h3>Conditional classes</h3>
                <p>
                  clsx handles active, disabled and responsive UI states
                  cleanly.
                </p>
              </article>
              <article className="feature-card">
                <div className="feature-number">03</div>
                <h3>Responsive architecture</h3>
                <p>
                  CSS handles layout while useMediaQuery decides when the actual
                  component changes.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section id="components" className="page-section section-alt">
          <div className="page-container">
            <div className="section-heading">
              <span className="eyebrow">STYLE TOOLKIT</span>
              <h2>Phase 13 concepts in action</h2>
              <p>
                This section intentionally demonstrates the different styling
                techniques from the phase.
              </p>
            </div>
            <div className="toolkit-card">
              <div className="toolkit-item">
                <span className="toolkit-label">CSS Modules</span>
                <span className="toolkit-value">Scoped classes</span>
              </div>
              <div className="toolkit-item">
                <span className="toolkit-label">clsx</span>
                <span className="toolkit-value">Conditional classes</span>
              </div>
              <div className="toolkit-item">
                <span className="toolkit-label">Inline style</span>
                <span className="toolkit-value">Runtime values</span>
              </div>
              <div className="toolkit-item">
                <span className="toolkit-label">Tailwind</span>
                <TailwindBadge />
              </div>
              <div className="toolkit-item">
                <span className="toolkit-label">Responsive</span>
                <span className="toolkit-value">CSS + useMediaQuery</span>
              </div>
              <div className="toolkit-item">
                <span className="toolkit-label">Accessibility</span>
                <span className="toolkit-value success-text">
                  Keyboard ready
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="page-section">
          <div className="page-container">
            <div className="about-card">
              <div>
                <span className="eyebrow">BUILT FOR PRACTICE</span>
                <h2>Clean code. Strong contrast. Responsive by design.</h2>
                <p>
                  The interface is designed to stay readable in both light and
                  dark themes, remain usable with keyboard navigation, and avoid
                  layout problems on small screens.
                </p>
              </div>
              <div className="check-list">
                <span>✓ Keyboard accessible</span>
                <span>✓ Focus-visible states</span>
                <span>✓ Mobile-first safety</span>
                <span>✓ Theme persistence</span>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="page-section contact-section">
          <div className="page-container">
            <div className="contact-card">
              <div>
                <span className="eyebrow">GET IN TOUCH</span>
                <h2>Have an idea? Let’s build something useful.</h2>
                <p>
                  StyleFlow is a practice project focused on clean React
                  architecture, responsive design and reusable styling
                  strategies.
                </p>
              </div>
              <div className="contact-actions">
                <a href="mailto:yourname@gmail.com" className="primary-button">
                  Contact me
                </a>
                <a href="#home" className="secondary-button">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="coming-soon" className="page-section section-alt">
          <div className="page-container">
            <div className="coming-card">
              <span className="eyebrow">COMING SOON</span>
              <h2>More styling experiments</h2>
              <p>
                This navigation item is intentionally disabled to demonstrate
                disabled-state styling and interaction handling.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-container footer-inner">
          <span>StyleFlow</span>
          <span>Phase 13 • React Styling</span>
        </div>
      </footer>
    </>
  );
}
export default App;
