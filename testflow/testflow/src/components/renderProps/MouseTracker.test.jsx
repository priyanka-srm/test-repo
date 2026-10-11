import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MouseTracker from "./MouseTracker";

describe("MouseTracker", () => {
  it("renders content through the render prop", () => {
    render(
      <MouseTracker
        render={({ x, y }) => (
          <p>
            Position: {x}, {y}
          </p>
        )}
      />,
    );

    expect(screen.getByText("Position: 0, 0")).toBeInTheDocument();
  });

  it("renders content through function as children", () => {
    render(
      <MouseTracker>
        {({ x, y }) => (
          <p>
            Coordinates: {x}, {y}
          </p>
        )}
      </MouseTracker>,
    );

    expect(screen.getByText("Coordinates: 0, 0")).toBeInTheDocument();
  });

  it("updates coordinates when the mouse moves", () => {
    render(
      <MouseTracker
        render={({ x, y }) => (
          <p>
            Position: {x}, {y}
          </p>
        )}
      />,
    );

    const tracker = screen.getByTestId("mouse-tracker");

    tracker.getBoundingClientRect = () => ({
      left: 10,
      top: 20,
      right: 210,
      bottom: 170,
      width: 200,
      height: 150,
      x: 10,
      y: 20,
      toJSON: () => ({}),
    });

    fireEvent.mouseMove(tracker, { clientX: 50, clientY: 70 });

    expect(screen.getByText("Position: 40, 50")).toBeInTheDocument();
  });
});
