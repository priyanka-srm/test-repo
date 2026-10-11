import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import LazyLoadingDemo from "./LazyLoadingDemo";

it("renders the lazy-loaded component", async () => {
  render(<LazyLoadingDemo />);

  expect(
    await screen.findByRole("heading", { name: "Lazy Profile" }),
  ).toBeInTheDocument();

  expect(
    screen.getByText("This component was loaded on demand."),
  ).toBeInTheDocument();
});
