# ⚛️ React Phase 8 Practice

A React project demonstrating **Lists, Keys, Conditional Rendering, Component Composition, Render Props, and React Portals** through practical mini implementations.

---

## 📌 Project Overview

This project was built as part of **React Phase 8 – Lists, Keys, Conditional Rendering, Composition & Portals**.

The main goal was to understand how React renders dynamic lists, manages list identity using stable keys, conditionally displays UI, shares behavior through Render Props, composes components using `children`, and renders UI outside its normal DOM hierarchy using Portals.

---

## 🚀 Features

- 📋 Dynamic List Rendering using `.map()`
- 🔑 Stable React Keys
- 🎛️ Conditional Rendering
- 🧩 Component Composition
- 👶 `children` Prop
- 🔄 Render Props Pattern
- 🔔 Conditional Notifications
- 🗑️ Removable Product List
- 🪟 Portal-based Modal
- 🚫 Portal tested with `overflow: hidden`
- 📱 Responsive Layout
- 📂 Clean Component Structure

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- JSX
- CSS3
- React Hooks
- React `createPortal()`

---

## 📁 Folder Structure

src/
│
├── components/
│   ├── Accordion.jsx
│   ├── AccordionItem.jsx
│   ├── KeyPractice.jsx
│   ├── Modal.jsx
│   ├── Notification.jsx
│   └── Toggle.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

---

## 🧠 React Concepts Used (Phase 8)

### ✅ Rendering Lists

Used `.map()` to dynamically render FAQ and product data.

Example:

    faqData.map((faq) => (
        <AccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
        />
    ))

This allows React UI to be generated directly from JavaScript data.

---

### ✅ Stable Keys

Used unique and stable IDs as React keys.

    key={faq.id}

and:

    key={product.id}

Stable keys help React correctly identify list items when the list changes.

The project uses stable IDs instead of array indexes for the actual implementation.

---

### ✅ Conditional Rendering

Implemented multiple conditional rendering techniques.

#### `&&` Operator

    {isOpen && (
        <div className="accordion-content">
            <p>{answer}</p>
        </div>
    )}

Used when UI should only be displayed when a condition is true.

---

### ✅ Ternary Operator

Used a ternary expression to change the Toggle button text.

    {isOpen ? "Hide Message" : "Show Message"}

---

### ✅ Early Return

The Notification component uses an early return when there is no message.

    if (!message) {
        return null;
    }

This prevents unnecessary UI from being rendered.

---

### ✅ `return null`

Used to intentionally render nothing when the Notification does not have a message.

    if (!message) {
        return null;
    }

---

### ✅ `children` Prop

The Accordion component receives its content through `children`.

    function Accordion({ children }) {
        return (
            <div className="accordion">
                {children}
            </div>
        );
    }

This allows the Accordion component to remain reusable without knowing what content will be placed inside it.

---

### ✅ Component Composition

The Accordion was built by composing smaller components.

    Accordion
        │
        ├── AccordionItem
        │       ├── Question
        │       └── Answer
        │
        ├── AccordionItem
        │       ├── Question
        │       └── Answer
        │
        └── AccordionItem
                ├── Question
                └── Answer

Instead of creating one large component, the UI is divided into reusable components.

---

### ✅ Render Props

Created a `Toggle` component to demonstrate the Render Props pattern.

    function Toggle({ children }) {
        const [isOpen, setIsOpen] = useState(false);

        function handleToggle() {
            setIsOpen((current) => !current);
        }

        return children(isOpen, handleToggle);
    }

The component shares its state and behavior through a function passed as `children`.

The consuming component controls how the UI should be rendered.

---

### ✅ Product List and Stable Keys

Created a product list containing:

- Product ID
- Product name
- Product price

Each product is rendered using `.map()`.

    {products.map((product) => (
        <div
            className="product-item"
            key={product.id}
        >
            ...
        </div>
    ))}

---

### ✅ Removing List Items

Products can be removed from the list using `filter()`.

    function removeProduct(id) {
        setProducts((currentProducts) =>
            currentProducts.filter(
                (product) => product.id !== id
            )
        );
    }

This demonstrates updating an array in React state without mutating the original array.

---

### ✅ React Portals

Created a Modal using React's `createPortal()` API.

    import { createPortal } from "react-dom";

The Modal is rendered into a separate DOM element:

    <div id="root"></div>
    <div id="modal-root"></div>

The Modal uses:

    createPortal(
        <div className="modal-overlay">
            ...
        </div>,
        modalRoot
    )

This allows the Modal to visually escape its parent container.

---

### ✅ `overflow: hidden` Portal Test

The Modal was intentionally placed inside a container with:

    overflow: hidden;

The Modal still appears correctly because it is rendered into `#modal-root` instead of remaining inside the restricted parent DOM container.

This demonstrates one practical use case of React Portals.

---

## 🎯 Learning Outcomes

Through this project I learned:

