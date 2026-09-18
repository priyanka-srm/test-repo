import { memo, useCallback, useMemo, useState } from "react";
import DemoCard from "../components/DemoCard";
import RenderCount from "../components/RenderCount";
import SectionHeader from "../components/SectionHeader";
const ActionChild = memo(function ActionChild({ onAction }) {
  return (
    <div className="callback-child">
      <div>
        <strong>Memoized action child</strong>
        <p>
          The child receives a function prop. Stable reference = fewer
          parent-driven renders.
        </p>
      </div>
      <RenderCount label="Child renders" />
      <button
        type="button"
        className="button button-small button-secondary"
        onClick={onAction}>
        Run callback
      </button>
    </div>
  );
});
export default function CallbackPage() {
  const [parentCount, setParentCount] = useState(0);
  const [useStableCallback, setUseStableCallback] = useState(true);
  const [callbackRuns, setCallbackRuns] = useState(0);
  const stableCallback = useCallback(() => {
    setCallbackRuns((current) => current + 1);
  }, []);
  const inlineCallback = () => {
    setCallbackRuns((current) => current + 1);
  };
  const action = useStableCallback ? stableCallback : inlineCallback;
  const actionConfig = useMemo(
    () => ({
      label: "Run callback",
      type: "performance-demo",
    }),
    [],
  );
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="03 · MEMOIZATION"
        title="Functions and objects have references."
        description="useCallback caches a function reference. useMemo caches a calculated value. Together with memo, they can keep props stable."/>
      <DemoCard
        eyebrow="USECALLBACK"
        title="Stabilize a function prop"
        description="Change the parent state and compare the child render count in both modes.">
        <div className="experiment-toolbar">
          <div>
            <strong>Parent updates: {parentCount}</strong>
            <p>Callback executions: {callbackRuns}</p>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setParentCount((current) => current + 1)}>
            Update parent
          </button>
        </div>
        <div className="toggle-row">
          <span>Callback reference</span>
          <div
            className="segmented-control"
            role="group"
            aria-label="Callback reference mode">
            <button
              type="button"
              className={useStableCallback ? "segment-active" : ""}
              onClick={() => setUseStableCallback(true)}>
              useCallback
            </button>
            <button
              type="button"
              className={!useStableCallback ? "segment-active" : ""}
              onClick={() => setUseStableCallback(false)}>
              Inline function
            </button>
          </div>
        </div>
        <ActionChild onAction={action} />
        <div className="reference-stage">
          <div className="reference-row">
            <span>Memoized config object</span>
            <code>{actionConfig.type}</code>
          </div>
        </div>
      </DemoCard>
      <div className="explanation-grid">
        <div className="info-card">
          <span className="eyebrow">USECALLBACK</span>
          <h3>Cache the function reference</h3>
          <p>
            React can return the previous function when its dependencies haven't
            changed.
          </p>
        </div>
        <div className="info-card">
          <span className="eyebrow">USEMEMO</span>
          <h3>Cache the calculated value</h3>
          <p>
            React can reuse the previous calculation result until one of its
            dependencies changes.
          </p>
        </div>
      </div>
      <div className="warning-banner">
        <strong>Important:</strong>
        <span>
          useCallback does not stop JavaScript from creating a function during
          rendering. React can return the cached function reference when the
          dependencies are unchanged.
        </span>
      </div>
    </div>
  );
}
