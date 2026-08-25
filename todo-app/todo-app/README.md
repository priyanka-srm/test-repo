# 🚀 TaskFlow — Todo Server-State App

A modern React Todo application built to practice **server-state management with TanStack Query** and a fake REST API powered by **JSON Server**.

TaskFlow allows users to create, complete, and delete tasks while keeping the UI synchronized with the server through query caching, mutations, query invalidation, optimistic updates, and rollback handling.

---

## 📌 Project Overview

TaskFlow demonstrates how server state can be managed effectively in a React application using TanStack Query.

The application supports:

- Fetching todos from a REST API
- Adding new todos
- Marking todos as completed or incomplete
- Deleting todos
- Query caching
- Query invalidation
- Loading state
- Error state
- Empty state
- Optimistic delete
- Optimistic completion toggle
- Rollback when mutations fail
- API service layer
- Server synchronization
- Task statistics
- Completion percentage
- Responsive dashboard-style UI

---

## ✨ Features

### 📊 Task Dashboard

The dashboard provides an overview of the current Todo list:

- Total tasks
- In-progress tasks
- Completed tasks
- Overall completion percentage
- Visual progress bar

### ➕ Add Tasks

Users can create new tasks through the task form.

The application:

- Validates empty input
- Sends a `POST` request to the API
- Displays an adding state while the mutation is pending
- Clears the input after successful creation
- Invalidates the Todo query after success
- Displays an error message if the mutation fails

### ✓ Complete / Uncomplete Tasks

Users can toggle a task between:

- `In progress`
- `Completed`

The completion toggle uses an optimistic update so the UI responds immediately.

If the server update fails, the previous state is restored.

### 🗑️ Delete Tasks

Users can delete individual tasks.

The delete interaction uses an optimistic update:

1. The task disappears immediately.
2. A `DELETE` request is sent to the server.
3. If successful, the deletion remains.
4. If the request fails, the previous task list is restored.
5. The Todo query is invalidated to synchronize the final state.

### 🔄 Server Synchronization

After mutations, TanStack Query invalidates the `["todos"]` query and refetches the latest server data.

This keeps the UI synchronized with the actual server state.

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript
- CSS
- TanStack Query
- JSON Server
- REST API

---

## 📂 Project Structure

```text
todo-app/
│
├── db.json
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
│
└── src/
    │
    ├── components/
    │   ├── TodoApp.jsx
    │   └── TodoApp.css
    │
    ├── services/
    │   └── api.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

### Architecture

The project separates responsibilities into:

- `TodoApp.jsx` → UI and TanStack Query logic
- `api.jsx` → REST API communication
- `TodoApp.css` → Todo application styling
- `db.json` → Fake database used by JSON Server
- `main.jsx` → React and TanStack Query application setup

---

## ⚙️ Installation

Clone the repository and install the dependencies:

```bash
npm install
```

If the packages are not already installed, install TanStack Query and JSON Server:

```bash
npm install @tanstack/react-query json-server
```

---

## ▶️ Running the Project

The project requires two terminals because the React frontend and JSON Server run separately.

### Terminal 1 — Start JSON Server

From the project directory:

```bash
npx json-server db.json
```

JSON Server runs on:

```text
http://localhost:3000
```

Todos endpoint:

```text
http://localhost:3000/todos
```

### Terminal 2 — Start React

```bash
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5173
```

Open the Vite URL in your browser to use TaskFlow.

---

## 🗄️ Fake REST API

The project uses `db.json` as a local fake database.

Each Todo contains:

- `id`
- `title`
- `completed`

Example:

```json
{
  "todos": [
    {
      "id": "1",
      "title": "Learn React Query",
      "completed": false
    },
    {
      "id": "2",
      "title": "Practice useMutation",
      "completed": false
    },
    {
      "id": "3",
      "title": "Build Todo App",
      "completed": true
    }
  ]
}
```

JSON Server automatically creates REST endpoints for the Todo resource.

### API Endpoints

| Operation | Method | Endpoint |
|---|---|---|
| Get todos | `GET` | `/todos` |
| Add todo | `POST` | `/todos` |
| Update todo | `PATCH` | `/todos/:id` |
| Delete todo | `DELETE` | `/todos/:id` |

---

## 🔌 API Service Layer

API communication is separated from the UI component and handled inside:

```text
src/services/api.jsx
```

The service provides functions for:

```text
getTodos()
addTodo(todo)
updateTodo(id, updates)
deleteTodo(id)
```

The React component does not directly manage API URLs or HTTP requests.

This separation keeps the application architecture cleaner and makes the API layer easier to maintain or replace later.

The Todo fetch request also supports `AbortController` through the request `signal`, allowing TanStack Query to cancel an in-flight request when necessary.

---

## ⚛️ TanStack Query Setup

TanStack Query is configured in `main.jsx`.

A `QueryClient` is created:

```js
const queryClient = new QueryClient();
```

The application is then wrapped with:

```jsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

This makes the Query Client available throughout the React application.

---

## 📥 Fetching Todos with `useQuery`

Todos are fetched using TanStack Query's `useQuery` hook.

