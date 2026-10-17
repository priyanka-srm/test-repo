import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "../data/tasks";

function TaskDetailPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTask() {
      try {
        setIsLoading(true);
        setError("");
        setTask(null);

        const data = await getTask(id, {
          signal: controller.signal,
        });

        if (!data || typeof data !== "object" || data.id == null) {
          throw new Error("Invalid task data");
        }

        setTask(data);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError(
            err?.message === "Task not found"
              ? "Task not found."
              : "Unable to load task details.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="dashboard">
        <section className="empty-state" role="status">
          <h1>Loading task...</h1>
          <p>Fetching task details.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard">
        <section className="empty-state error-state" role="alert">
          <h1>{error}</h1>
          <Link to="/">Return to TestFlow</Link>
        </section>
      </main>
    );
  }

  const priorityLabel = task.priority
    ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
    : "Not specified";

  return (
    <main className="dashboard">
      <section className="task-section">
        <p className="section-label">TASK DETAILS</p>

        <h1>{task.title}</h1>

        <p>{task.description || "No description provided."}</p>

        <p>
          <strong>Priority: </strong>
          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabel}
          </span>
        </p>

        <p>
          <strong>Status: </strong>
          {task.completed ? "Completed" : "Active"}
        </p>

        <Link to="/">Back to tasks</Link>
      </section>
    </main>
  );
}

export default TaskDetailPage;
