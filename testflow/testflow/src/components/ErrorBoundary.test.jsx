
import { useState } from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppErrorBoundary from "./ErrorBoundary.jsx";

function BrokenChild() {
  throw new Error("Test render error");
}

function RecoverableChild({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("Test render error");
  }

  return <p>Recovered child content</p>;
}

function ResetHarness() {
  const [shouldThrow, setShouldThrow] = useState(true);

  return (
    <AppErrorBoundary
      onReset={() => setShouldThrow(false)}
    >
      <RecoverableChild shouldThrow={shouldThrow} />
    </AppErrorBoundary>
  );
}

describe("AppErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("shows the fallback when a child throws an error", () => {
    render(
      <AppErrorBoundary>
        <BrokenChild />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  test("calls onReset and recovers when Try again is clicked", async () => {
    const user = userEvent.setup();

    render(<ResetHarness />);

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(
      screen.getByText("Recovered child content"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
