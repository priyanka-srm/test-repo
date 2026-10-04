import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import App from "./App";
import TaskCard from "./components/TaskCard/TaskCard";
import useTaskFilters from "./hooks/useTaskFilters";
import { createTask, deleteTask, getTasks, updateTask } from "./data/tasks";

vi.mock("./data/tasks", () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

const mockTasks = [
  {
    id: 1,
    title: "Review Vitest configuration",
    description: "Check the current test setup.",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Write user interaction tests",
    description: "Cover important user workflows.",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Document testing strategy",
    description: "Add notes about the testing approach.",
    priority: "Low",
    completed: false,
  },
];

function mockSuccessfulTasks() {
  getTasks.mockResolvedValue(mockTasks);

  createTask.mockResolvedValue({
    id: 4,
    title: "New task",
    description: "New task description",
    priority: "Medium",
    completed: false,
  });

  updateTask.mockResolvedValue({});
  deleteTask.mockResolvedValue({});
}

beforeEach(() => {
  vi.clearAllMocks();
  mockSuccessfulTasks();
});

describe("useTaskFilters", () => {
  test("returns all tasks when no filters are applied", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks, "", "all"));

    expect(result.current).toEqual(mockTasks);
  });

  test("filters tasks by title search", () => {
    const { result } = renderHook(() =>
      useTaskFilters(mockTasks, "vitest", "all"),
    );

    expect(result.current).toEqual([mockTasks[0]]);
  });

  test("filters tasks by description search", () => {
    const { result } = renderHook(() =>
      useTaskFilters(mockTasks, "important", "all"),
    );

    expect(result.current).toEqual([mockTasks[1]]);
  });

  test("filters active tasks", () => {
    const { result } = renderHook(() =>
      useTaskFilters(mockTasks, "", "active"),
    );

    expect(result.current).toEqual([mockTasks[1], mockTasks[2]]);
  });

  test("filters completed tasks", () => {
    const { result } = renderHook(() =>
      useTaskFilters(mockTasks, "", "completed"),
    );

    expect(result.current).toEqual([mockTasks[0]]);
  });

  test("updates filtered tasks when filter inputs change", () => {
    const { result, rerender } = renderHook(
      ({ search, status }) => useTaskFilters(mockTasks, search, status),
      {
        initialProps: {
          search: "",
          status: "all",
        },
      },
    );

    expect(result.current).toEqual(mockTasks);

    rerender({
      search: "vitest",
      status: "all",
    });

    expect(result.current).toEqual([mockTasks[0]]);

    rerender({
      search: "",
      status: "active",
    });

    expect(result.current).toEqual([mockTasks[1], mockTasks[2]]);
  });
});

