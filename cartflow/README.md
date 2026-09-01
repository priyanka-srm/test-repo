# CartFlow

A React-based shopping cart mini-project focused on building a clean, responsive, and interactive shopping experience using React and Redux Toolkit.

This project demonstrates practical state management patterns including adding products to a cart, updating quantities, removing items, clearing the cart, displaying cart totals, and managing cart state through Redux Toolkit.

The interface also focuses on clean visual hierarchy, responsive layouts, reusable components, keyboard-friendly controls, and subtle UI interactions.

## ✨ Features

- Clean and modern shopping interface
- Responsive layout for desktop, tablet, and mobile
- Hero section with clear call-to-action
- Featured products section
- Product cards with product images
- Product categories and descriptions
- Product pricing in Indian Rupees
- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove individual products from cart
- Clear entire cart
- Dynamic cart item count
- Dynamic cart summary
- Empty cart state
- Continue shopping action
- Checkout button
- Slide-in shopping cart drawer
- Cart backdrop overlay
- Cart drawer open and close interactions
- Product card hover effects
- Image hover zoom effect
- Button hover interactions
- Visual feedback for user actions
- Accessible keyboard focus styles
- Responsive cart layout
- Mobile-friendly product grid
- Clean spacing and visual hierarchy

## 🛒 Shopping Cart Functionality

The cart is managed using Redux Toolkit.

Users can:

- Add a product to the cart
- Add the same product multiple times
- Increase product quantity
- Decrease product quantity
- Remove a product completely
- Clear all cart items
- View the number of items in the cart
- View individual item prices
- View the cart subtotal
- View the total amount
- Continue shopping when the cart is empty

When a product is added more than once, the existing product quantity is increased instead of creating a duplicate cart item.

## 🧩 Redux Toolkit Concepts Demonstrated

### Redux Slice

The cart state is managed using a Redux Toolkit slice.

The cart state contains:

    {
      items: []
    }

The cart slice provides reducers for:

- `addToCart`
- `increaseQuantity`
- `decreaseQuantity`
- `removeFromCart`
- `clearCart`

Redux Toolkit's `createSlice` is used to create the reducers and actions in a concise way.

### Add to Cart

When a product is added:

1. The product is checked against existing cart items.
2. If the product already exists, its quantity is increased.
3. Otherwise, the product is added with an initial quantity of `1`.

### Quantity Management

Users can control product quantities directly from the cart.

The quantity controls support:

- Increase quantity
- Decrease quantity
- Preventing the quantity from going below `1`

### Remove Items

Individual products can be removed from the cart using the `removeFromCart` action.

### Clear Cart

The entire cart can be cleared using the `clearCart` action.

## 🛍️ Product Collection

The project contains a curated collection of everyday products including:

- Everyday Backpack
- Minimal Watch
- Classic Sneakers
- Wireless Headphones
- Leather Wallet
- Ceramic Bottle

Each product includes:

- Product image
- Category
- Product name
- Description
- Price
- Add to Cart action

## 🎨 UI & Design

The interface uses a clean shopping-focused visual design with:

- Soft neutral background
- Indigo accent color
- White product cards
- Rounded corners
- Subtle shadows
- Clear typography hierarchy
- Consistent spacing
- Hover animations
- Responsive layouts

The design intentionally avoids excessive visual effects and keeps the shopping experience simple and readable.

### Visual Hierarchy

The interface uses different levels of contrast for:

- Main headings
- Product names
- Prices
- Categories
- Descriptions
- Supporting information
- Buttons

Secondary text uses a slightly softer color while remaining readable against the background.

## 🛒 Cart Drawer

The shopping cart is implemented as a slide-in drawer.

The drawer includes:

- Cart heading
- Dynamic item count
- Close button
- Cart item list
- Product thumbnails
- Product category
- Product name
- Quantity controls
- Remove action
- Individual item price
- Subtotal
- Total
- Checkout button
- Clear Cart button
- Empty cart state

The drawer uses a backdrop overlay to visually separate the cart from the main shopping page.

## ♿ Accessibility

The project includes basic accessibility-focused UI practices.

### Keyboard Focus

Interactive elements use visible `:focus-visible` styles.

Keyboard users can clearly identify the currently focused button or link.

The global focus style is implemented using:

    button:focus-visible,
    a:focus-visible {
      outline: 3px solid #4f46e5;
      outline-offset: 3px;
    }

### Native Controls

Native HTML buttons are used for interactive actions such as:

- Add to Cart
- Increase quantity
- Decrease quantity
- Remove item
- Clear cart
- Continue shopping
- Close cart

