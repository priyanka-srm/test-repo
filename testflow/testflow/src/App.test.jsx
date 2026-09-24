

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

  test("renders the start testing button", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Start Testing" })
    ).toBeInTheDocument();
  });
});