describe("TestFlow task management", () => {
  test("renders task dashboard", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "Your tasks",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Review Vitest configuration")).toBeInTheDocument();

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(screen.getByText("Document testing strategy")).toBeInTheDocument();
  });

  test("shows loading state while tasks are loading", async () => {
    let resolveTasks;

    getTasks.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveTasks = resolve;
        }),
    );

    render(<App />);

    expect(
      screen.getByRole("status", {
        name: "Loading tasks",
      }),
    ).toBeInTheDocument();

    await act(async () => {
      resolveTasks(mockTasks);
    });

    expect(
      await screen.findByText("Review Vitest configuration"),
    ).toBeInTheDocument();
  });

  test("calls getTasks when the app loads", async () => {
    render(<App />);

    await screen.findByText("Review Vitest configuration");

    expect(getTasks).toHaveBeenCalledTimes(1);
    expect(getTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  test("opens the add task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Add a task",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Task title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority")).toBeInTheDocument();
  });

  test("validates required task title", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(
      screen.getByLabelText("Description"),
      "A valid description",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(screen.getByText("Task title is required.")).toBeInTheDocument();

    expect(createTask).not.toHaveBeenCalled();
  });

  test("validates required description", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "New task");

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(screen.getByText("Description is required.")).toBeInTheDocument();

    expect(createTask).not.toHaveBeenCalled();
  });

  test("creates a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "New task");

    await user.type(
      screen.getByLabelText("Description"),
      "New task description",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(createTask).toHaveBeenCalledTimes(1);

    expect(await screen.findByText("New task")).toBeInTheDocument();
  });

  test("calls createTask with the correct task data", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "New task");

    await user.type(
      screen.getByLabelText("Description"),
      "New task description",
    );

    await user.selectOptions(screen.getByLabelText("Priority"), "High");

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({
        title: "New task",
        description: "New task description",
        completed: false,
        priority: "High",
      });
    });
  });

  test("renders the created task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "New task");

    await user.type(
      screen.getByLabelText("Description"),
      "New task description",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(await screen.findByText("New task")).toBeInTheDocument();

    expect(screen.getByText("New task description")).toBeInTheDocument();
  });

  test("closes the add task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Add a task",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(
      screen.queryByRole("dialog", {
        name: "Add a task",
      }),
    ).not.toBeInTheDocument();
  });

  test("toggles task completion", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const toggleButton = screen.getByRole("button", {
      name: "Mark Write user interaction tests as complete",
    });

    await user.click(toggleButton);

    expect(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as active",
      }),
    ).toBeInTheDocument();
  });

  test("calls updateTask with the correct task data", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    );

    expect(updateTask).toHaveBeenCalledWith(2, {
      completed: true,
    });
  });

  test("updates completion state in the UI", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    );

    expect(
      await screen.findByRole("button", {
        name: "Mark Write user interaction tests as active",
      }),
    ).toBeInTheDocument();
  });

  test("toggles a completed task back to active", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Review Vitest configuration as active",
      }),
    );

    expect(updateTask).toHaveBeenCalledWith(1, {
      completed: false,
    });

    expect(
      await screen.findByRole("button", {
        name: "Mark Review Vitest configuration as complete",
      }),
    ).toBeInTheDocument();
  });

  test("rolls back completion when update fails", async () => {
    const user = userEvent.setup();

    updateTask.mockRejectedValueOnce(new Error("Update failed"));

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    );

    expect(
      await screen.findByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    ).toBeInTheDocument();
  });

  test("deletes a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const deleteButton = screen.getByRole("button", {
      name: "Delete Write user interaction tests",
    });

    await user.click(deleteButton);

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();
  });

  test("calls deleteTask with the correct id", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Delete Write user interaction tests",
      }),
    );

    expect(deleteTask).toHaveBeenCalledWith(2);
  });

  test("removes the deleted task from the UI", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Delete Write user interaction tests",
      }),
    );

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();
  });

  test("rolls back deletion when delete fails", async () => {
    const user = userEvent.setup();

    deleteTask.mockRejectedValueOnce(new Error("Delete failed"));

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Delete Write user interaction tests",
      }),
    );

    expect(
      await screen.findByText("Write user interaction tests"),
    ).toBeInTheDocument();
  });

  test("filters tasks by search", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.type(screen.getByLabelText("Search tasks"), "Vitest");

    expect(screen.getByText("Review Vitest configuration")).toBeInTheDocument();

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Document testing strategy"),
    ).not.toBeInTheDocument();
  });

  test("filters active tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.selectOptions(
      screen.getByLabelText("Filter by status"),
      "active",
    );

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(screen.getByText("Document testing strategy")).toBeInTheDocument();
  });

  test("filters completed tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.selectOptions(
      screen.getByLabelText("Filter by status"),
      "completed",
    );

    expect(screen.getByText("Review Vitest configuration")).toBeInTheDocument();

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Document testing strategy"),
    ).not.toBeInTheDocument();
  });

  test("shows the active task count", async () => {
    render(<App />);

    await screen.findByText("Review Vitest configuration");

    expect(screen.getByText("Active tasks")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("shows API error state", async () => {
    getTasks.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to load tasks.",
    );
  });

  test("shows empty state when there are no tasks", async () => {
    getTasks.mockResolvedValueOnce([]);

    render(<App />);

    expect(await screen.findByText("No tasks found")).toBeInTheDocument();
  });

  test("changes task priority when creating a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "High priority task");

    await user.type(screen.getByLabelText("Description"), "Important task");

    await user.selectOptions(screen.getByLabelText("Priority"), "High");

    expect(screen.getByLabelText("Priority")).toHaveValue("High");
  });

  test("searches tasks by description", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.type(screen.getByLabelText("Search tasks"), "important");

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("shows no tasks when filters match nothing", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.type(screen.getByLabelText("Search tasks"), "does not exist");

    expect(await screen.findByText("No tasks found")).toBeInTheDocument();
  });

  test("switches back to all tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.selectOptions(
      screen.getByLabelText("Filter by status"),
      "completed",
    );

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Filter by status"), "all");

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(screen.getByText("Document testing strategy")).toBeInTheDocument();
  });

  test("shows an error when task creation fails", async () => {
    const user = userEvent.setup();

    createTask.mockRejectedValueOnce(new Error("Create failed"));

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "Failed task");

    await user.type(
      screen.getByLabelText("Description"),
      "This task should fail.",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(
      await screen.findByText("Unable to create task. Please try again."),
    ).toBeInTheDocument();
  });

  test("does not create a task when title contains only spaces", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(screen.getByLabelText("Task title"), "   ");

    await user.type(screen.getByLabelText("Description"), "Valid description");

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(screen.getByText("Task title is required.")).toBeInTheDocument();

    expect(createTask).not.toHaveBeenCalled();
  });

  test("renders the TaskCard snapshot", () => {
    const { container } = render(
      <TaskCard task={mockTasks[1]} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
