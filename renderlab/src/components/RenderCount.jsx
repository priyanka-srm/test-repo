export default function RenderCount({
  label = "Render count",
  value = 1,
}) {
  return (
    <div
      className="render-counter"
      aria-label={`${label}: ${value}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
