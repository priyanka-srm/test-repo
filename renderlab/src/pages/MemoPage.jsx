/* eslint-disable react-hooks/refs */
import { memo, useMemo, useRef, useState } from "react";
import DemoCard from "../components/DemoCard";
import RenderCount from "../components/RenderCount";
import SectionHeader from "../components/SectionHeader";
const MemoizedProfile = memo(function MemoizedProfile({ profile }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("MemoizedProfile rendered");
  return (
    <div className="reference-preview">
      <div className="avatar" aria-hidden="true">
        {profile.name.charAt(0)}
      </div>
      <div>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </div>
      <RenderCount label="Child renders" value={renderCount.current} />
    </div>
  );
});
export default function MemoPage() {
  const [parentCount, setParentCount] = useState(0);
  const [breakMemo, setBreakMemo] = useState(false);
  const stableProfile = useMemo(
    () => ({
      name: "RenderLab",
      role: "Performance experiment",
    }),
    [],
  );
  const profile = breakMemo
    ? {
        name: "RenderLab",
        role: "Performance experiment",
      }
    : stableProfile;
  const expensiveResult = useMemo(() => {
    let total = 0;
    for (let index = 0; index < 500000; index += 1) {
      total += Math.sqrt(index) * Math.sin(index);
    }
    return Math.abs(total);
  }, []);
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="03 · MEMOIZATION"
        title="Functions and objects have references."
        description="useCallback caches a function reference. useMemo caches a calculated value. Together with memo, they can keep props stable."/>
      <DemoCard
        eyebrow="USEMEMO + REACT.MEMO"
        title="Stable object reference"
        description="React.memo compares props by reference. A memoized object can remain stable between parent renders.">
        <div className="experiment-toolbar">
          <div>
            <strong>Parent state: {parentCount}</strong>
            <p>
              Change the parent and watch whether the memoized child needs to
              render again.
            </p>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setParentCount((current) => current + 1)}>
            Update parent
          </button>
        </div>
        <div className="experiment-toolbar">
          <div>
            <strong>Reference mode</strong>
            <p>
              {breakMemo
                ? "A new object is created on every parent render."
                : "useMemo keeps the same object reference."}
            </p>
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setBreakMemo((current) => !current)}>
            {breakMemo ? "Use stable reference" : "Break memoization"}
          </button>
        </div>
        <MemoizedProfile profile={profile} />
        <div className="explanation-grid">
          <div className="info-card">
            <span className="eyebrow">STABLE</span>
            <h3>Same object reference</h3>
            <p>
              When the object reference stays the same, React.memo can skip the
              child when the parent updates.
            </p>
          </div>
          <div className="info-card">
            <span className="eyebrow">BROKEN</span>
            <h3>New object reference</h3>
            <p>
              A newly created object is different by reference, even when its
              values look identical.
            </p>
          </div>
        </div>
      </DemoCard>
      <DemoCard
        eyebrow="USEMEMO"
        title="Cache an expensive calculation"
        description="useMemo can reuse a calculated value until one of its dependencies changes.">
        <div className="metrics-row">
          <div className="metric-card">
            <span>Calculation workload</span>
            <strong>500,000</strong>
          </div>
          <div className="metric-card">
            <span>Cached result</span>
            <strong>{expensiveResult.toFixed(2)}</strong>
          </div>
        </div>
        <div className="info-card">
          <span className="eyebrow">IMPORTANT</span>
          <h3>Don't use useMemo everywhere.</h3>
          <p>
            Memoization has its own cost. Profile first and use it when the
            calculation or reference stability actually matters.
          </p>
        </div>
      </DemoCard>
    </div>
  );
}
