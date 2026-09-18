import DemoCard from "../components/DemoCard";
import SectionHeader from "../components/SectionHeader";
const steps = [
  {
    number: "01",
    title: "Open React DevTools",
    text: "Open the Profiler tab in your browser's React Developer Tools.",
  },
  {
    number: "02",
    title: "Start recording",
    text: "Press Record, interact with the application, then stop recording.",
  },
  {
    number: "03",
    title: "Inspect the commit",
    text: "Look at which components rendered and how long the commit took.",
  },
  {
    number: "04",
    title: "Find the cause",
    text: "Check whether props changed, state changed, context changed, or expensive work ran.",
  },
  {
    number: "05",
    title: "Optimize selectively",
    text: "Apply memoization only when the profile shows that it can remove meaningful work.",
  },
];
export default function ProfilerPage() {
  return (
    <div className="page-container page-section">
      <SectionHeader
        eyebrow="06 · PROFILER"
        title="Measure before you optimize."
        description="The React DevTools Profiler helps you identify expensive renders and interactions instead of guessing."/>
      <div className="profiler-grid">
        {steps.map((step) => (
          <div className="profiler-step" key={step.number}>
            <span>{step.number}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
      <DemoCard
        eyebrow="WHAT TO LOOK FOR"
        title="A practical investigation checklist"
        description="Use this sequence during mentor reviews and real projects.">
        <div className="checklist">
          <label>
            <input type="checkbox" />
            <span>Is the interaction actually slow?</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Which component rendered unnecessarily?</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Did a prop reference change?</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Is the calculation genuinely expensive?</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Does the optimization reduce measurable work?</span>
          </label>
        </div>
      </DemoCard>
      <div className="warning-banner">
        <strong>Development note:</strong>
        <span>
          StrictMode can intentionally invoke rendering logic more than once
          during development. For accurate performance numbers, profile a
          production build rather than relying on development console counts.
        </span>
      </div>
    </div>
  );
}
