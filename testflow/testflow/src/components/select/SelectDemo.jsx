import { useState } from "react";
import Select from "./Select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

function SelectDemo() {
  const [framework, setFramework] = useState("");

  return (
    <section>
      <h2>Reusable Select Demo</h2>

      <h3>Controlled Select</h3>
      <Select
        label="Choose a framework"
        options={options}
        value={framework}
        onChange={setFramework}
      />
      <p>Selected: {framework || "None"}</p>

      <h3>Uncontrolled Select</h3>
      <Select
        label="Choose a language"
        options={[
          { value: "js", label: "JavaScript" },
          { value: "ts", label: "TypeScript" },
        ]}
        defaultValue="js"
      />
    </section>
  );
}

export default SelectDemo;
