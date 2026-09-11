# StyleFlow Navbar

A responsive React styling playground built as part of **Phase 13 – Styling in React**.

StyleFlow demonstrates how different styling strategies can be combined with clean React component architecture to create a modern, responsive and accessible interface.

---

## 📌 Project Overview

**StyleFlow** is a frontend practice project focused on understanding and implementing different styling approaches in React.

The project demonstrates:

- CSS Modules
- Global CSS
- Conditional class names using `clsx`
- Inline styles
- Tailwind CSS
- Responsive component architecture
- Custom `useMediaQuery` hook
- Light/Dark theme switching
- Theme persistence using `localStorage`
- Responsive navigation
- Active navigation states
- Smooth section navigation
- Accessibility and keyboard-friendly interactions
- Responsive desktop and mobile layouts

The main goal of this project is to understand **when and why different styling techniques should be used in React applications**.

---

## 🎯 Objectives

The main objectives of this project are:

1. Understand different styling approaches in React.
2. Build reusable and maintainable components.
3. Implement responsive navigation.
4. Create separate desktop and mobile navigation components.
5. Implement light and dark theme switching.
6. Persist theme preference using `localStorage`.
7. Use `clsx` for conditional class handling.
8. Use CSS Modules for scoped component styling.
9. Use Tailwind CSS for utility-based styling.
10. Improve accessibility and keyboard navigation.
11. Create a clean and professional UI.
12. Practice component-based React architecture.

---

## ✨ Features

### 1. Responsive Navbar

The application includes a responsive navigation system that adapts based on screen size.

Desktop and mobile navigation are handled using separate components:

- `DesktopNav`
- `MobileNav`

The application uses a custom `useMediaQuery` hook to determine which navigation component should be rendered.

---

### 2. Navigation Sections

The navbar provides navigation to:

- Home
- Features
- Components
- About
- Contact

Each navigation item uses section IDs and hash links for smooth navigation.

Example:

```jsx
<a href="#features">Features</a>
```

---

### 3. Active Navigation State

The currently selected navigation item is tracked using React state.

The application also listens for URL hash changes to keep the active navigation state synchronized with the current section.

This provides better visual feedback while navigating through the page.

---

### 4. Light / Dark Theme

StyleFlow includes a theme toggle that allows users to switch between:

- Light Mode
- Dark Mode

The theme is applied using a data attribute on the root HTML element.

```js
document.documentElement.dataset.theme = theme;
```

---

### 5. Theme Persistence

The selected theme is stored in `localStorage`.

This means the user's theme preference remains available even after refreshing the page.

```js
localStorage.setItem("styleflow-theme", theme);
```

The application also safely handles `localStorage` errors.

---

### 6. CSS Modules

CSS Modules are used for component-level styling.

Example:

```jsx
import styles from "./Navbar.module.css";
```

This keeps styles scoped to the component and reduces the possibility of class-name conflicts.

---

### 7. Conditional Styling with clsx

The project uses `clsx` to conditionally apply CSS classes.

Example:

```jsx
className={clsx(
  styles.navLink,
  activeId === item.id && styles.active,
  item.disabled && styles.disabled
)}
```

This makes conditional styling cleaner and easier to maintain.

---

### 8. Inline Styling

Inline styles are demonstrated as part of the Phase 13 styling concepts.

They can be useful when styling depends on runtime values or component state.

---

### 9. Tailwind CSS

Tailwind CSS is also demonstrated through the `TailwindBadge` component.

This project intentionally shows how utility-based styling can coexist with other styling approaches.

---

### 10. Responsive Design

The UI is designed to work across different screen sizes.

Responsive behavior is handled using:

- CSS media queries
- Responsive layouts
- `useMediaQuery`
- Separate desktop/mobile components
- Flexible containers
- Mobile-friendly buttons

---

### 11. Accessibility

Accessibility was considered throughout the project.

The interface includes:

- Semantic HTML
- Navigation landmarks
- `aria-label`
- `aria-current`
- `aria-disabled`
- Keyboard-friendly buttons and links
- `focus-visible` states
- Decorative SVG icons marked with `aria-hidden`
- Good text/background contrast

Example:

```jsx
<nav aria-label="Primary navigation">
```

---

### 12. Smooth Scrolling

The application uses smooth scrolling for section navigation.

