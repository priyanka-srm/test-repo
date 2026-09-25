import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
  test("renders the TestFlow heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "TestFlow" })
    ).toBeInTheDocument();
  });

  test("renders the task board", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Your tasks" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add task" })
    ).toBeInTheDocument();
  });
});