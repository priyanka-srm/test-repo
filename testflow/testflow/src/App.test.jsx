import {
  act,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import App from "./App";
import useTaskFilters from "./hooks/useTaskFilters";

describe("useTaskFilters", () => {
  const tasks = [
    {
      id: 1,
      title: "Write user interaction tests",
      description: "Practice realistic user interactions.",
      completed: false,
    },
    {
      id: 2,
      title: "Review Vitest configuration",
      description: "Understand the testing environment.",
      completed: true,
    },
    {
      id: 3,
      title: "Practice mocked API states",
      description: "Cover loading and error states.",
      completed: false,
    },
  ];

  test("returns all tasks when no filters are active", () => {
    const { result } = renderHook(() =>
      useTaskFilters(tasks, "", "all")
    );

    expect(result.current).toHaveLength(3);
  });

  test("filters tasks by search term", () => {
    const { result } = renderHook(() =>
      useTaskFilters(tasks, "interaction", "all")
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe(
      "Write user interaction tests"
    );
  });

  test("filters active tasks", () => {
    const { result } = renderHook(() =>
      useTaskFilters(tasks, "", "active")
    );

    expect(result.current).toHaveLength(2);
    expect(result.current.every((task) => !task.completed)).toBe(true);
  });

  test("filters completed tasks", () => {
    const { result } = renderHook(() =>
      useTaskFilters(tasks, "", "completed")
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe(
      "Review Vitest configuration"
    );
  });

  test("combines search and status filters", () => {
    const { result } = renderHook(() =>
      useTaskFilters(tasks, "mocked", "active")
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe(
      "Practice mocked API states"
    );
  });

  test("updates filter inputs with act", () => {
    function HookHarness() {
      const [searchTerm, setSearchTerm] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");

      const filteredTasks = useTaskFilters(
        tasks,
        searchTerm,
        statusFilter
      );

      return (
        <div>
          <span data-testid="result-count">
            {filteredTasks.length}
          </span>

          <button
            type="button"
            onClick={() => setSearchTerm("mocked")}
          >
            Search mocked
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("active")}
          >
            Active only
          </button>
        </div>
      );
    }

    const { result } = renderHook(() => {
      const [searchTerm, setSearchTerm] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");

      return {
        filteredTasks: useTaskFilters(
          tasks,
          searchTerm,
          statusFilter
        ),
        setSearchTerm,
        setStatusFilter,
      };
    });

    expect(result.current.filteredTasks).toHaveLength(3);

    act(() => {
      result.current.setSearchTerm("mocked");
    });

    expect(result.current.filteredTasks).toHaveLength(1);

    act(() => {
      result.current.setStatusFilter("active");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].title).toBe(
      "Practice mocked API states"
    );

    void HookHarness;
  });
});

describe("TestFlow task management", () => {
  test("renders the dashboard", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "TestFlow" }))
      .toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Your tasks",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Testing Mode")
    ).toBeInTheDocument();
  });

  test("shows the initial active task count", () => {
    render(<App />);

    expect(screen.getByText("Active tasks")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("filters tasks by search", async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Search tasks",
    });

    await user.type(searchInput, "mocked");

    expect(
      screen.getByRole("heading", {
        name: "Practice mocked API states",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Write user interaction tests",
      })
    ).not.toBeInTheDocument();
  });

  test("filters active tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Active",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Review React Testing Library queries",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Write user interaction tests",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Review Vitest configuration",
      })
    ).not.toBeInTheDocument();
  });

  test("filters completed tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Completed",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Review Vitest configuration",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Write user interaction tests",
      })
    ).not.toBeInTheDocument();
  });

  test("combines search and status filters", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("searchbox", {
        name: "Search tasks",
      }),
      "mocked"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Active",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Practice mocked API states",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Review Vitest configuration",
      })
    ).not.toBeInTheDocument();
  });

  test("marks an active task as completed", async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskCard = screen
      .getByRole("heading", {
        name: "Write user interaction tests",
      })
      .closest("article");

    expect(taskCard).not.toBeNull();

    await user.click(
      within(taskCard).getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      })
    );

    expect(
      within(taskCard).getByRole("button", {
        name: "Mark Write user interaction tests as active",
      })
    ).toBeInTheDocument();
  });

  test("filters newly completed tasks correctly", async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskCard = screen
      .getByRole("heading", {
        name: "Write user interaction tests",
      })
      .closest("article");

    expect(taskCard).not.toBeNull();

    await user.click(
      within(taskCard).getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Completed",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Write user interaction tests",
      })
    ).toBeInTheDocument();
  });

  test("deletes a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Write user interaction tests",
      })
    ).toBeInTheDocument();

    const taskCard = screen
      .getByRole("heading", {
        name: "Write user interaction tests",
      })
      .closest("article");

    expect(taskCard).not.toBeNull();

    await user.click(
      within(taskCard).getByRole("button", {
        name: "Delete Write user interaction tests",
      })
    );

    expect(
      screen.queryByRole("heading", {
        name: "Write user interaction tests",
      })
    ).not.toBeInTheDocument();
  });

  test("opens the add task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: "Task title",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: "Description",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: "Priority",
      })
    ).toBeInTheDocument();
  });

  test("shows validation errors for an empty task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      })
    );

    expect(
      screen.getByText("Task title is required.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Description is required.")
    ).toBeInTheDocument();
  });

  test("shows validation error when only the title is provided", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Task title",
      }),
      "Prepare interview notes"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      })
    );

    expect(
      screen.getByText("Description is required.")
    ).toBeInTheDocument();
  });

  test("creates a new task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Task title",
      }),
      "Prepare interview notes"
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Description",
      }),
      "Review React testing concepts."
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "Priority",
      }),
      "High"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Prepare interview notes",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Review React testing concepts.")
    ).toBeInTheDocument();
  });

  test("closes the add task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: "Task title",
      })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Close",
      })
    );

    expect(
      screen.queryByRole("textbox", {
        name: "Task title",
      })
    ).not.toBeInTheDocument();
  });

  test("keeps the task form open when validation fails", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: "Task title",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Task title is required.")
    ).toBeInTheDocument();
  });

  test("updates the active task count after completion", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText("3")).toBeInTheDocument();

    const taskCard = screen
      .getByRole("heading", {
        name: "Write user interaction tests",
      })
      .closest("article");

    expect(taskCard).not.toBeNull();

    await user.click(
      within(taskCard).getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      })
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});