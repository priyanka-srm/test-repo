# TestFlow

A React task management application built as a practical learning project to explore React testing, reusable component patterns, routing, accessibility, API integration, error handling, and code quality.

## 🚀 Overview

TestFlow is a React-based task management application developed as part of a React Testing Lab and Capstone 1 project.

The application provides a task workboard where users can create, search, filter, complete, and delete tasks. It handles asynchronous API operations, loading and error states, form validation, and optimistic updates with rollback behavior.

The project also includes a task detail page, application routing, a shared layout, error handling, and focused examples of advanced React patterns and TypeScript.

TestFlow combines practical application development with automated testing to demonstrate maintainable, reusable, and testable React code.

## ✨ Features

### Task Management

- View tasks in a responsive workboard.
- Display the active task count.
- Create tasks through an accessible modal form.
- Validate required task fields.
- Add task descriptions and set task priority.
- Search tasks by title and description.
- Filter tasks by All, Active, and Completed status.
- Mark tasks as completed or active.
- Delete tasks.
- Handle loading, error, and empty states.
- Handle form validation errors.
- Support optimistic task updates.
- Roll back updates or deletions when API requests fail.

### Routing and Navigation

- Configure application routes using React Router.
- Organize shared UI through an application layout.
- Navigate from the task workboard to a task detail page.
- Display task details through a dedicated page component.
- Provide a not-found page for unmatched routes.

### Error Handling

- Use an error boundary to handle rendering errors.
- Separate error-handling responsibilities from the main task UI.
- Handle API failures and display appropriate feedback.

### Reusable React Patterns

- Higher-Order Components (HOCs).
- Render props and function children.
- Compound components using Context.
- Controlled and uncontrolled component APIs.
- TypeScript props, state, and event examples.
- Generic TypeScript components.
- Lazy loading using `React.lazy` and `Suspense`.

### Testing and Code Quality

- Component testing.
- User-interaction testing.
- API and asynchronous UI testing.
- Custom hook testing.
- Snapshot testing.
- Task detail page testing.
- ESLint and React Hooks dependency validation.
- Prettier formatting.
- Production build verification.

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- TypeScript learning examples
- React Router
- React Error Boundary
- Vitest
- React Testing Library
- Testing Library User Event
- Testing Library Jest DOM
- JSON Server
- CSS
- ESLint
- ESLint Plugin React Hooks
- Prettier

## 📁 Project Structure

