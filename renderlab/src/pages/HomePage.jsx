import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
const labs = [
  {
    number: "01",
    title: "Why components re-render",
    description:
      "See parent cascades, local state updates, and the difference between re-rendering and mounting.",
    to: "/rerender",
  },
  {
    number: "02",
    title: "React.memo",
    description:
      "Compare normal children with memoized children and discover how changing references break memoization.",
    to: "/memo",
  },
  {
    number: "03",
    title: "useMemo + useCallback",
    description:
      "Stabilize calculated values, objects, arrays, and callback references only where they actually help.",
    to: "/callback",
  },
  {
    number: "04",
    title: "Code splitting",
    description:
      "Lazy-load routes and a heavy component with React.lazy and Suspense.",
    to: "/lazy",
  },
  {
    number: "05",
    title: "Virtualization",
    description:
      "Render 5,000 rows with normal mapping and compare that with a virtualized list.",
    to: "/virtualization",
  },
  {
    number: "06",
    title: "React DevTools Profiler",
    description:
      "Use the Profiler to find expensive interactions before adding memoization.",
    to: "/profiler",
  },
];
const decisionSteps = [
  {
    label: "1",
    title: "Profile first",
    text: "Find an actual expensive render or calculation.",
  },
  {
    label: "2",
    title: "Expensive calculation?",
    text: "Consider useMemo when dependencies rarely change.",
  },
  {
    label: "3",
    title: "Expensive child?",
    text: "Consider React.memo when props can stay stable.",
  },
  {
    label: "4",
    title: "Function prop?",
    text: "Use useCallback when that function is passed to a memoized child.",
  },
];
export default function HomePage() {
  return (
    <>
      <section className="hero-section page-container">
        <div className="hero-copy">
          <span className="status-badge">
            <span className="status-dot" aria-hidden="true" />
            Phase 14 · Performance
          </span>
          <h1>
            Make React
            <span>render smarter.</span>
          </h1>
          <p>
            RenderLab is a hands-on performance lab where every optimization has
            a visible reason, a measurable result, and a clear trade-off.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/rerender">
              Start the labs
            </Link>
            <Link className="button button-secondary" to="/profiler">
              Learn the workflow
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Performance principles">
          <div className="hero-panel-top">
            <span>PERFORMANCE MODEL</span>
            <span>01 → 04</span>
          </div>
          <div className="performance-flow">
            <div>
              <strong>Render</strong>
              <span>Component function runs</span>
            </div>
            <div className="flow-arrow" aria-hidden="true">
              ↓
            </div>
            <div>
              <strong>Compare</strong>
              <span>React checks what changed</span>
            </div>
            <div className="flow-arrow" aria-hidden="true">
              ↓
            </div>
            <div>
              <strong>Commit</strong>
              <span>DOM changes only where needed</span>
            </div>
          </div>
        </div>
      </section>
      <section className="page-container section-spacing">
        <SectionHeader
          eyebrow="LABS"
          title="Six focused experiments."
          description="Each page isolates one Phase 14 concept so you can explain not only what the API does, but why it exists."/>
        <div className="lab-grid">
          {labs.map((lab) => (
            <Link key={lab.to} to={lab.to} className="lab-card">
              <span className="lab-number">{lab.number}</span>
              <div>
                <h2>{lab.title}</h2>
                <p>{lab.description}</p>
              </div>
              <span className="lab-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="page-container section-spacing">
        <div className="split-section">
          <div>
            <span className="eyebrow">DECISION TREE</span>
            <h2 className="section-title">
              Optimization is a decision,
              <span> not a reflex.</span>
            </h2>
            <p className="section-copy">
              Memoization adds complexity. Start with evidence, then choose the
              smallest optimization that solves the real problem.
            </p>
          </div>
          <div className="decision-list">
            {decisionSteps.map((step) => (
              <div className="decision-item" key={step.label}>
                <span>{step.label}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-container section-spacing">
        <div className="principle-banner">
          <div>
            <span className="eyebrow">CORE RULE</span>
            <h2>Don't optimize code that isn't a problem.</h2>
          </div>
          <Link className="button button-secondary" to="/profiler">
            Profile first
          </Link>
        </div>
      </section>
    </>
  );
}
