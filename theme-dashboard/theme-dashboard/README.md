# 🌗 Theme Dashboard

A simple React project demonstrating the **Context API** to eliminate prop drilling and manage a global theme state. Users can switch between Light Mode and Dark Mode, and the selected theme is shared across multiple components without passing props manually.

---

## 📌 Project Overview

This project was built as part of **React Phase 6 – Context API & Avoiding Prop Drilling**.

The main goal was to understand how React Context allows components to access shared data directly without passing props through intermediate components.

---

## 🚀 Features

- 🌗 Global Theme Management
- 🔄 Light / Dark Mode Toggle
- 🚫 No Prop Drilling
- ⚛️ React Context API
- 🪝 Custom Hook (`useTheme`)
- 📂 Clean Folder Structure
- 📱 Responsive Layout

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS3
- React Context API
- React Hooks

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── ProfileCard.jsx
│   └── Settings.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── hooks/
│   └── useTheme.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## 🧠 React Concepts Used (Phase 6)

### ✅ Context API

Created a global ThemeContext using `createContext()`.

```jsx
export const ThemeContext = createContext();
```

---

### ✅ ThemeProvider

Wrapped the entire application with a Provider to share theme state.

```jsx
<ThemeProvider>
    <App />
</ThemeProvider>
```

---

### ✅ useContext()

Consumed global theme values inside multiple components.

```jsx
const { theme } = useTheme();
```

---

### ✅ Custom Hook

Created a reusable custom Hook.

```jsx
useTheme()
```

instead of repeatedly writing

```jsx
useContext(ThemeContext)
```

---

### ✅ Global State Sharing

Shared one state across multiple components.

Components using Context:

- Header
- Sidebar
- ProfileCard
- Settings

---

### ✅ Theme Toggle

Implemented a global theme switch.

```jsx
setTheme(prev =>
    prev === "light" ? "dark" : "light"
);
```

---

## 🎯 Learning Outcomes

Through this project I learned:

- What Prop Drilling is
- Why Prop Drilling becomes difficult
- How Context API solves it
- How createContext works
- How Provider shares data
- How useContext reads shared values
- How to create custom Hooks
- Managing global state in React
- Structuring React projects using Context

---

## 📷 Application Flow

```
ThemeProvider
       │
       ▼
-------------------------
|         App           |
-------------------------
       │
 ┌─────┼────────┐
 │     │        │
 ▼     ▼        ▼
Header Sidebar ProfileCard
              │
              ▼
          Settings

All components access the same Context.
```

---

## 💡 Why Context API?

Without Context:

```
App
 ↓
Layout
 ↓
Sidebar
 ↓
ProfileCard
```

Theme would have to be passed through every component.

With Context:

```
ThemeProvider
      │
      ▼
Any Component
```

No unnecessary prop passing.

---

## 🔮 Future Improvements

- Persist selected theme using LocalStorage
- Add more themes
- Memoize Provider value using `useMemo`
- Create separate ThemeProvider and AppProviders
- Add animations during theme switching

---

## 📚 Key React APIs Used

- createContext()
- Context.Provider
- useContext()
- useState()
- Custom Hooks

---

## ▶️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

