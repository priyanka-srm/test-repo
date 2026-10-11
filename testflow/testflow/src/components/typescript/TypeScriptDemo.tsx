import UserCard from "./UserCard";
import Counter from "./Counter";

function TypeScriptDemo() {
  return (
    <section>
      <h1>TypeScript Practice</h1>
      <UserCard name="Asha" role="Frontend Developer" />
      <UserCard name="Kavin" role="UI Tester" isActive={false} />
      <Counter />
    </section>
  );
}

export default TypeScriptDemo;
