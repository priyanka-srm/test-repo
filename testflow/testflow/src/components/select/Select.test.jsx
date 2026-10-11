import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

describe("Select", () => {
  it("supports a controlled value and notifies the parent", () => {
    const onChange = vi.fn();

    render(
      <Select
        label="Framework"
        options={options}
        value="react"
        onChange={onChange}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Framework" });

    expect(select).toHaveValue("react");

    fireEvent.change(select, { target: { value: "vue" } });

    expect(onChange).toHaveBeenCalledWith("vue");
    expect(select).toHaveValue("react");
  });

  it("supports an uncontrolled value", () => {
    render(<Select label="Framework" options={options} defaultValue="react" />);

    const select = screen.getByRole("combobox", { name: "Framework" });

    fireEvent.change(select, { target: { value: "vue" } });

    expect(select).toHaveValue("vue");
  });

  it("supports uncontrolled usage without a default value", () => {
    render(<Select label="Framework" options={options} />);

    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveValue("");
  });

  it("can be disabled", () => {
    render(<Select label="Framework" options={options} disabled />);

    expect(screen.getByRole("combobox", { name: "Framework" })).toBeDisabled();
  });
});
