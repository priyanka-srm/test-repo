# 🔍 Live Search App

A React-based Live Search Application that allows users to search through a list of users dynamically with debounce functionality for better performance.

## 🚀 Features

- 🔎 Real-time search functionality
- ⏳ Debounced search input (500ms delay)
- 🎯 Search users by name and role
- 🧩 Reusable Custom Input component using forwardRef
- ⚡ Auto-focus search input using useRef
- 🔄 Previous search tracking using useRef
- 🧹 useEffect cleanup handling
- 📊 Dynamic result count display
- ❌ Displays "No users found" when there are no matches

---

## 🛠️ Technologies Used

- React JS
- JavaScript (ES6+)
- Vite
- CSS

### React Hooks Used

- useState
- useEffect
- useRef
- forwardRef

---

## 📂 Project Structure

```
live-search-app
│
├── src
│   │
│   ├── components
│   │   ├── SearchBar.jsx
│   │   ├── SearchResults.jsx
│   │   └── CustomInput.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## ⚙️ How It Works

1. User enters text in the search box.
2. Input value is captured using controlled components.
3. A debounce mechanism waits for 500ms before updating the search query.
4. SearchResults filters users based on:
   - User name
   - User role
5. Matching results are displayed dynamically.

---

## 🧠 React Concepts Practiced

### useState

Used for managing search query state and updating UI based on user input.

### useEffect

Used for:

- Monitoring search changes
- Implementing debounce logic
- Handling cleanup operations

### useRef

Used for:

- Auto focusing input field
- Tracking previous search value
- Storing mutable values without triggering re-render

### forwardRef

Used to create a reusable input component while forwarding refs from parent component to child component.

---

## ▶️ Installation & Setup

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to project folder:

```bash
cd live-search-app
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

---

## 📚 Learning Outcomes

Through this project, I learned:

- React component-based architecture
- Managing state using Hooks
- Handling side effects using useEffect
- Working with refs using useRef
- Forwarding refs using forwardRef
- Implementing debounce for optimized search
- Building reusable React components

---