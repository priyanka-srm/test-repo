/* eslint-disable react-hooks/refs */
import { memo, useEffect, useRef, useState } from "react";
import DemoCard from "../components/DemoCard";
import RenderCount from "../components/RenderCount";
import SectionHeader from "../components/SectionHeader";
function NormalChild({ label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("NormalChild rendered");
  useEffect(() => {
    console.log("NormalChild mounted");
    return () => {
      console.log("NormalChild unmounted");
    };
  }, []);
  return (
    <div className="experiment-child">
      <div>
        <strong>Normal child</strong>
        <p>Parent renders cause this child to render again.</p>
      </div>
      <RenderCount value={renderCount.current} />
      <span className="result-tag result-tag-warning">Re-renders</span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
const MemoChild = memo(function MemoChild({ label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("MemoChild rendered");
  useEffect(() => {
    console.log("MemoChild mounted");
    return () => {
      console.log("MemoChild unmounted");
    };
  }, []);
  return (
    <div className="experiment-child">
      <div>
        <strong>Memoized child</strong>
        <p>Same primitive prop → parent updates can be skipped.</p>
      </div>
      <RenderCount value={renderCount.current} />
      <span className="result-tag result-tag-success">Memoized</span>
      <span className="sr-only">{label}</span>
    </div>
  );
});
function StatefulMemoChild() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log("StatefulMemoChild rendered");
  return (
    <div className="experiment-child">
      <div>
        <strong>Memo child with own state</strong>
        <p>memo does not block the component's own state updates.</p>
      </div>
      <RenderCount value={renderCount.current} />
      <button
        type="button"
        className="button button-small button-secondary"
        onClick={() => setCount((current) => current + 1)}>
        Own state: {count}
      </button>
    </div>
  );
}
export default function RerenderPage() {
  const [parentCount, setParentCount] = useState(0);
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="01 · RE-RENDER"
        title="A re-render is not a remount."
        description="Change the parent state and watch the normal child re-render while the memoized child can skip work when its props remain unchanged."/>
      <div className="metrics-row">
        <div className="metric-card">
          <span>Parent updates</span>
          <strong>{parentCount}</strong>
        </div>
        <div className="metric-card">
          <span>Stable prop</span>
          <strong>"RenderLab"</strong>
        </div>
        <div className="metric-card">
          <span>Mount status</span>
          <strong>Persistent</strong>
        </div>
      </div>
      <DemoCard
        eyebrow="LIVE EXPERIMENT"
        title="Parent cascade"
        description="The parent state changes. Both children receive the same primitive prop.">
        <div className="experiment-toolbar">
          <div>
            <strong>Parent state: {parentCount}</strong>
            <p>
              Click the button repeatedly and compare the two render counters.
            </p>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setParentCount((current) => current + 1)}>
            Re-render parent
          </button>
        </div>
        <div className="experiment-grid">
          <NormalChild label="Same prop: RenderLab" />
          <MemoChild label="Same prop: RenderLab" />
        </div>
      </DemoCard>
      <DemoCard
        eyebrow="IMPORTANT"
        title="memo does not freeze a component"
        description="React.memo only controls parent-driven renders when props are equal. Local state and context can still trigger renders.">
        <StatefulMemoChild />
      </DemoCard>
      <div className="explanation-grid">
        <div className="info-card">
          <span className="eyebrow">RE-RENDER</span>
          <h3>Function runs again</h3>
          <p>
            React evaluates the component again. This does not automatically
            mean the DOM is rebuilt from scratch.
          </p>
        </div>
        <div className="info-card">
          <span className="eyebrow">REMOUNT</span>
          <h3>Component instance is replaced</h3>
          <p>
            The previous instance unmounts and a new instance mounts. State and
            effects associated with the old instance are lost.
          </p>
        </div>
      </div>
    </div>
  );
}
