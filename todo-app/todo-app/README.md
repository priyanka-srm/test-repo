# 🚀 Phase 10 — Todo Server-State App

A React Todo application built to practice server-state management using TanStack Query (React Query) with a fake REST API powered by JSON Server.

The main goal of this project was to understand how React applications can fetch, create, delete, cache, invalidate, and optimistically update server data.

---

## 📌 Project Overview

This project demonstrates:

- Fetching todos from a REST API
- Adding new todos
- Deleting todos
- Server-state management with TanStack Query
- Query caching
- Query invalidation
- Loading state
- Error state
- Empty state
- Optimistic UI updates
- Rollback when an optimistic mutation fails
- API service layer
- Server synchronization

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

    todo-app/
    │
    ├── db.json
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    │
    └── src/
        ├── components/
        │   ├── TodoApp.jsx
        │   └── TodoApp.css
        │
        ├── services/
        │   └── api.js
        │
        ├── App.jsx
        ├── main.jsx
        └── index.css

---

## ⚙️ Installation

Install the project dependencies:

    npm install

Install TanStack Query and JSON Server:

    npm install @tanstack/react-query json-server

---

## ▶️ Running the Project

This project requires two terminals because React and JSON Server run separately.

### Terminal 1 — Start JSON Server

    npx json-server db.json

JSON Server runs on:

    http://localhost:3000

Todos endpoint:

    http://localhost:3000/todos

### Terminal 2 — Start React

    npm run dev

React application runs on:

    http://localhost:5173

---

## 🗄️ Fake REST API

The project uses db.json as the database.

The Todo data contains:

- id
- title
- completed

Example data:

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

JSON Server automatically provides REST API endpoints for the Todo data.

---

## 🔌 API Service Layer

API logic is separated from the UI component.

The API service is located at:

    src/services/api.js

The service provides three main functions:

    getTodos()
    addTodo(todo)
    deleteTodo(id)

The component does not directly handle API URLs.

This separation keeps API communication independent from the UI logic and makes the application easier to maintain.

---

## ⚛️ TanStack Query Setup

TanStack Query is configured in main.jsx.

A QueryClient is created and provided to the application.

The main setup is:

    const queryClient = new QueryClient();

The application is wrapped with QueryClientProvider.

This makes TanStack Query available throughout the React application.

---

## 📥 Fetching Todos with useQuery

Todos are fetched using TanStack Query's useQuery hook.

The query uses:

    queryKey: ["todos"]

and:

    queryFn: getTodos

The query is responsible for fetching and caching the Todo data from the server.

The request is:

    GET /todos

TanStack Query manages the server-state data instead of manually storing the fetched Todo list in component state.

---

## ⏳ Loading State

While the Todo data is being fetched, the application displays a loading UI.

The loading state is handled using:

    isLoading

The user sees:

    Loading your todos...

This provides feedback while the server request is in progress.

---

## ❌ Error State

If the Todo request fails, the application displays an error UI.

The error state is handled using:

    isError

The application also displays the actual error message.

Example:

    Failed to load todos

This makes API failures easier to identify.

---

## 📝 Empty State

If the server returns an empty Todo list, the application displays an empty state.

The condition is:

    todos.length === 0

Instead of showing an empty list, the UI displays a message asking the user to add their first task.

---

## ➕ Adding Todos

Adding a Todo is handled using TanStack Query's useMutation hook.

The mutation function is:

    addTodo

When the user submits the form, the application sends the new Todo to the server.

The mutation sends:

    POST /todos

The Todo contains:

    title
    completed

The completed value is initially set to false.

After the Todo is successfully added, the todos query is invalidated.

---

## 🔄 Query Invalidation

After a successful mutation, the application uses:

    queryClient.invalidateQueries({
      queryKey: ["todos"]
    })

This marks the Todo query as stale.

TanStack Query then fetches the latest Todo data from the server.

This means the application does not manually modify the main Todo list after adding or deleting data.

Instead:

    Mutation
        ↓
    Server update
        ↓
    Query invalidation
        ↓
    Refetch
        ↓
    Updated UI

This keeps the UI synchronized with the actual server state.

---

## 🗑️ Deleting Todos

Deleting a Todo is also handled using useMutation.

The mutation function is:

    deleteTodo

The request is:

    DELETE /todos/:id

When the user clicks the Delete button:

    deleteTodoMutation.mutate(todo.id)

The Todo is removed from the server through the JSON Server API.

---

## ⚡ Optimistic Delete

The Delete operation uses an optimistic update.

Normally, an application might wait for the server response before removing the Todo from the UI.

This project instead removes the Todo from the UI immediately.

The flow is:

    User clicks Delete
            ↓
    Todo disappears immediately
            ↓
    DELETE request is sent
            ↓
    Server responds
            ↓
    UI is synchronized

This makes the application feel faster and more responsive.

---

## 🔄 Optimistic Rollback

Before performing the optimistic update, the previous Todo data is saved.

