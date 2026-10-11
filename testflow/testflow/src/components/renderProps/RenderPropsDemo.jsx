import MouseTracker from "./MouseTracker";

function RenderPropsDemo() {
  return (
    <section>
      <h2>Render Props Demo</h2>

      <h3>1. Render prop</h3>
      <MouseTracker
        render={({ x, y }) => (
          <p>
            Render prop output: X = {x}, Y = {y}
          </p>
        )}
      />

      <h3>2. Function as children</h3>
      <MouseTracker>
        {({ x, y }) => (
          <p>
            Children function output: X = {x}, Y = {y}
          </p>
        )}
      </MouseTracker>
    </section>
  );
}

export default RenderPropsDemo;