```css
html {
  scroll-behavior: smooth;
}
```

Scroll positioning is also adjusted so that sections do not get hidden behind the fixed navigation area.

---

### 13. Contact Section

A dedicated Contact section was added so the Contact navigation item points to a real section.

The Contact section includes:

- Project description
- Contact CTA
- Back to top action

The Contact button uses a `mailto:` link.

```jsx
<a
  href="mailto:yourname@gmail.com"
  className="primary-button"
>
  Contact me
</a>
```

> Replace `yourname@gmail.com` with your professional email address before submitting the project.

---

## 🧩 Styling Strategies Used

| Styling Approach | Purpose |
|---|---|
| Global CSS | Application-wide layout and theme styling |
| CSS Modules | Scoped component styling |
| clsx | Conditional class names |
| Inline Styles | Dynamic/runtime styling |
| Tailwind CSS | Utility-based styling |
| Media Queries | Responsive layout |
| useMediaQuery | Responsive component switching |

---

## 🏗️ Project Structure

```text
styleflow-navbar/
│
├── src/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   │
│   ├── components/
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── DesktopNav.jsx
│   │   │   └── MobileNav.jsx
│   │   │
│   │   ├── TailwindBadge.jsx
│   │   │
│   │   └── ThemeIndicator/
│   │       └── ThemeIndicator.jsx
│   │
│   └── hooks/
│       └── useMediaQuery.js
│
├── public/
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚛️ Component Architecture

The project follows a reusable component-based structure.

### App.jsx

The main application component.

It contains:

- Hero section
- Features section
- Components section
- About section
- Contact section
- Coming Soon section
- Footer

---

### Navbar.jsx

Responsible for:

- Theme state
- Active navigation state
- Theme persistence
- Hash change handling
- Responsive component selection

---

### DesktopNav.jsx

Responsible for rendering the desktop navigation interface.

It includes:

- Navigation links
- Active state
- Theme indicator
- Theme toggle button

---

### MobileNav.jsx

Responsible for rendering the mobile navigation interface.

It provides a mobile-friendly navigation experience for smaller screens.

---

### ThemeIndicator.jsx

Displays the current theme status.

It helps visually communicate whether the application is currently using light or dark mode.

---

### TailwindBadge.jsx

Demonstrates Tailwind CSS usage inside the project.

---

### useMediaQuery.js

A reusable custom React hook used to detect media query changes.

It helps the application switch between desktop and mobile navigation components.

---

## 🧠 React Concepts Practiced

This project helped practice several important React concepts.

### React State

Used for:

- Theme management
- Active navigation management

Example:

```jsx
const [theme, setTheme] = useState(getInitialTheme);
const [activeId, setActiveId] = useState(getInitialActiveId);
```

---

### useEffect

Used for:

- Applying themes
- Persisting theme preferences
- Listening to hash changes
- Cleaning up event listeners

---

### Custom Hooks

A custom `useMediaQuery` hook was created to handle responsive behavior.

---

### Component Props

Data and event handlers are passed between components.

Example:

```jsx
<DesktopNav
  items={NAV_ITEMS}
  theme={theme}
  activeId={activeId}
  onNavigate={handleNavigate}
  onToggleTheme={handleThemeToggle}