The previous cache is retrieved using:

    queryClient.getQueryData(["todos"])

The selected Todo is then immediately removed from the cached data using:

    queryClient.setQueryData()

If the DELETE request fails, the previous Todo data is restored.

The rollback uses:

    queryClient.setQueryData(
      ["todos"],
      context.previousTodos
    )

Therefore, the application behaves like this:

    Delete clicked
          ↓
    Todo disappears immediately
          ↓
    DELETE request
          ↓
       Success
          ↓
    Todo stays deleted

    OR

    DELETE request fails
          ↓
    Previous Todo data restored
          ↓
    Todo appears again

This provides a reliable optimistic UI experience.

---

## 🔁 Mutation Lifecycle

The optimistic delete uses three important mutation lifecycle callbacks.

### onMutate

onMutate runs before the mutation request.

It is used to:

- Cancel ongoing Todo queries
- Save the previous cached Todo data
- Remove the Todo immediately from the UI
- Return the previous data for rollback

---

### onError

onError runs when the mutation fails.

It is used to restore the previous cached Todo data.

This provides the rollback functionality.

---

### onSettled

onSettled runs after the mutation succeeds or fails.

It is used to invalidate the Todo query.

This ensures that the final UI is synchronized with the actual server state.

---

## 🎨 UI Features

The Todo application includes:

- Modern dashboard-style interface
- Todo header
- Total task count
- Pending task count
- Completed task count
- Add task form
- Todo list
- Delete button
- Loading UI
- Error UI
- Empty state
- Responsive layout
- Optimistic delete interaction

---

## 🧠 Concepts Practiced

| Concept | Status |
|---|---|
| React | ✅ |
| Vite | ✅ |
| JavaScript | ✅ |
| JSON Server | ✅ |
| REST API | ✅ |
| API Service Layer | ✅ |
| QueryClient | ✅ |
| QueryClientProvider | ✅ |
| useQuery | ✅ |
| queryKey | ✅ |
| queryFn | ✅ |
| useMutation | ✅ |
| POST Mutation | ✅ |
| DELETE Mutation | ✅ |
| invalidateQueries | ✅ |
| Loading State | ✅ |
| Error State | ✅ |
| Empty State | ✅ |
| Optimistic Updates | ✅ |
| Rollback | ✅ |
| onMutate | ✅ |
| onError | ✅ |
| onSettled | ✅ |
| Server Synchronization | ✅ |

---

## 🔄 Application Data Flow

    React UI
        ↓
    TanStack Query
        ↓
    ┌─────────────────────┐
    │                     │
    ↓                     ↓
    useQuery          useMutation
    │                     │
    ↓                     ↓
    getTodos()      addTodo()
                    deleteTodo()
    │                     │
    └──────────┬──────────┘
               ↓
             api.js
               ↓
         JSON Server
               ↓
            db.json

---

## 📊 Server-State Flow

The main server-state flow of the project is:

    Fetch
      ↓
    useQuery
      ↓
    Cache
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

For optimistic delete:

    Delete Click
        ↓
    onMutate
        ↓
    Save Previous Cache
        ↓
    Update Cache Immediately
        ↓
    DELETE Request
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
       Server Sync

---

## 🎯 Learning Outcome

Through this project, I practiced server-state management in React using TanStack Query.

Instead of manually managing server data with multiple useState and useEffect implementations, TanStack Query was used to manage:

- Server data fetching
- Query caching
- Mutations
- Query invalidation
- Server synchronization
- Optimistic UI updates
- Mutation error handling
- Rollback behavior

This project helped me understand how server state differs from normal client-side UI state and how TanStack Query simplifies server-state management in React applications.

---

## 🚀 Future Improvements

Possible future improvements include:

- Edit Todo
- Toggle Todo completion
- Search Todos
- Filter Todos
- Pagination
- Retry handling
- TanStack Query Devtools
- Authentication
- Better mutation feedback

These features were intentionally not implemented because the main goal of this phase was to focus on TanStack Query server-state concepts and optimistic mutations.

---

## 🏆 Phase 10 Completion

Phase 10 has been completed successfully.

The project successfully implements:

    useQuery
        ↓
    useMutation
        ↓
    invalidateQueries
        ↓
    Optimistic Delete
        ↓
    Rollback
        ↓
    Server Synchronization

---

## 👨‍💻 Project Details

Project: Todo Server-State App

Phase: 10

Focus: React Server-State Management

Frontend: React + Vite

Server-State Library: TanStack Query

Backend: JSON Server

Language: JavaScript

---

## ⭐ Conclusion

This Phase 10 project demonstrates a practical approach to managing server state in a React application.

The application can fetch Todo data, add new Todos, delete Todos, synchronize the UI with the server, and perform optimistic updates with rollback handling.

The project provided practical experience with TanStack Query and demonstrated how server-state management can be handled efficiently without manually controlling every part of the server data inside React component state.