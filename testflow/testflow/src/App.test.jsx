import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("allows a user to create a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Add task" })
    );

    await user.type(
      screen.getByLabelText("Task title"),
      "Learn userEvent"
    );

    await user.type(
      screen.getByLabelText("Description"),
      "Practice realistic user interactions."
    );

    await user.selectOptions(
      screen.getByLabelText("Priority"),
      "High"
    );

    await user.click(
      screen.getByRole("button", { name: "Create task" })
    );

    expect(
      screen.getByRole("heading", { name: "Learn userEvent" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Practice realistic user interactions.")
    ).toBeInTheDocument();
  });

  test("allows a user to delete a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    const deleteButton = screen.getByRole("button", {
      name: "Delete Review React Testing Library queries",
    });

    await user.click(deleteButton);

    expect(
      screen.queryByRole("heading", {
        name: "Review React Testing Library queries",
      })
    ).not.toBeInTheDocument();
  });

  test("shows a validation error when the task title is empty", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Add task" })
    );

    await user.click(
      screen.getByRole("button", { name: "Create task" })
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task title is required."
    );

    expect(
      screen.getByRole("button", { name: "Create task" })
    ).toBeInTheDocument();
  });

  test("clears the validation error when the user enters a title", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Add task" })
    );

    await user.click(
      screen.getByRole("button", { name: "Create task" })
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task title is required."
    );

    await user.type(
      screen.getByLabelText("Task title"),
      "Learn form validation"
    );

    expect(
      screen.queryByRole("alert")
    ).not.toBeInTheDocument();
  });

  test("allows a user to mark an active task as complete", async () => {
    const user = userEvent.setup();

    render(<App />);

    const task = screen
      .getByRole("heading", {
        name: "Review React Testing Library queries",
      })
      .closest("article");

    expect(task).not.toBeNull();

    expect(
      within(task).getByLabelText("Active")
    ).toBeInTheDocument();

    expect(
      within(task).getByRole("button", {
        name: "Mark Review React Testing Library queries as complete",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();

    await user.click(
      within(task).getByRole("button", {
        name: "Mark Review React Testing Library queries as complete",
      })
    );

    expect(
      within(task).getByLabelText("Completed")
    ).toBeInTheDocument();

    expect(
      within(task).getByRole("button", {
        name: "Mark Review React Testing Library queries as active",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("allows a user to mark a completed task as active again", async () => {
    const user = userEvent.setup();

    render(<App />);

    const task = screen
      .getByRole("heading", {
        name: "Review Vitest configuration",
      })
      .closest("article");

    expect(task).not.toBeNull();

    expect(
      within(task).getByLabelText("Completed")
    ).toBeInTheDocument();

    await user.click(
      within(task).getByRole("button", {
        name: "Mark Review Vitest configuration as active",
      })
    );

    expect(
      within(task).getByLabelText("Active")
    ).toBeInTheDocument();

    expect(
      within(task).getByRole("button", {
        name: "Mark Review Vitest configuration as complete",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("4")).toBeInTheDocument();
  });
});