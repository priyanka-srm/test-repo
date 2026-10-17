import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getTask } from "../data/tasks";
import TaskDetailPage from "./TaskDetailPage";

vi.mock("../data/tasks", () => ({
  getTask: vi.fn(),
}));

const mockTask = {
  id: "2",
  title: "Write user interaction tests",
  description: "Test task details and navigation.",
  priority: "High",
  completed: false,
};

function renderTaskDetail(initialEntry = "/tasks/2") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/" element={<h1>Task list</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("TaskDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state while fetching task details", async () => {
    let resolveRequest;

    getTask.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderTaskDetail();

    expect(screen.getByRole("status")).toHaveTextContent("Loading task...");

    resolveRequest(mockTask);

    expect(
      await screen.findByRole("heading", {
        name: "Write user interaction tests",
      }),
    ).toBeInTheDocument();
  });

  it("renders task details after a successful API response", async () => {
    getTask.mockResolvedValue(mockTask);

    renderTaskDetail();

    expect(
      await screen.findByRole("heading", {
        name: "Write user interaction tests",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Test task details and navigation."),
    ).toBeInTheDocument();

    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(getTask).toHaveBeenCalledWith(
      "2",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("shows a not-found message when the task does not exist", async () => {
    getTask.mockRejectedValue(new Error("Task not found"));

    renderTaskDetail("/tasks/999");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Task not found.",
    );

    expect(getTask).toHaveBeenCalledWith("999", expect.any(Object));
  });

  it("shows a generic error when the API request fails", async () => {
    getTask.mockRejectedValue(new Error("Network error"));

    renderTaskDetail();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to load task details.",
    );
  });

  it("navigates back to the task list", async () => {
    const user = userEvent.setup();

    getTask.mockResolvedValue(mockTask);

    renderTaskDetail();

    await screen.findByRole("heading", {
      name: "Write user interaction tests",
    });

    await user.click(screen.getByRole("link", { name: "Back to tasks" }));

    expect(
      screen.getByRole("heading", { name: "Task list" }),
    ).toBeInTheDocument();
  });
});
