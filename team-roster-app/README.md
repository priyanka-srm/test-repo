# 👥 Team Roster App

A simple React application built to practice the core concepts of React Components, Props, Composition, and PropTypes.

This project was created as part of **React Phase 2** learning using **React + Vite**.

---

## 🚀 Features

- Function Components
- Props for parent-to-child communication
- Default Props
- Read-only Props
- Children Prop
- Component Composition
- Reusable Card Component
- PropTypes Validation
- React Fragments
- Clean Component Folder Structure

---

## 📂 Project Structure

```
src
│
├── components
│   ├── Card.jsx
│   ├── TeamList.jsx
│   └── TeamMember.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧩 Components

### App

- Stores team member data.
- Passes data to the TeamList component using props.

### TeamList

- Receives team member data.
- Renders a TeamMember component for each member.

### TeamMember

- Displays a single team member.
- Receives data through props.
- Uses the reusable Card component.

### Card

- Reusable wrapper component.
- Uses the `children` prop.
- Supports a default title.

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS3
- PropTypes

---

## 📚 React Concepts Practiced

- Function Components
- Props
- Default Props
- Props Immutability
- Children Prop
- Component Composition
- Component Design
- PropTypes
- React Fragments
- Component File Organization

---

## 📸 Output

<img width="100%" alt="Team Roster App" src="./preview.png"/>

> Replace `preview.png` with your project screenshot.

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd team-roster-app
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## 🎯 Learning Outcome

This project helped me understand how to:

- Build reusable React components.
- Pass data using props.
- Use the children prop for flexible layouts.
- Apply component composition instead of inheritance.
- Validate props using PropTypes.
- Organize a React project into reusable components.

---