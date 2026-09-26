# TestFlow

A practical React task management application built as part of a React Testing Lab to explore component testing, user interactions, API states, custom hooks, accessibility, and reliable UI workflows.

## 🚀 Overview

TestFlow is a React-based task management application designed to demonstrate how a modern React application can be tested from both component and user-interaction perspectives.

The application provides a practical workboard where users can create, search, filter, complete, and delete tasks. It also handles loading, error, empty, validation, and rollback states to simulate realistic application behavior.

The main goal of this project is not only to build the application, but also to understand how to write meaningful tests for real user workflows and application states.

## ✨ Features

- View tasks in a responsive workboard
- Display the active task count
- Create new tasks through an accessible modal form
- Validate required task fields
- Add task descriptions
- Set task priority
- Search tasks by title
- Search tasks by description
- Filter tasks by All, Active, and Completed status
- Mark tasks as completed
- Mark completed tasks as active
- Delete tasks
- Handle API loading states
- Handle API error states
- Handle empty task states
- Handle form validation errors
- Roll back task updates when an API request fails
- Roll back task deletion when an API request fails
- Accessible form labels and interactive controls
- Component testing
- User interaction testing
- Custom hook testing
- API/service testing
- Snapshot testing

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- Vitest
- React Testing Library
- Testing Library User Event
- Testing Library Jest DOM
- JSON Server
- CSS
- ESLint

## 📁 Project Structure

    testflow/
    ├── db.json
    ├── src/
    │   ├── __snapshots__/
    │   │   └── App.test.jsx.snap
    │   ├── data/
    │   │   └── tasks.js
    │   ├── hooks/
    │   │   └── useTaskFilters.js
    │   ├── services/
    │   │   └── taskApi.js
    │   ├── App.css
    │   ├── App.jsx
    │   ├── App.test.jsx
    │   └── main.jsx
    ├── package.json
    └── README.md

## 🧩 Application Architecture

TestFlow separates the main responsibilities of the application into different areas.

### App Component

`App.jsx` manages the main task dashboard and user interactions.

It handles:

- Loading tasks
- Creating tasks
- Updating tasks
- Deleting tasks
- Searching tasks
- Filtering tasks
- Managing the Add Task modal
- Managing form state
- Handling loading states
- Handling API errors
- Handling optimistic UI updates and rollback behavior

### Custom Hook

`useTaskFilters.js` contains the filtering logic for the task list.

It supports:

- Searching by task title
- Searching by task description
- Filtering active tasks
- Filtering completed tasks
- Displaying all tasks
- Updating filtered results when search or status changes

Keeping filtering logic inside a custom hook makes the logic easier to maintain and test independently.

### API Service

`taskApi.js` provides a separate service layer for API operations.

It handles:

- Fetching tasks
- Creating tasks
- Updating tasks
- Deleting tasks

Separating API communication from the UI keeps `App.jsx` focused on application behavior and user interactions.

### Local Data

`db.json` provides local task data for development using JSON Server.

## 🧪 Testing

TestFlow uses Vitest and React Testing Library to verify application behavior from a user's perspective.

The test suite focuses on realistic user workflows rather than only testing implementation details.

### Dashboard Testing

- Renders the task dashboard
- Loads tasks when the application starts
- Displays the active task count
- Displays the task workboard correctly

### Loading State Testing

- Displays the loading state while tasks are being fetched
- Uses an accessible status element for loading feedback

### Task Creation Testing

- Opens the Add Task modal
- Displays the task creation form
- Validates the required task title
- Validates the required task description
- Allows task priority selection
- Creates a task successfully
- Sends the correct task data to the API
- Displays the newly created task immediately

### Task Update Testing

- Marks an active task as completed
- Changes a completed task back to active
- Calls the update API with the correct task data
- Updates the UI after a successful request
- Rolls back the UI when the update request fails

### Task Deletion Testing

- Deletes a task
- Calls the delete API with the correct task ID
- Removes the deleted task from the UI
- Rolls back the UI when the delete request fails

### Search Testing

- Searches tasks by title
- Searches tasks by description
- Updates results based on the search query
- Displays the no-results state when no task matches the search

### Filter Testing

- Displays all tasks
- Filters active tasks
- Filters completed tasks
- Switches back to all tasks
- Updates the displayed tasks when the filter changes

