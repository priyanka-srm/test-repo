# 🎬 Smart Movie Explorer

A responsive movie discovery web application built with **React** and **Vite**. Search for movies using the OMDb API, explore movie details, save your favorite titles, and revisit your recent searches.
---
## ✨ Features

### 🔎 Movie Search

- Search for movies by title using the OMDb API.
- Display movie posters, titles, and release years in a responsive grid.
- Show loading feedback while a search is in progress.
- Handle API errors, missing API configuration, and empty search results.
- Cancel outdated requests to avoid unnecessary results from previous searches.

### 🎞️ Movie Details

- Open a movie to view its detailed information in a modal.
- Display available information such as plot, genre, director, cast, runtime, release details, and IMDb rating.
- Provide a link to the movie's IMDb page when an IMDb ID is available.
- Close the modal using its close control or the Escape key.

### ❤️ Favorites

- Add movies to your favorites or remove them at any time.
- View saved movies in a dedicated Favorites section.
- Persist favorites using browser `localStorage`, so they remain available after refreshing the page.

### 🕘 Recent Search History

- Keep track of recent movie searches.
- Display recent searches in a dropdown below the search bar.
- Select a previous search to run it again.
- Avoid duplicate search entries and keep the most recent searches at the top.
- Clear the recent search history using the **Clear All** control.
- Persist search history using browser `localStorage`.

### 🎨 User Interface

- Modern dark-themed interface with purple accents.
- Responsive layout for desktop and mobile screens.
- Movie poster fallback when a poster is unavailable.
- Clear loading, error, and empty states.
- Accessible labels and keyboard-friendly modal interactions.

## 🛠️ Tech Stack

- **React** — component-based user interface
- **JavaScript (ES Modules)** — application logic
- **Vite** — development server and production build
- **CSS3** — responsive styling and layout
- **OMDb API** — movie search and details
- **Browser localStorage** — favorites and recent search persistence
- **ESLint** — code quality and linting

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- An OMDb API key

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd smart-movie-explorer-react
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the OMDb API key

Request an API key from the [OMDb API website](https://www.omdbapi.com/apikey.aspx).

Create a file named `.env.local` in the project root, alongside `package.json`, and add:

```env
VITE_OMDB_API_KEY=your_actual_api_key
```

Replace `your_actual_api_key` with your own API key.

**Security note:** Do not commit `.env.local` or expose your real API key in source code, screenshots, or public repositories. Make sure the file is covered by `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

If you add or change environment variables while the server is running, restart the development server.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run lint` | Checks the code using ESLint |
| `npm run build` | Creates a production build in the `dist` folder |

## 📂 Project Structure

```text
smart-movie-explorer-react/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.local          # Local API key; do not commit
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
└── vite.config.js
```

The exact contents of `src/assets/` and `public/` may vary depending on the project files.

## 🧪 Verification

Before committing or submitting the project, run:

```bash
npm run lint
npm run build
```

Both commands should complete successfully.

Also manually verify the main user flows:

- Search for a movie and open its details.
- Test an unavailable search term and an API error scenario.
- Add and remove a favorite, then refresh the page.
- Select a recent search and run it again.
- Clear recent searches and confirm that Favorites remain saved.
- Test the layout on desktop and mobile.
- Confirm that the API key is not included in Git-tracked files.

## 🔐 API and Data

Movie information is provided by the [OMDb API](https://www.omdbapi.com/). API access is subject to the provider's availability, usage limits, and terms.

Favorites and recent search history are stored locally in the user's browser. They are not automatically synchronized across devices.

---- 

## 📌 Future Improvements

Possible enhancements include:

- Automated unit and component tests
- Pagination or a Load More feature
- Improved filtering and sorting
- Deployment and a live demo link
- Additional accessibility improvements

These are potential future enhancements, not claims about currently implemented functionality.

