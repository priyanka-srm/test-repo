const bars = [42, 68, 54, 82, 63, 91, 74, 88, 58, 76, 94, 70];
export default function HeavyChart() {
  return (
    <div className="chart-panel">
      <div className="chart-header">
        <div>
          <span className="eyebrow">LAZY MODULE</span>
          <h3>Interaction cost snapshot</h3>
        </div>
        <span className="result-tag result-tag-success">Loaded on demand</span>
      </div>
      <div
        className="chart"
        role="img"
        aria-label="Bar chart showing varying performance measurements"q>
        {bars.map((height, index) => (
          <div className="chart-column" key={index}>
            <div className="chart-bar" style={{ height: `${height}%` }} />
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
