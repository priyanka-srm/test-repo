# Accessibility Lab

A React-based accessibility practice project focused on building interfaces that are usable with keyboards, assistive technologies, and different interaction preferences.

This project demonstrates practical accessibility patterns including semantic HTML, keyboard navigation, ARIA attributes, accessible forms, live status updates, React Portals, and deliberate focus management.

## ✨ Features

- Semantic HTML landmarks using `header`, `nav`, `main`, `section`, `aside`, and `footer`
- Accessible navigation with meaningful link labels
- Keyboard-friendly native buttons and form controls
- Visible `:focus-visible` styles for keyboard users
- Accessible icon-only favorite button
- Dynamic `aria-label` for favorite state
- `aria-pressed` for toggle state
- Accessible confirmation modal using React Portal
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` and `aria-describedby` for dialog context
- Escape key support for closing the modal
- Focus moved into the modal when it opens
- Focus restored to the previously active element when the modal closes
- Accessible form labels using `htmlFor`
- Controlled React form inputs
- Custom form validation
- Accessible validation feedback
- Accessible live status messages using `aria-live`
- Successful form submission feedback
- Responsive layout for smaller screens
- Reduced-motion support using `prefers-reduced-motion`

## 🧩 Accessibility Concepts Demonstrated

### Semantic HTML

The application uses meaningful HTML elements instead of relying entirely on generic `<div>` elements.

Examples include:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<aside>`
- `<footer>`
- `<form>`
- `<button>`

This creates a more understandable structure for both users and assistive technologies.

### Keyboard Navigation

The interface is designed to work without requiring a mouse.

Important interactions can be performed using:

- `Tab`
- `Shift + Tab`
- `Enter`
- `Space`
- `Escape`

Native HTML controls are used wherever possible so that built-in keyboard behavior is preserved.

### Focus Management

The confirmation dialog demonstrates deliberate focus management.

When the modal opens:

1. The previously focused element is stored.
2. Focus moves into the modal heading.
3. Pressing `Escape` closes the dialog.
4. When the modal closes, focus returns to the element that opened it.

### Accessible ARIA Usage

ARIA is used where it adds meaningful information that native HTML alone cannot provide.

Examples include:

- `aria-label`
- `aria-pressed`
- `aria-modal`
- `aria-labelledby`
- `aria-describedby`
- `aria-live`

Decorative icons are hidden from assistive technologies using `aria-hidden="true"`.

### Accessible Favorite Button

The favorite control is implemented as a native button with an accessible name and toggle state.

The button uses:

- `aria-label` to provide a meaningful accessible name
- `aria-pressed` to communicate the current toggle state
- `aria-hidden="true"` for the decorative star icon

The accessible name changes depending on the current favorite state.

### Accessible Feedback Form

The feedback form uses controlled React state and custom validation.

The form includes:

- Proper labels
- `htmlFor` and matching input IDs
- Required fields
- Controlled inputs
- Email input type
- Checkbox control
- Validation feedback
- Live status messaging
- Successful submission feedback

Dynamic form status messages use `aria-live="polite"` and `role="status"` so that important feedback can be communicated to assistive technologies.

## 🪟 Accessible Modal

The confirmation modal is implemented using React Portal.

The dialog includes:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`
- `aria-describedby`
- Accessible close button
- Escape key support
- Focus management
- Focus restoration
- Native buttons for actions

The modal is rendered using React's `createPortal()` API, allowing it to be mounted outside the normal component DOM hierarchy while remaining part of the React application.

## 🛠️ Tech Stack

- React
- JavaScript
- Vite
- HTML5
- CSS3

## 📁 Project Structure

src/
├── components/
│   ├── AccessibleModal.jsx
│   ├── FavoriteButton.jsx
│   └── FeedbackForm.jsx
│
├── App.jsx
├── App.css
└── main.jsx

## 🚀 Getting Started

### 1. Clone the repository

git clone <your-repository-url>

### 2. Navigate into the project

cd <project-folder>

### 3. Install dependencies

npm install

### 4. Start the development server

npm run dev

Open the local development URL shown by Vite in your browser.

## 🧪 Accessibility Testing

The project was manually tested for:

- Keyboard-only navigation
- Visible keyboard focus
- Modal opening and closing
- Escape key interaction
- Focus restoration after modal close
- Favorite button keyboard interaction
- Favorite toggle state
- Empty form validation
- Invalid form submission
- Accessible validation feedback
- Successful form submission
- Responsive behavior

## ♿ Accessibility Highlights

### Prefer Native HTML

Native buttons, links, inputs, checkboxes, and forms are used instead of recreating their behavior with generic elements.

### Use ARIA Intentionally

ARIA is added to communicate states, relationships, and dynamic information where it provides additional accessibility context.

### Keyboard Accessibility

Important interactions can be completed using the keyboard without requiring a mouse.

### Focus Management

The modal demonstrates deliberate focus movement when opening and focus restoration when closing.

### Live Feedback

Dynamic success and validation messages use accessible live regions so users can receive feedback when the interface changes.

### Reduced Motion

The project respects user motion preferences using the CSS `prefers-reduced-motion` media query.

Animations and transitions are reduced when the user has requested reduced motion.

## 🎯 Project Goal

The goal of this project was to move beyond simply making a React interface look good and instead build an interface that is:

- Semantic
- Keyboard accessible
- Screen-reader friendly
- Responsive
- Predictable to interact with
- Deliberate about focus management

## 📚 What I Practiced

Through this project, I practiced:

- Semantic HTML
- Accessible component structure
- Keyboard interaction
- Focus management
- React state management
- Controlled forms
- Form validation
- ARIA attributes
- Live regions
- React Portals
- Responsive CSS
- Accessibility-focused UI testing