### API State Testing

- Loading state
- Successful API response
- API error state
- Empty API response
- Optimistic update behavior
- Rollback behavior after failed API requests

### Custom Hook Testing

The `useTaskFilters` custom hook is tested independently.

The tests verify:

- Returning all tasks when no filters are applied
- Filtering by task title
- Filtering by task description
- Filtering active tasks
- Filtering completed tasks
- Updating results when filter state changes

## 📊 Test Result

The final automated test suite contains 35 tests.

Test Files: 1 passed

Tests: 35 passed

All 35 tests passed successfully.

## ▶️ Getting Started

### 1. Clone the Repository

    git clone https://github.com/priyanka-srm/test-repo.git

### 2. Navigate to the Project

    cd test-repo/testflow

### 3. Install Dependencies

    npm install

### 4. Start the Development Server

    npm run dev

The application will be available at:

    http://localhost:5173/

### 5. Start JSON Server

Open another terminal in the project directory and run:

    npx json-server --watch db.json --port 3000

The local API will be available at:

    http://localhost:3000/tasks

### 6. Run the Test Suite

    npm test -- --run

## 🔌 API

TestFlow uses a dedicated service layer for task-related API operations.

The API service is responsible for communicating with the local JSON Server.

### Available Operations

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

The API logic is maintained in:

    src/services/taskApi.js

This keeps network-related logic separate from the main React component.

## ♿ Accessibility

Accessibility was considered throughout the application.

The project includes:

- Semantic HTML elements
- Proper labels for form controls
- Accessible button names
- Accessible task action controls
- `role="status"` for loading and empty states
- `role="alert"` for error messages
- Accessible modal dialog structure
- `aria-modal="true"` for the task creation dialog
- `aria-labelledby` for the modal heading
- Descriptive `aria-label` values for task actions
- Keyboard-friendly form controls
- Visible focus states

## 🎯 Learning Objectives

This project was created to strengthen practical React testing skills.

The main learning objectives were:

- Understand component testing
- Write tests from the user's perspective
- Test real user interactions
- Test asynchronous UI behavior
- Test API states
- Mock API behavior
- Test custom hooks
- Test form validation
- Test optimistic UI updates
- Test rollback behavior
- Test loading, error, and empty states
- Use accessible Testing Library queries
- Understand snapshot testing
- Write maintainable test cases
- Separate API logic from UI logic

## 💡 Key Concepts Practiced

Through TestFlow, the following React concepts were practiced:

- React state management
- Controlled form inputs
- Conditional rendering
- Event handling
- Custom hooks
- API integration
- Asynchronous operations
- Optimistic UI updates
- Error handling
- Rollback logic
- Accessibility
- Component testing
- User interaction testing
- Integration-style testing
- Snapshot testing
- Service layer separation

## 🖥️ Browser Verification

Before completing the project, the application was manually verified in the browser.

The following workflows were tested successfully:

- Dashboard loading
- Existing task display
- Add Task modal
- Task creation
- Newly created task appearing immediately
- Search functionality
- Status filtering
- Task completion
- Task deletion
- Page refresh

Browser Verification: 9/9 Passed

## 📸 Application Workflow

The main TestFlow workflow includes:

    Open TestFlow
          ↓
    Load Tasks
          ↓
    View Workboard
          ↓
    Search / Filter Tasks
          ↓
    Create / Complete / Delete Tasks
          ↓
    API Request
          ↓
    Update UI
          ↓
    Handle Success / Error / Rollback

## 🧪 Testing Workflow

The testing workflow followed during development was:

    Build Feature
          ↓
    Write / Update Tests
          ↓
    Run Vitest
          ↓
    Fix Failures
          ↓
    Run Tests Again
          ↓
    Verify Browser UI
          ↓
    Confirm All Tests Pass
          ↓
    Git Commit
          ↓
    Git Push

## 📌 Project Status

**Completed**

The project has been fully implemented, tested, manually verified, committed, and pushed to GitHub.

### Final Verification

- React application: Completed
- Testing implementation: Completed
- API/service layer: Completed
- Custom hook: Completed
- Accessibility: Implemented
- Browser verification: 9/9 passed
- Automated tests: 35/35 passed
- Git commit: Completed
- GitHub push: Completed
- Working tree: Clean

