export default function DemoCard({
  eyebrow,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section className={`demo-card ${className}`}>
      <div className="demo-card-header">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="demo-card-body">{children}</div>
    </section>
  );
}
