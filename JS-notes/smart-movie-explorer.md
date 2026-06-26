# 🎬 Smart Movie Explorer

A modern Movie Explorer Web Application built using **HTML, CSS, and JavaScript**.

This project allows users to search movies, view movie details, manage favourite movies, track recently viewed movies, and switch between themes.

The application is developed using a **modular JavaScript architecture** with ES6 Modules, where API handling, UI rendering, state management, storage, and application logic are separated into different layers.

This project demonstrates clean frontend architecture concepts using Vanilla JavaScript.

---

# 🚀 Features

✅ Search Movies using OMDB API

✅ Default Movies Loading on Application Start

✅ Movie Details Popup

✅ Recently Viewed Movies

✅ Favourite Movies

✅ Theme Toggle

✅ Theme Persistence using localStorage

✅ Loading State Handling

✅ Error State Handling

✅ Empty Search Validation

✅ Broken Poster Handling

✅ API Request Cancellation using AbortController

✅ ES6 Module Based Architecture

---

# 🧠 Concepts Practiced

## JavaScript ES6+

- ES6 Modules
- Import / Export
- Async Await
- Fetch API
- DOM Manipulation
- Event Handling
- Objects
- Object.assign()
- Error Handling
- LocalStorage
- SessionStorage

---

# 🎯 Phase 10 — Code Architecture & Modules

The main goal of this phase was converting the application into a structured modular architecture.

Instead of keeping all logic inside one JavaScript file, the application was divided into multiple modules based on responsibility.

---

# 📦 ES6 Modules

The project uses JavaScript modules to split functionality into different files.

Example:

```js
import { fetchMovies } from "./api.js";
```

Benefits:

- Better code organization
- Avoids large single files
- Easier debugging
- Easier maintenance

---

# 🏗️ Separation of Concerns

Each file is responsible for a specific part of the application.

---

# 🔹 api.js — API Layer

Responsible for handling all API related operations.

Responsibilities:

- Fetch movie search results
- Fetch movie details
- Handle API responses
- Manage AbortController


Example:

```js
fetchMovies(query)
```

API logic is separated from UI logic.

---

# 🔹 ui.js — UI Layer

Responsible only for displaying information on the screen.

Responsibilities:

- Render movie cards
- Display loading message
- Display error messages
- Show movie details popup


Example:

```js
renderMovies()
```

The UI layer does not handle API requests.

---

# 🔹 state.js — State Management

Responsible for maintaining application data.

Example:

```js
export const state = {

    movies: [],

    selectedMovie: null,

    query: "",

    loading: false,

    error: null

};
```

All application data is stored inside a centralized state object.

---

# 🔹 storage.js — Storage Layer

Responsible for browser storage operations.

Used for:

- Favourite movies
- Recently viewed movies
- Theme preference


Storage:

- localStorage
- sessionStorage

---

# 🔹 handlers.js — Application Logic

Responsible for connecting different modules.

Handles:

- User actions
- API calls
- State updates
- UI updates


Flow:

```text
User Action

      ↓

handlers.js

      ↓

api.js

      ↓

state update

      ↓

ui.js render
```

---

# 🔹 app.js — Entry Point

Responsible for:

- Application initialization
- Adding event listeners
- Connecting modules

Handles:

- Search events
- Theme toggle
- Popup close
- Default movie loading

---

# 🔄 Application Data Flow

The application follows a structured flow:

```text
User Interaction

        ↓

app.js

        ↓

handlers.js

        ↓

api.js

        ↓

state.js

        ↓

ui.js

        ↓

Updated UI
```

---

# 🧠 State Management Thinking

Instead of directly updating the DOM everywhere, application data is managed through a state object.

Example:

```js
const state = {

    movies: [],

    loading: false,

    error: null

};
```

State stores the current application information.

---

# ⚡ Error Handling

The application handles different states.

## Loading State

```text
User searches movie

        ↓

Loading message displayed
```

---

## Error State

```text
API failure

        ↓

Error message displayed
```

---

## Empty Search Validation

```text
Empty input

        ↓

Please enter movie name
```

---

# 🛡️ API Request Handling

Implemented AbortController to prevent old API responses from overwriting new search results.

Example:

```text
Search Batman

        ↓

Search Spider-Man

        ↓

Cancel previous request

        ↓

Display latest result
```

---

# 🖼️ Image Handling

Movie posters may not always exist.

Implemented fallback image handling:

```text
Poster unavailable

        ↓

Placeholder image displayed
```

---

# 💾 Data Persistence

Browser storage is used to maintain application data.

## localStorage

Used for:

- Favourite movies
- Theme preference


## sessionStorage

Used for:

- Recently viewed movies

---

# 🎨 Theme Management

Theme preference is stored and restored.

Flow:

```text
User changes theme

        ↓

Save theme

        ↓

Reload application

        ↓

Restore previous theme
```

---

# 📁 Project Structure

```text
movie-app/

├── index.html

├── css/

│   └── style.css

├── js/

│   ├── api.js

│   ├── app.js

│   ├── handlers.js

│   ├── state.js

│   ├── storage.js

│   └── ui.js

└── README.md
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- OMDB API
- LocalStorage
- SessionStorage

---

# 🎯 Challenges Solved

## Code Organization

Before:

```text
Single JavaScript file

- API calls
- DOM updates
- Storage handling
- Events
```

After:

```text
api.js
    ↓
ui.js
    ↓
state.js
    ↓
storage.js
    ↓
handlers.js
    ↓
app.js
```

Each module has a clear responsibility.

---

## Separation of Concerns

API logic, UI logic, state management, and storage handling are separated.

This makes the application easier to maintain and debug.

---

# 📌 Conclusion

Smart Movie Explorer demonstrates modern frontend development practices using Vanilla JavaScript.

The project focuses on:

- ES6 Modules
- Modular Architecture
- State Management Thinking
- API Integration
- Browser Storage Handling
- Separation of Responsibilities

This project provides a strong foundation for building scalable frontend applications.