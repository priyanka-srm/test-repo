import GenericList from "./GenericList";

const developers = [
  { id: 1, name: "Asha", skill: "React" },
  { id: 2, name: "Kavin", skill: "TypeScript" },
];

const topics = ["Props", "State", "Generics"];

function GenericListDemo() {
  return (
    <section>
      <h2>Generic Component Demo</h2>

      <h3>Developer list</h3>
      <GenericList
        items={developers}
        getKey={(developer) => developer.id}
        renderItem={(developer) => (
          <span>
            {developer.name} — {developer.skill}
          </span>
        )}
      />

      <h3>Topic list</h3>
      <GenericList
        items={topics}
        getKey={(topic) => topic}
        renderItem={(topic) => <span>{topic}</span>}
      />
    </section>
  );
}

export default GenericListDemo;