```text
testflow/
├── db.json
├── eslint.config.js
├── .prettierrc
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── src/
    ├── assets/
    ├── components/
    │   ├── ErrorBoundary.jsx
    │   ├── TaskCard/
    │   │   └── TaskCard.jsx
    │   ├── TaskList/
    │   │   └── TaskList.jsx
    │   ├── withLoading/
    │   │   ├── withLoading.jsx
    │   │   ├── withLoading.test.jsx
    │   │   ├── UserProfile.jsx
    │   │   └── ProductList.jsx
    │   ├── renderProps/
    │   ├── accordion/
    │   ├── select/
    │   ├── typescript/
    │   └── lazyLoading/
    ├── data/
    │   └── tasks.js
    ├── hooks/
    │   └── useTaskFilters.js
    ├── layouts/
    │   └── AppLayout.jsx
    ├── pages/
    │   ├── TaskDetailPage.jsx
    │   ├── TaskDetailPage.test.jsx
    │   └── NotFoundPage.jsx
    ├── test/
    │   └── setup.js
    ├── __snapshots__/
    │   └── App.test.jsx.snap
    ├── App.jsx
    ├── App.test.jsx
    ├── AppRoutes.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

*This structure reflects the source files present in the inspected project. Some directories are shown without listing every file.*

## 🧩 Application Architecture

### App Component

`App.jsx` manages the main task workboard and task-related interactions.

Its responsibilities include:

- Loading tasks.
- Creating, updating, and deleting tasks.
- Managing search and status filters.
- Managing the Add Task modal and form state.
- Handling loading and API error states.
- Managing optimistic UI updates and rollback behavior.

### TaskList and TaskCard

`TaskList.jsx` renders the task collection using reusable task components.

`TaskCard.jsx` represents an individual task and displays its information and available task actions.

Separating task presentation from the dashboard helps keep components reusable and easier to test.

### Custom Hook

`src/hooks/useTaskFilters.js` encapsulates task search and filtering logic.

It supports searching by title and description, filtering active or completed tasks, and displaying all tasks.

The hook is tested independently using React Testing Library's `renderHook`.

### API Service

`src/data/tasks.js` separates task-related API operations from the UI.

The API service handles fetching, creating, updating, and deleting tasks through the configured endpoint.

### Routing and Layout

`AppRoutes.jsx` defines the application's route configuration.

`AppLayout.jsx` provides the shared application layout.

`TaskDetailPage.jsx` provides the dedicated task detail view, while `NotFoundPage.jsx` handles unmatched routes.

### Error Boundary

`components/ErrorBoundary.jsx` provides an error boundary for handling React rendering errors.

The project also includes the `react-error-boundary` dependency.

### Local Data

`db.json` stores the local task data used by JSON Server during development.

## 🧪 Testing

TestFlow uses Vitest and React Testing Library to verify application behavior from a user's perspective.

The tests cover the following areas.

### Dashboard and API States

- Dashboard rendering.
- Initial task loading.
- Active task count.
- Loading, success, error, and empty states.
- API response handling.

### Task Creation

- Opening and closing the Add Task modal.
- Required-field validation.
- Task title and description handling.
- Priority selection.
- Successful task creation.
- API failure handling.
- Prevention of blank or whitespace-only titles.

### Task Updates and Deletion

- Completing and reactivating tasks.
- Updating task data through the API.
- Deleting tasks.
- Updating the UI after successful operations.
- Rolling back optimistic updates when requests fail.

### Search and Filtering

- Searching by task title.
- Searching by task description.
- Filtering all, active, and completed tasks.
- Displaying an empty search result when no task matches.
- Updating displayed tasks when filter values change.

### Custom Hook Testing

The `useTaskFilters` hook is tested independently with `renderHook`.

The tests cover task search and status filtering behavior.

### Task Detail Page Testing

`TaskDetailPage.test.jsx` provides a focused test file for the task detail page.

Run the complete test suite to verify the current routing and task detail behavior alongside the existing application tests.

### Advanced Component Testing

The project includes tests for selected learning examples:

- Higher-Order Component loading behavior.
- Render-prop interactions.
- Compound component behavior.
- Controlled and uncontrolled Select behavior.
- Lazy-loading behavior.

### Run Tests

```bash
npm test -- --run
```

Use the latest test output as the source of truth for the final test count.

## 🧹 Code Quality

### ESLint

ESLint checks the project for common code issues and enforces configured React development rules.

React Hooks linting helps identify issues such as missing dependencies in effects.

Run:

```bash
npm run lint
```

### Prettier

Prettier maintains consistent code formatting.

Format the project:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

The formatting check should be run before submission to confirm the current files follow the configured style.

## 🏗️ Production Build

Vite is used to generate the production build.

Run:

```bash
npm run build
```

A successful build confirms that Vite can compile the application for production.

## ▶️ Getting Started

### 1. Clone the Repository

Clone the Git repository containing TestFlow:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Replace the placeholder with the actual repository URL.

### 2. Navigate to the Project

```bash
cd <REPOSITORY_FOLDER>/testflow
```

Adjust the path to match the location of the `testflow` application folder in the repository.

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API URL

The task API service uses the `VITE_API_URL` environment variable.

For a local JSON Server setup, create a `.env.local` file in the application directory and configure the endpoint expected by `src/data/tasks.js`.

Example:

```env
VITE_API_URL=http://localhost:3000/tasks
```

Keep local environment files and private credentials out of version control.

### 5. Start the Application

```bash
npm run dev
```

The configured development script starts Vite and JSON Server together.

The Vite application is typically available at:

`http://localhost:5173/`

The local task API is typically available at:

`http://localhost:3000/tasks`

### 6. Run Tests

```bash
npm test -- --run
```

### 7. Run ESLint

```bash
npm run lint
```

### 8. Check Formatting

```bash
npm run format:check
```

### 9. Build for Production

```bash
npm run build
```

## 🔌 API

TestFlow uses JSON Server for local task data.

The API logic is maintained in:

`src/data/tasks.js`

The local data is stored in `db.json`.

| Method | Endpoint     | Purpose       |
| ------ | ------------ | ------------- |
| GET    | `/tasks`     | Fetch tasks   |
| POST   | `/tasks`     | Create a task |
| PATCH  | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

The endpoint is configured using `VITE_API_URL`. Confirm the expected endpoint format in `src/data/tasks.js` before configuring the environment variable.

## ♿ Accessibility

Accessibility considerations include:

- Semantic HTML.
- Proper form labels.
- Descriptive button names.
- Keyboard-friendly form controls.
- Visible focus states.
- Accessible loading and error feedback.
- Accessible task action controls.
- Modal dialog semantics and accessible naming.
- Keyboard handling for modal interactions.