The query configuration uses:

```js
queryKey: ["todos"]
```

and:

```js
queryFn: getTodos
```

TanStack Query manages the server-state data and cache instead of storing the fetched Todo list manually with `useState`.

The request is:

```text
GET /todos
```

### Fetch Flow

```text
React UI
   ↓
useQuery
   ↓
getTodos()
   ↓
GET /todos
   ↓
JSON Server
   ↓
Query Cache
   ↓
UI
```

---

## ⏳ Loading State

While the initial Todo request is running, the application displays a dedicated loading screen.

The state is handled using:

```js
isLoading
```

This provides clear feedback instead of displaying an empty Todo list while data is still being fetched.

---

## ❌ Error State

If the Todo request fails, the application displays a dedicated error screen.

The state is handled using:

```js
isError
```

The API error message is also displayed when available.

The user can retry the request using the **Try Again** button.

---

## 📝 Empty State

If the server returns no Todos:

```js
todos.length === 0
```

the application displays a dedicated empty state.

Instead of showing a blank list, the UI encourages the user to create their first task.

---

## ➕ Adding Todos

Adding a Todo is handled with TanStack Query's `useMutation`.

The mutation uses:

```js
mutationFn: addTodo
```

The request is:

```text
POST /todos
```

A newly created Todo contains:

```js
{
  title: trimmedTitle,
  completed: false
}
```

After successful creation:

```js
queryClient.invalidateQueries({
  queryKey: ["todos"],
});
```

is called to mark the Todo query as stale and synchronize the UI with the server.

---

## ✓ Updating Todo Completion

Todo completion is handled using another `useMutation`.

The request uses:

```text
PATCH /todos/:id
```

The update contains:

```js
{
  completed: true
}
```

or:

```js
{
  completed: false
}
```

The application updates the cached Todo immediately before waiting for the server response.

This creates a responsive completion toggle.

---

## ⚡ Optimistic Completion Toggle

The completion update follows this flow:

```text
User clicks checkbox
        ↓
onMutate
        ↓
Cancel active Todo query
        ↓
Save previous cache
        ↓
Update Todo cache immediately
        ↓
UI changes instantly
        ↓
PATCH request
        ↓
Server response
```

If the request succeeds, the change remains.

If the request fails, the previous Todo data is restored.

---

## 🗑️ Deleting Todos

Deleting a Todo is handled using `useMutation`.

The mutation function is:

```js
deleteTodo
```

The request is:

```text
DELETE /todos/:id
```

When the user clicks **Delete**, the Todo is optimistically removed from the cached list.

---

## ⚡ Optimistic Delete

The delete operation uses an optimistic update.

Instead of waiting for the server response, the application immediately removes the Todo from the UI.

The flow is:

```text
User clicks Delete
        ↓
Todo disappears immediately
        ↓
DELETE request
        ↓
Server response
        ↓
Query synchronization
```

This makes the application feel faster and more responsive.

---

## 🔄 Optimistic Rollback

Before changing the cache, the previous Todo data is saved:

```js
const previousTodos =
  queryClient.getQueryData(["todos"]);
```

The Todo is then removed from the cache using:

```js
queryClient.setQueryData()
```

If the DELETE request fails, the previous data is restored:

```js
queryClient.setQueryData(
  ["todos"],
  context.previousTodos
);
```

This creates a safe optimistic update strategy.

### Rollback Flow

```text
Delete clicked
      ↓
Save previous cache
      ↓
Remove Todo immediately
      ↓
DELETE request
      ↓
   ┌───────────────┐
   │               │
 Success         Failure
   │               │
   ↓               ↓
Keep deletion    Rollback
   │               │
   └───────┬───────┘
           ↓
       onSettled
           ↓
  invalidateQueries
           ↓
      Server Sync
```

---

## 🔁 Mutation Lifecycle

The optimistic mutations use three important TanStack Query lifecycle callbacks.

### `onMutate`

Runs before the mutation request.

Used to:

- Cancel ongoing Todo queries
- Save the previous cache
- Update the cache optimistically
- Return previous data for rollback

### `onError`

Runs when the mutation fails.

Used to:

- Restore the previous cache
- Inform the user about the failed operation

### `onSettled`

Runs after the mutation succeeds or fails.

Used to:

```js
queryClient.invalidateQueries({
  queryKey: ["todos"],
});
```

This ensures the final UI is synchronized with the server.

---

## 📊 Task Statistics

TaskFlow calculates task statistics directly from the server-state data.

### Total Tasks

```js
todos.length
```

### Completed Tasks

```js
todos.filter(
  (todo) => todo.completed
).length
```

### In-Progress Tasks

```js
totalTodos - completedTodos
```

### Completion Percentage

```js
Math.round(
  (completedTodos / totalTodos) * 100
)
```

The dashboard displays these values together with a visual progress bar.

---

## 🎨 UI Features

TaskFlow includes:

