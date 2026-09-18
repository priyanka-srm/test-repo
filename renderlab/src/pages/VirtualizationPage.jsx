import { useMemo, useState } from "react";
import { List } from "react-window";
import DemoCard from "../components/DemoCard";
import SectionHeader from "../components/SectionHeader";
function VirtualRow({ index, style, items }) {
  const item = items[index];
  return (
    <div style={style} className="virtual-row">
      <span className="row-index">{String(index + 1).padStart(4, "0")}</span>
      <div>
        <strong>{item.title}</strong>
        <span>{item.detail}</span>
      </div>
      <span className="row-status">READY</span>
    </div>
  );
}
export default function VirtualizationPage() {
  const [mode, setMode] = useState("virtual");
  const items = useMemo(
    () =>
      Array.from({ length: 5000 }, (_, index) => ({
        title: `Performance record ${index + 1}`,
        detail: `Virtualization sample row ${index + 1}`,
      })),
    [],
  );
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="05 · VIRTUALIZATION"
        title="5,000 rows without 5,000 visible DOM nodes."
        description="Compare a normal .map() list with react-window's virtualized List. Virtualization keeps the viewport responsive by rendering only the rows needed around the visible area."/>
      <DemoCard
        eyebrow="5,000 ITEMS"
        title="Normal rendering vs virtualization"
        description="Switch modes and inspect the DOM in DevTools. The virtualized version keeps the rendered row count much smaller.">
        <div className="experiment-toolbar">
          <div>
            <strong>Dataset: {items.length.toLocaleString()} rows</strong>
            <p>
              Current strategy:{" "}
              {mode === "virtual" ? "Virtualized List" : "Normal map()"}
            </p>
          </div>
          <div
            className="segmented-control"
            role="group"
            aria-label="List rendering mode">
            <button
              type="button"
              className={mode === "virtual" ? "segment-active" : ""}
              onClick={() => setMode("virtual")}>
              Virtualized
            </button>
            <button
              type="button"
              className={mode === "normal" ? "segment-active" : ""}
              onClick={() => setMode("normal")}>
              Normal map
            </button>
          </div>
        </div>
        <div className="list-shell">
          {mode === "virtual" ? (
            <List
              rowComponent={VirtualRow}
              rowCount={items.length}
              rowHeight={64}
              rowProps={{ items }}
              className="virtual-list"/>
          ) : (
            <div className="normal-list">
              {items.map((item, index) => (
                <div className="virtual-row" key={item.title}>
                  <span className="row-index">
                    {String(index + 1).padStart(4, "0")}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <span className="row-status">READY</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DemoCard>
      <div className="metrics-row">
        <div className="metric-card">
          <span>Dataset</span>
          <strong>5,000</strong>
        </div>
        <div className="metric-card">
          <span>Virtual row height</span>
          <strong>64px</strong>
        </div>
        <div className="metric-card">
          <span>Strategy</span>
          <strong>{mode === "virtual" ? "Windowed" : "All rows"}</strong>
        </div>
      </div>
    </div>
  );
}
