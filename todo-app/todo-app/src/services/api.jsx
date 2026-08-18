const BASE_URL = "http://localhost:3000";
export async function getTodos() {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
}
export async function addTodo(todo) {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
}
export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return response.json();
}