- Modern productivity dashboard
- TaskFlow branding
- Workspace header
- System status indicator
- Overall progress section
- Completion percentage
- Visual progress bar
- Total task count
- In-progress task count
- Completed task count
- Add task form
- Input validation
- Task list
- Task numbering
- Complete / uncomplete control
- Delete button
- Loading screen
- Error screen
- Retry functionality
- Empty state
- Sync indicator
- Mutation loading feedback
- Responsive layout
- Optimistic interactions

---

## 🧠 Concepts Practiced

| Concept | Status |
|---|---|
| React | ✅ |
| Vite | ✅ |
| JavaScript | ✅ |
| CSS | ✅ |
| JSON Server | ✅ |
| REST API | ✅ |
| API Service Layer | ✅ |
| QueryClient | ✅ |
| QueryClientProvider | ✅ |
| `useQuery` | ✅ |
| `queryKey` | ✅ |
| `queryFn` | ✅ |
| `useMutation` | ✅ |
| POST Mutation | ✅ |
| PATCH Mutation | ✅ |
| DELETE Mutation | ✅ |
| `invalidateQueries` | ✅ |
| Loading State | ✅ |
| Error State | ✅ |
| Empty State | ✅ |
| Optimistic Updates | ✅ |
| Optimistic Delete | ✅ |
| Optimistic Toggle | ✅ |
| Rollback | ✅ |
| `onMutate` | ✅ |
| `onError` | ✅ |
| `onSettled` | ✅ |
| Query Cancellation | ✅ |
| Server Synchronization | ✅ |
| Server-State Management | ✅ |

---

## 🔄 Application Data Flow

```text
                    React UI
                       ↓
                TanStack Query
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
           useQuery         useMutation
              ↓                 ↓
         getTodos()       ┌─────┼──────────────┐
                          ↓     ↓              ↓
                      addTodo  updateTodo  deleteTodo
                          │     │              │
                          └─────┼──────────────┘
                                ↓
                           api.jsx
                                ↓
                         JSON Server
                                ↓
                            db.json
```

---

## 📊 Server-State Flow

### Standard Mutation Flow

```text
Fetch
  ↓
useQuery
  ↓
Query Cache
  ↓
User Mutation
  ↓
Server Update
  ↓
invalidateQueries
  ↓
Refetch
  ↓
Updated UI
```

### Optimistic Mutation Flow

```text
User Action
    ↓
onMutate
    ↓
Save Previous Cache
    ↓
Update Cache Immediately
    ↓
UI Updates Instantly
    ↓
Server Request
    ↓
┌───────────────┐
│               │
↓               ↓
Success       Failure
↓               ↓
Keep Change   Rollback
│               │
└───────┬───────┘
        ↓
    onSettled
        ↓
invalidateQueries
        ↓
Server Synchronization
```

---

## 🧩 Client State vs Server State

One of the important concepts practiced in this project is separating **client state** from **server state**.

### Client State

The task input is local component state:

```js
const [title, setTitle] = useState("");
```

It controls the form input.

### Server State

The Todo list is managed by TanStack Query:

```js
useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});
```

This separation prevents unnecessary duplication of server data inside React state.

---

## 🎯 Learning Outcome

Through this project, I practiced practical server-state management in React using TanStack Query.

The project helped me understand:

- How `useQuery` fetches and caches server data
- How `useMutation` handles server-side changes
- How query invalidation keeps data synchronized
- How optimistic updates improve UI responsiveness
- How rollback protects the UI when a mutation fails
- How `onMutate`, `onError`, and `onSettled` work together
- How API logic can be separated from UI components
- How client state differs from server state
- How query cancellation can prevent stale requests from interfering with updates

---

## 🚀 Future Improvements

Possible future improvements include:

- Search tasks
- Filter by All / Active / Completed
- Edit task titles
- Task priorities
- Due dates
- Categories
- Pagination for larger datasets
- TanStack Query Devtools
- Authentication
- Improved toast-based mutation notifications
- Production backend/API integration
- Deployment

---

## 🏆 Phase 10 Completion

Phase 10 has been completed successfully.

The project demonstrates:

```text
useQuery
    ↓
Server-State Cache
    ↓
useMutation
    ↓
POST / PATCH / DELETE
    ↓
Optimistic Updates
    ↓
Rollback
    ↓
invalidateQueries
    ↓
Server Synchronization
```

The project successfully combines React UI state with TanStack Query server-state management.

---

## 👨‍💻 Project Details

| Detail | Information |
|---|---|
| Project | TaskFlow — Todo Server-State App |
| Phase | 10 |
| Focus | React Server-State Management |
| Frontend | React + Vite |
| Language | JavaScript |
| Styling | CSS |
| Server-State Library | TanStack Query |
| Backend | JSON Server |
| API Style | REST API |

---

## ⭐ Conclusion

TaskFlow demonstrates a practical approach to managing server state in a React application using TanStack Query.

The application can fetch Todo data, create new tasks, update completion status, delete tasks, handle loading and error states, synchronize the UI with the server, and perform optimistic updates with rollback handling.

The project provided hands-on experience with modern server-state patterns and demonstrated how TanStack Query can simplify data fetching, caching, mutations, and synchronization without manually managing the entire server dataset inside React component state.

**Built with React ⚛️ + TanStack Query 🚀**