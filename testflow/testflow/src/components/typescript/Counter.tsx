import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  function handleIncrement(): void {
    setCount((previousCount) => previousCount + 1);
  }

  function handleReset(): void {
    setCount(0);
  }

  return (
    <section>
      <p>Count: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}

export default Counter;