/>
```

---

### Conditional Rendering

The application conditionally renders desktop or mobile navigation.

```jsx
{isDesktop ? (
  <DesktopNav />
) : (
  <MobileNav />
)}
```

---

## 🎨 UI Sections

### Hero Section

Introduces the project with:

- Project title
- Description
- Primary CTA
- Secondary CTA
- System status card
- Responsive architecture information

---

### Features Section

Highlights three major project concepts:

#### 01 — Scoped Styling

CSS Modules provide isolated component styles.

#### 02 — Conditional Classes

`clsx` manages dynamic class names.

#### 03 — Responsive Architecture

CSS and `useMediaQuery` work together to create responsive behavior.

---

### Components Section

Demonstrates the styling toolkit:

- CSS Modules
- clsx
- Inline Styles
- Tailwind
- Responsive styling
- Accessibility

---

### About Section

Explains the design principles used in the project:

- Clean code
- Strong contrast
- Responsive design
- Keyboard accessibility
- Mobile-first safety
- Theme persistence

---

### Contact Section

Provides a simple contact CTA and a Back to Top action.

---

### Coming Soon Section

Demonstrates disabled-state styling and interaction handling.

---

## 🌙 Theme System

The project supports two themes:

```text
Light
Dark
```

The selected theme is stored using:

```text
styleflow-theme
```

in browser `localStorage`.

The theme is applied using:

```html
<html data-theme="light">
```

or:

```html
<html data-theme="dark">
```

---

## 📱 Responsive Behavior

The application adapts to different screen sizes.

### Desktop

The desktop navigation is displayed when the viewport matches:

```text
min-width: 768px
```

### Mobile

The mobile navigation is displayed below the desktop breakpoint.

This provides a better navigation experience on smaller devices.

---

## ♿ Accessibility Considerations

Accessibility improvements included in the project:

- Semantic `<nav>` element
- Semantic `<main>` element
- Semantic `<section>` elements
- Semantic `<footer>` element
- Accessible button labels
- `aria-current` for active navigation
- `aria-disabled` for disabled navigation items
- `aria-hidden` for decorative SVG icons
- Keyboard focus styles
- `focus-visible` states
- Readable contrast
- Responsive layouts

---

## 🛠️ Technologies Used

### Frontend

- React
- JavaScript
- HTML5
- CSS3

### Styling

- CSS
- CSS Modules
- Tailwind CSS
- clsx

### Build Tool

- Vite

### Browser Storage

- localStorage

---

## 📦 Dependencies

Main dependencies used in the project include:

```text
react
react-dom
clsx
```

Tailwind CSS is also configured for the styling demonstration.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate into the project

```bash
cd styleflow-navbar
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Vite will provide a local development URL similar to:

```text
http://localhost:5173
```

Open the URL in a browser.

---

## 🧪 Testing Checklist

Before submitting the project, verify the following:

- [ ] Navbar loads correctly
- [ ] Home navigation works
- [ ] Features navigation works
- [ ] Components navigation works
- [ ] About navigation works
- [ ] Contact navigation works
- [ ] Smooth scrolling works
- [ ] Active navigation state updates
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Theme persists after refresh
- [ ] Desktop navigation works
- [ ] Mobile navigation works
- [ ] Contact button opens email handler
- [ ] Back to top works
- [ ] Keyboard focus is visible
- [ ] No horizontal overflow
- [ ] Layout works on smaller screens

---

## 📚 Key Learnings

Through this project, I practiced:

- React component architecture
- Reusable components
- Props and state
- `useState`
- `useEffect`
- Custom hooks
- Responsive design
- CSS Modules
- Global CSS
- Tailwind CSS
- Conditional classes using `clsx`
- Inline styling
- Browser `localStorage`
- Hash-based navigation
- Theme management
- Accessibility
- Keyboard navigation
- Mobile-first UI development

---

## 💡 Design Philosophy

StyleFlow follows a simple design philosophy:

> **Clean code. Strong contrast. Responsive by design.**

The goal is not just to make the interface visually attractive, but also to make the code:

- Readable
- Reusable
- Maintainable
- Accessible
- Responsive
- Easy to extend

---

## 🔮 Future Improvements

Possible future improvements include:

- Add more reusable UI components
- Add animations and transitions
- Add a component showcase page
- Add more Tailwind examples
- Add form validation
- Add contact form functionality
- Add unit testing
- Add automated accessibility testing
- Deploy the application online
- Add a project gallery

---



## 📌 Phase

```text
PHASE 13 — STYLING IN REACT
```

---

## ⭐ Project Summary

StyleFlow is a responsive React styling playground created to demonstrate multiple styling techniques and modern frontend development practices.

The project combines:

```text
React
+
CSS Modules
+
Global CSS
+
clsx
+
Inline Styles
+
Tailwind CSS
+
Responsive Design
+
Accessibility
+
Theme Persistence
```

The project demonstrates how these techniques can be combined in a structured React application while keeping the interface clean, responsive and maintainable.

---

## 🏁 Final Status

```text
Project: StyleFlow Navbar
Phase: 13 – Styling in React
Status: Completed
Responsive: Yes
Dark Mode: Yes
Light Mode: Yes
Theme Persistence: Yes
Desktop Navigation: Yes
Mobile Navigation: Yes
Accessibility: Implemented
Smooth Navigation: Yes
Contact Section: Yes
```