- How `.map()` is used to render dynamic lists
- Why React requires keys for list items
- Why stable keys are preferred over array indexes
- How conditional rendering works
- When to use `&&`
- When to use a ternary operator
- How early returns work
- How `return null` prevents rendering
- How the `children` prop works
- How component composition works
- What the Render Props pattern is
- How state and behavior can be shared using Render Props
- How to remove items from React state using `filter()`
- How React Portals work
- How `createPortal()` renders UI into another DOM node
- Why Portals are useful for Modal-based UI
- How Portals can escape parent layout restrictions such as `overflow: hidden`

---

## 📷 Application Flow

                    React Phase 8
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Accordion       Render Props    Conditional UI
        │                │                │
        ▼                ▼                ▼
     children          Toggle       Notification
        │
        ▼
 AccordionItem

                         │
                         ▼
                  Stable Key Practice
                         │
                         ▼
                   Product List
                         │
                         ▼
                      Remove

                         │
                         ▼
                    Portal Modal
                         │
                         ▼
                   createPortal()
                         │
                         ▼
                    #modal-root

---

## 💡 Why Stable Keys?

When React renders a list, each item needs a `key`.

A stable key gives React a consistent identity for each item.

In this project:

    key={product.id}

is used instead of:

    key={index}

This becomes especially important when items are removed, added, or reordered.

---

## 💡 Why Component Composition?

Component composition allows larger UI structures to be created using smaller reusable components.

For example:

    Accordion
        ↓
    AccordionItem
        ↓
    Question + Answer

The Accordion does not need to know the exact content it will receive.

It simply renders its `children`.

This makes the component more flexible and reusable.

---

## 💡 Why Render Props?

Render Props allow a component to share state and behavior without deciding exactly how that state should appear in the UI.

In this project:

    children(isOpen, handleToggle)

shares:

- `isOpen`
- `handleToggle`

with the consuming component.

The consumer then decides what to render.

---

## 💡 Why React Portals?

Normally, a component is rendered inside its parent's DOM hierarchy.

A Portal allows a component to be rendered into a different DOM node.

Normal Rendering:

    Parent
      │
      └── Modal

Portal Rendering:

    React Tree
        │
        └── Modal

    DOM:
        │
        ├── #root
        │
        └── #modal-root
              └── Modal

This is useful for UI such as:

- Modals
- Dialogs
- Tooltips
- Dropdowns

especially when parent containers have layout or overflow restrictions.

---

## 🧪 Testing Performed

The following functionality was tested successfully:

- Accordion items open correctly
- Accordion items close correctly
- FAQ data renders dynamically
- Stable keys are used for FAQ items
- Render Props Toggle works correctly
- Show / Hide Message works correctly
- Warning notification renders correctly
- Success notification renders correctly
- Empty notification returns `null`
- Product list renders correctly
- Individual products can be removed
- Stable product IDs are used as keys
- Modal opens correctly
- Modal closes correctly
- Overlay click closes the Modal
- Modal renders through `#modal-root`
- Portal works with `overflow: hidden`
- Browser console shows no application errors

---

## ✅ Phase 8 Checklist

- [x] Render arrays using `.map()`
- [x] Use stable keys
- [x] Practice dynamic list rendering
- [x] Practice removing list items
- [x] Conditional rendering using `&&`
- [x] Conditional rendering using ternary
- [x] Early return
- [x] `return null`
- [x] Use `children`
- [x] Component composition
- [x] Render Props pattern
- [x] Reusable Accordion component
- [x] Reusable Notification component
- [x] Stable Key Practice
- [x] Product removal using `filter()`
- [x] React Portal
- [x] `createPortal()`
- [x] `modal-root`
- [x] Modal implementation
- [x] Portal tested with `overflow: hidden`
- [x] Browser testing completed
- [x] Console checked for errors

---

## 🔮 Future Improvements

- Add keyboard accessibility to the Accordion
- Allow only one Accordion item to remain open at a time
- Add open / close animations
- Add Escape-key support for closing the Modal
- Improve Modal focus management
- Experiment with index keys using an editable list
- Compare Render Props with a custom Hook approach
- Improve responsive styling

---

## ▶️ Installation

Clone the repository:

    git clone <repository-url>

Install dependencies:

    npm install

Run the development server:

    npm run dev

Open the local development URL provided by Vite in the browser.

---

## 📚 Key React APIs Used

- `useState()`
- `.map()`
- `.filter()`
- `children`
- Conditional Rendering
- Render Props
- `createPortal()`

---

## 🎯 Phase 8 Outcome

This project provided practical experience with React Lists, Keys, Conditional Rendering, Component Composition, Render Props, and Portals.

The main goal was not only to make the UI work, but to understand **why each React concept is used and where it can be useful in real applications**.

The final project includes:

- Interactive Accordion
- Render Props Toggle
- Conditional Notifications
- Stable Key Practice
- Removable Product List
- Portal-based Modal

---
