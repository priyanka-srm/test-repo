import { memo, useMemo, useState } from "react";
import DemoCard from "../components/DemoCard";
import RenderCount from "../components/RenderCount";
import SectionHeader from "../components/SectionHeader";
const MemoizedProfile = memo(function MemoizedProfile({ profile }) {
  return (
    <div className="reference-preview">
      <div className="avatar" aria-hidden="true">
        {profile.name.charAt(0)}
      </div>
      <div>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </div>
      <RenderCount label="Child renders" />
    </div>
  );
});
function expensiveCalculation(size) {
  let total = 0;
  const iterations = size * 150000;
  for (let index = 0; index < iterations; index += 1) {
    total += Math.sqrt(index + 1) % 17;
  }
  return total.toFixed(2);
}
export default function MemoPage() {
  const [themeTick, setThemeTick] = useState(0);
  const [workload, setWorkload] = useState(3);
  const [stableReference, setStableReference] = useState(true);
  const profile = useMemo(
    () => ({
      name: "RenderLab",
      role: "Performance experiment",
    }),
    [],
  );
  const inlineProfile = {
    name: "RenderLab",
    role: "Performance experiment",
  };
  const calculatedValue = useMemo(
    () => expensiveCalculation(workload),
    [workload],
  );
  const suppliedProfile = stableReference ? profile : inlineProfile;
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="02 · REACT.MEMO"
        title="Same props can mean less work."
        description="React.memo compares props by reference. Stable primitive or object references let a memoized child skip parent-driven renders."/>
      <DemoCard
        eyebrow="REFERENCE EQUALITY"
        title="Break memoization on purpose"
        description="Toggle the reference mode, then change the unrelated parent state.">
        <div className="experiment-toolbar">
          <div>
            <strong>Parent state: {themeTick}</strong>
            <p>The profile content does not visually depend on this state.</p>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setThemeTick((current) => current + 1)}>
            Update parent
          </button>
        </div>
        <div className="toggle-row">
          <span>Object reference</span>
          <div
            className="segmented-control"
            role="group"
            aria-label="Object reference mode">
            <button
              type="button"
              className={stableReference ? "segment-active" : ""}
              onClick={() => setStableReference(true)}>
              Stable
            </button>
            <button
              type="button"
              className={!stableReference ? "segment-active" : ""}
              onClick={() => setStableReference(false)}>
              New each render
            </button>
          </div>
        </div>
        <div className="reference-stage">
          <MemoizedProfile profile={suppliedProfile} />
        </div>
        <div className="code-explanation">
          <div>
            <span className="result-tag result-tag-success">STABLE</span>
            <p>
              <code>useMemo(() =&gt; object, [])</code> keeps the same object
              reference.
            </p>
          </div>
          <div>
            <span className="result-tag result-tag-warning">BROKEN</span>
            <p>
              <code>{"{ ... }"}</code> creates a new object on every render.
            </p>
          </div>
        </div>
      </DemoCard>
      <DemoCard
        eyebrow="EXPENSIVE CALCULATION"
        title="useMemo caches calculation results"
        description="The calculation runs again when workload changes, but unrelated parent updates can reuse the cached result.">
        <div className="calculation-layout">
          <div className="control-panel">
            <label htmlFor="workload">
              Workload: <strong>{workload}</strong>
            </label>
            <input
              id="workload"
              type="range"
              min="1"
              max="8"
              value={workload}
              onChange={(event) => setWorkload(Number(event.target.value))}/>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setThemeTick((current) => current + 1)}>
              Unrelated parent update
            </button>
          </div>
          <div className="calculation-result">
            <span>Cached result</span>
            <strong>{calculatedValue}</strong>
            <small>Dependency: workload</small>
          </div>
        </div>
      </DemoCard>
      <div className="warning-banner">
        <strong>Don't use useMemo everywhere.</strong>
        <span>
          If a calculation is already cheap, memoization can add complexity
          without a meaningful benefit.
        </span>
      </div>
    </div>
  );
}
