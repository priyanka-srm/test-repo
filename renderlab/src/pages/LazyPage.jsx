import { lazy, Suspense, useState } from "react";
import DemoCard from "../components/DemoCard";
import SectionHeader from "../components/SectionHeader";
const HeavyChart = lazy(() => import("../components/HeavyChart"));
export default function LazyPage() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="04 · CODE SPLITTING"
        title="Load code when it is needed."
        description="This route itself is lazy-loaded. The heavy chart below is also loaded only after you request it."/>
      <DemoCard
        eyebrow="REACT.LAZY + SUSPENSE"
        title="Heavy component on demand"
        description="Open DevTools → Network, then click the button. You should see an additional JavaScript chunk requested.">
        <div className="experiment-toolbar">
          <div>
            <strong>
              Chart status: {showChart ? "Loaded" : "Not requested"}
            </strong>
            <p>The chart component is not imported into the initial render.</p>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setShowChart(true)}
            disabled={showChart}>
            {showChart ? "Chart loaded" : "Load heavy chart"}
          </button>
        </div>
        {showChart ? (
          <Suspense
            fallback={
              <div className="component-loading" role="status">
                <div className="loading-spinner" aria-hidden="true" />
                <span>Loading chart component...</span>
              </div>
            }>
            <HeavyChart />
          </Suspense>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              ◌
            </span>
            <strong>Component not loaded yet</strong>
            <p>Click the button above to trigger the dynamic import.</p>
          </div>
        )}
      </DemoCard>
      <div className="code-flow">
        <div>
          <span>01</span>
          <strong>lazy()</strong>
          <p>Declare a component whose module can be loaded later.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Suspense</strong>
          <p>Show a controlled fallback while the component is loading.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Network</strong>
          <p>
            Verify the split chunk instead of assuming the optimization worked.
          </p>
        </div>
      </div>
    </div>
  );
}
