const API_URL = "http://localhost:3000/tasks";

export async function getTasks({ signal } = {}) {
  const response = await fetch(API_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks.");
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task.");
  }

  return response.json();
}

export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update task.");
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task.");
  }

  return response.json();
}
