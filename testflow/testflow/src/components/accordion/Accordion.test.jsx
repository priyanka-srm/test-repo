import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./Accordion";

function TestAccordion() {
  return (
    <Accordion>
      <Accordion.Item value="first">
        <Accordion.Header>First section</Accordion.Header>
        <Accordion.Panel>First panel content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="second">
        <Accordion.Header>Second section</Accordion.Header>
        <Accordion.Panel>Second panel content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

describe("Accordion compound components", () => {
  it("starts with all panels closed", () => {
    render(<TestAccordion />);

    expect(screen.getByText("First panel content")).not.toBeVisible();
    expect(screen.getByText("Second panel content")).not.toBeVisible();
  });

  it("opens a panel when its header is clicked", () => {
    render(<TestAccordion />);

    fireEvent.click(screen.getByRole("button", { name: "First section" }));

    expect(screen.getByText("First panel content")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "First section" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the current panel when its header is clicked again", () => {
    render(<TestAccordion />);

    const header = screen.getByRole("button", { name: "First section" });

    fireEvent.click(header);
    fireEvent.click(header);

    expect(screen.getByText("First panel content")).not.toBeVisible();
  });

  it("keeps only one panel open at a time", () => {
    render(<TestAccordion />);

    fireEvent.click(screen.getByRole("button", { name: "First section" }));
    fireEvent.click(screen.getByRole("button", { name: "Second section" }));

    expect(screen.getByText("First panel content")).not.toBeVisible();
    expect(screen.getByText("Second panel content")).toBeVisible();
  });
});
