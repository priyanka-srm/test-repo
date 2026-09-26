import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import App from "./App";
import useTaskFilters from "./hooks/useTaskFilters";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./data/tasks";

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

describe("useTaskFilters", () => {
  test("returns all tasks when no filters are applied", () => {
    function Wrapper() {
      const filteredTasks = useTaskFilters(mockTasks);

      return (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Document testing strategy"),
    ).toBeInTheDocument();
  });

  test("filters tasks by title search", () => {
    function Wrapper() {
      const [search, setSearch] = useState("");

      const filteredTasks = useTaskFilters(
        mockTasks,
        search,
        "all",
      );

      return (
        <>
          <button onClick={() => setSearch("interaction")}>
            Search
          </button>

          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    act(() => {
      screen.getByRole("button", { name: "Search" }).click();
    });

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("filters tasks by description search", () => {
    function Wrapper() {
      const filteredTasks = useTaskFilters(
        mockTasks,
        "testing approach",
        "all",
      );

      return (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Document testing strategy"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("filters active tasks", () => {
    function Wrapper() {
      const filteredTasks = useTaskFilters(
        mockTasks,
        "",
        "active",
      );

      return (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Document testing strategy"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("filters completed tasks", () => {
    function Wrapper() {
      const filteredTasks = useTaskFilters(
        mockTasks,
        "",
        "completed",
      );

      return (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Document testing strategy"),
    ).not.toBeInTheDocument();
  });

  test("updates when filter state changes", () => {
    function Wrapper() {
      const [search, setSearch] = useState("");
      const [status, setStatus] = useState("all");

      const filteredTasks = useTaskFilters(
        mockTasks,
        search,
        status,
      );

      return (
        <>
          <button onClick={() => setSearch("interaction")}>
            Search interaction
          </button>

          <button onClick={() => setSearch("")}>
            Clear search
          </button>

          <button onClick={() => setStatus("completed")}>
            Show completed
          </button>

          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </>
      );
    }

    render(<Wrapper />);

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    act(() => {
      screen
        .getByRole("button", {
          name: "Search interaction",
        })
        .click();
    });

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();

    act(() => {
      screen
        .getByRole("button", {
          name: "Clear search",
        })
        .click();
    });

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    act(() => {
      screen
        .getByRole("button", {
          name: "Show completed",
        })
        .click();
    });

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();
  });
});

describe("TestFlow task management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSuccessfulTasks();
  });

  test("renders the task dashboard", async () => {
    render(<App />);

    expect(
      await screen.findByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();
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

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await act(async () => {
      resolveTasks(mockTasks);
    });

    expect(
      await screen.findByText("Review Vitest configuration"),
    ).toBeInTheDocument();
  });

  test("calls getTasks when the app loads", async () => {
    render(<App />);

    await waitFor(() => {
      expect(getTasks).toHaveBeenCalledTimes(1);
    });
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
      screen.getByLabelText("Task title"),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Description"),
    ).toBeInTheDocument();
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

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(
      screen.getByText("Task title is required."),
    ).toBeInTheDocument();
  });

  test("validates required task description", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(
      screen.getByLabelText("Task title"),
      "New task",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(
      screen.getByText("Description is required."),
    ).toBeInTheDocument();
  });

  test("creates a task from the add task form", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(
      screen.getByLabelText("Task title"),
      "New task",
    );

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

    await user.type(
      screen.getByLabelText("Task title"),
      "API interaction task",
    );

    await user.type(
      screen.getByLabelText("Description"),
      "Test createTask API interaction.",
    );

    await user.selectOptions(
      screen.getByLabelText("Priority"),
      "High",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(createTask).toHaveBeenCalledWith({
      title: "API interaction task",
      description: "Test createTask API interaction.",
      priority: "High",
      completed: false,
    });
  });

  test("renders the created task after creation", async () => {
    const user = userEvent.setup();

    createTask.mockResolvedValue({
      id: 4,
      title: "Priority testing task",
      description: "Check created task rendering.",
      priority: "High",
      completed: false,
    });

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    await user.type(
      screen.getByLabelText("Task title"),
      "Priority testing task",
    );

    await user.type(
      screen.getByLabelText("Description"),
      "Check created task rendering.",
    );

    await user.selectOptions(
      screen.getByLabelText("Priority"),
      "High",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create task",
      }),
    );

    expect(
      await screen.findByText("Priority testing task"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Check created task rendering.",
      ),
    ).toBeInTheDocument();
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
      screen.getByLabelText("Task title"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Close",
      }),
    );

    expect(
      screen.queryByLabelText("Task title"),
    ).not.toBeInTheDocument();
  });

  test("toggles task completion", async () => {
    const user = userEvent.setup();

    updateTask.mockResolvedValue({
      ...mockTasks[1],
      completed: true,
    });

    render(<App />);

    await screen.findByText("Write user interaction tests");

    const toggleButton = screen.getByRole("button", {
      name: "Mark Write user interaction tests as complete",
    });

    await user.click(toggleButton);

    expect(updateTask).toHaveBeenCalledWith(2, {
      completed: true,
    });
  });

  test("calls updateTask with the correct task data", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    );

    expect(updateTask).toHaveBeenCalledWith(2, {
      completed: true,
    });
  });

  test("updates task completion state in the UI", async () => {
    const user = userEvent.setup();

    updateTask.mockResolvedValue({
      ...mockTasks[1],
      completed: true,
    });

    render(<App />);

    await screen.findByText("Write user interaction tests");

    const toggleButton = screen.getByRole("button", {
      name: "Mark Write user interaction tests as complete",
    });

    await user.click(toggleButton);

    expect(
      await screen.findByRole("button", {
        name: "Mark Write user interaction tests as active",
      }),
    ).toBeInTheDocument();
  });

  test("rolls back task completion when update fails", async () => {
    const user = userEvent.setup();

    updateTask.mockRejectedValue(
      new Error("Update failed"),
    );

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: "Mark Write user interaction tests as complete",
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Mark Write user interaction tests as complete",
        }),
      ).toBeInTheDocument();
    });
  });

  test("deletes a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: /delete.*write user interaction tests/i,
      }),
    );

    expect(deleteTask).toHaveBeenCalledWith(2);
  });

  test("calls deleteTask with the correct task id", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: /delete.*write user interaction tests/i,
      }),
    );

    expect(deleteTask).toHaveBeenCalledWith(2);
  });

  test("removes deleted task from the UI", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: /delete.*write user interaction tests/i,
      }),
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Write user interaction tests"),
      ).not.toBeInTheDocument();
    });
  });

  test("rolls back task deletion when delete fails", async () => {
    const user = userEvent.setup();

    deleteTask.mockRejectedValue(
      new Error("Delete failed"),
    );

    render(<App />);

    await screen.findByText("Write user interaction tests");

    await user.click(
      screen.getByRole("button", {
        name: /delete.*write user interaction tests/i,
      }),
    );

    expect(
      await screen.findByText(
        "Write user interaction tests",
      ),
    ).toBeInTheDocument();
  });

  test("filters tasks by search", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const searchInput = screen.getByPlaceholderText(
      /search/i,
    );

    await user.type(searchInput, "interaction");

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("filters tasks by active status", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by status",
    });

    await user.selectOptions(statusSelect, "active");

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("filters tasks by completed status", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by status",
    });

    await user.selectOptions(
      statusSelect,
      "completed",
    );

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Write user interaction tests"),
    ).not.toBeInTheDocument();
  });

  test("shows active task count", async () => {
    render(<App />);

    await screen.findByText("Review Vitest configuration");

    expect(
      screen.getByText("Active tasks"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("2", {
        selector: "strong",
      }),
    ).toBeInTheDocument();
  });

  test("shows API error state when task loading fails", async () => {
    getTasks.mockRejectedValue(
      new Error("Network error"),
    );

    render(<App />);

    expect(
      await screen.findByRole("alert"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Unable to load tasks"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Unable to load tasks."),
    ).toBeInTheDocument();
  });

  test("shows empty state when API returns no tasks", async () => {
    getTasks.mockResolvedValue([]);

    render(<App />);

    expect(
      await screen.findByText("No tasks found"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Try changing your search or status filter.",
      ),
    ).toBeInTheDocument();
  });

  test("supports changing task priority", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    await user.click(
      screen.getByRole("button", {
        name: "Add task",
      }),
    );

    const prioritySelect = screen.getByLabelText(
      "Priority",
    );

    await user.selectOptions(
      prioritySelect,
      "High",
    );

    expect(prioritySelect).toHaveValue("High");
  });

  test("supports searching by description", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const searchInput = screen.getByPlaceholderText(
      /search/i,
    );

    await user.type(searchInput, "important user");

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Review Vitest configuration"),
    ).not.toBeInTheDocument();
  });

  test("shows no tasks message when filters match nothing", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const searchInput = screen.getByPlaceholderText(
      /search/i,
    );

    await user.type(
      searchInput,
      "something-that-does-not-exist",
    );

    expect(
      await screen.findByText("No tasks found"),
    ).toBeInTheDocument();
  });

  test("supports switching back to all tasks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Review Vitest configuration");

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by status",
    });

    await user.selectOptions(
      statusSelect,
      "completed",
    );

    expect(
      screen.getByText("Review Vitest configuration"),
    ).toBeInTheDocument();

    await user.selectOptions(
      statusSelect,
      "all",
    );

    expect(
      screen.getByText("Write user interaction tests"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Document testing strategy"),
    ).toBeInTheDocument();
  });

  test("matches the task dashboard snapshot", async () => {
    const { container } = render(<App />);

    await screen.findByText("Review Vitest configuration");

    expect(container.firstChild).toMatchSnapshot();
  });
});