Using native buttons preserves expected keyboard interaction and browser accessibility behavior.

### Accessible Button States

Disabled quantity controls provide a visual indication when an action cannot be performed.

For example, the decrease button becomes disabled when the product quantity reaches `1`.

### Focus Visibility

The project provides a clear focus outline so keyboard users can navigate the interface without relying on a mouse.

## 📱 Responsive Design

The application is responsive across different screen sizes.

### Desktop

- Three-column product grid
- Large hero section
- Side feature card
- Full shopping cart drawer

### Tablet

- Two-column product grid
- Stacked hero layout
- Flexible content spacing

### Mobile

- Single-column product grid
- Smaller hero typography
- Mobile-friendly header
- Full-width cart drawer
- Responsive cart item layout
- Adjusted spacing and image sizes

Responsive breakpoints are implemented using CSS media queries.

## ✨ UI Interactions

The project includes subtle interactions to improve the overall user experience.

Examples include:

- Product cards lift slightly on hover
- Product images zoom subtly on hover
- Buttons respond to hover
- Cart trigger receives a hover effect
- Cart drawer slides into view
- Backdrop fades in and out
- Close button provides visual feedback
- Checkout button provides hover feedback

These interactions are intentionally subtle to maintain a clean shopping experience.

## 🧱 Component Structure

The application is divided into reusable React components.

The main components include:

- `Header`
- `Hero`
- `ProductCard`
- `CartDrawer`
- `CartItem`
- `Footer`

Each component is responsible for a specific part of the shopping interface.

## 🛠️ Tech Stack

- React
- JavaScript
- Redux Toolkit
- React Redux
- Vite
- HTML5
- CSS3

## 📁 Project Structure

    src/
    │
    ├── components/
    │   ├── CartDrawer.jsx
    │   ├── CartItem.jsx
    │   ├── ProductCard.jsx
    │   └── ...
    │
    ├── features/
    │   └── cart/
    │       └── cartSlice.js
    │
    ├── App.jsx
    ├── App.css
    ├── index.css
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

## 🧪 Testing

The application was manually tested for:

- Product rendering
- Add to Cart functionality
- Adding the same product multiple times
- Cart item count updates
- Quantity increase
- Quantity decrease
- Quantity minimum handling
- Individual item removal
- Clear Cart functionality
- Empty cart state
- Cart drawer opening
- Cart drawer closing
- Continue Shopping action
- Cart summary updates
- Responsive product layout
- Mobile cart layout
- Button hover states
- Product card hover effects
- Keyboard focus visibility

## ♻️ State Management Flow

The basic cart flow is:

    ProductCard
         ↓
    addToCart()
         ↓
    Redux Store
         ↓
    cartSlice
         ↓
    CartDrawer
         ↓
    CartItem
         ↓
    Quantity / Remove Actions
         ↓
    Redux Store Updated

Redux Toolkit provides a centralized source of truth for cart state across the application.

## 🎯 Project Goal

The goal of this project was to build a practical shopping cart application while learning how to manage shared application state using Redux Toolkit.

The project focuses on creating an interface that is:

- Clean
- Responsive
- Interactive
- Reusable
- Easy to understand
- Accessible
- Maintainable

## 📚 What I Practiced

Through this project, I practiced:

- React component development
- Component-based UI architecture
- Redux Toolkit
- `createSlice`
- Redux actions and reducers
- React Redux
- `useDispatch`
- `useSelector`
- Shared state management
- Shopping cart logic
- Quantity management
- Conditional rendering
- Dynamic UI updates
- Responsive CSS
- CSS hover states
- CSS transitions
- Cart drawer implementation
- Empty-state UI
- Accessibility-focused button interactions
- Keyboard focus styles
- Modern UI design

## 💡 Key Learning

This project helped me understand how Redux Toolkit can be used to manage shared state across multiple React components.

Instead of keeping cart data inside individual components, the cart state is centralized in Redux, allowing components such as `ProductCard`, `CartDrawer`, and `CartItem` to interact with the same cart state.

This makes the application easier to scale as more shopping features are added.

## 🔮 Future Improvements

Possible future improvements include:

- Product search
- Product category filtering
- Sorting products by price
- Product details page
- Persistent cart using `localStorage`
- Checkout flow
- Order confirmation page
- User authentication
- Backend integration
- API-based product data
- Wishlist functionality
- Dark mode
- Toast notifications
- Loading and error states

---

⭐ Built as a React + Redux Toolkit shopping cart mini-project to practice modern frontend development and state management.