The Add Task modal supports its close and cancel controls and Escape-key handling.

## 📚 Phase 17 — Advanced React Patterns and TypeScript

Phase 17 extended TestFlow with focused examples of reusable React patterns and modern React concepts.

### 17.1 — Higher-Order Components

Created a reusable `withLoading` HOC and applied it to example components. Added tests for its loading behavior.

### 17.2 — Render Props

Practiced sharing component behavior through render props and function children using a MouseTracker example.

### 17.3 — Compound Components

Built an Accordion using a compound-component API and Context to coordinate its child components.

### 17.4 — Controlled and Uncontrolled Components

Created a reusable Select component demonstrating controlled and uncontrolled usage.

### 17.5 — TypeScript Fundamentals

Added examples demonstrating typed React props, state, and event handlers.

### 17.6 — Generic Components

Built a reusable `GenericList<T>` component to demonstrate typed items, keys, and render callbacks.

### 17.7 — TypeScript Trade-offs

Explored the benefits and additional setup requirements of TypeScript compared with JavaScript.

### 17.8 — Lazy Loading and Suspense

Used `React.lazy` and `Suspense` to demonstrate lazy component loading and fallback UI.

### 17.9 — React 19 Awareness

Reviewed React Actions and the `use()` API at a conceptual level.

### 17.10 — Server Components Awareness

Reviewed Server Components, Client Components, and the `"use client"` directive in supported frameworks.

These were learning exercises. The Vite application was not converted into a full Server Components framework setup.

## 🚀 Phase 18 — Capstone 1: TestFlow Application

Phase 18 focused on extending the existing TestFlow project rather than creating a separate application.

### 18.1 — Application Routing

- Added a dedicated route configuration through `AppRoutes.jsx`.
- Used React Router to organize application navigation.
- Introduced a shared application layout through `AppLayout.jsx`.

### 18.2 — Task Detail Page

- Added `TaskDetailPage.jsx` as a dedicated task detail page.
- Added `TaskDetailPage.test.jsx` for focused testing of the page.
- Connected the detail view to the existing task management application.

### 18.3 — Not-Found Handling

- Added `NotFoundPage.jsx` for unmatched application routes.
- Separated not-found behavior from the main task workboard.

### 18.4 — Error Handling

- Added an application error boundary component.
- Included `react-error-boundary` as a project dependency.
- Kept rendering-error handling separate from the primary task UI.

### 18.5 — Maintainability and Testing

- Preserved the existing task management features.
- Retained the task API service and custom filtering hook.
- Added focused tests for the task detail page.
- Continued using Vitest, React Testing Library, ESLint, and Vite build tooling.

### Phase 18 Learning Outcomes

- Organize a React application using routes.
- Separate shared layout from page-level components.
- Create a dedicated detail page.
- Handle unmatched routes.
- Understand the role of error boundaries.
- Add focused tests for page-level behavior.
- Extend an existing project without replacing its core task management functionality.

## 🎯 Learning Outcomes

Through TestFlow, the project demonstrates practical experience with:

- React state management and controlled forms.
- Component composition and reusable UI.
- Custom hooks.
- REST API integration.
- Asynchronous UI behavior.
- Optimistic updates and rollback handling.
- Component, interaction, and snapshot testing.
- Testing custom hooks with `renderHook`.
- Accessibility and keyboard interaction.
- React Router and page-level components.
- Error boundaries and error handling.
- HOCs, render props, and compound components.
- TypeScript props, state, events, and generics.
- Lazy loading and Suspense.
- ESLint, React Hooks rules, and Prettier.
- Production build verification.
- Git-based development workflow.

## 📌 Project Status

**TestFlow — React Testing Lab and Capstone 1**

TestFlow combines a practical task management application with focused examples of React testing, reusable component patterns, routing, accessibility, and code quality tooling.

### Final Verification Checklist

Run the relevant commands before marking the checklist complete.

- [x] Task dashboard and API workflows verified.
- [x] Search and filtering verified.
- [x] Task creation, update, and deletion verified.
- [x] Loading, error, and rollback behavior verified.
- [x] Task detail page and routing verified.
- [x] Not-found route verified.
- [x] Automated tests pass.
- [x] ESLint passes.
- [x] Prettier check passes.
- [x] Production build passes.
- [x] README matches the current project structure and scripts.
- [x] No environment secrets are committed.
- [x] Changes are committed and pushed to the repository.
