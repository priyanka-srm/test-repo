# 🚀 React Router Dashboard

A hands-on React Router project built as part of my React learning journey — Phase 9.

This project focuses on understanding and implementing essential React Router concepts by building a multi-page dashboard application with public routes, nested routes, dynamic routes, protected routes, navigation, and a custom 404 page.

The project also includes a dashboard-style UI with sidebar navigation, topbar, dashboard cards, active route states, and responsive styling.

---

## 📌 Project Overview

The main goal of this project was to understand how routing works in a React application and how different pages can be managed using React Router.

Instead of creating separate applications for every page, React Router allows different URLs to render different React components within the same application.

This project was built to practice React Router concepts through a practical dashboard application rather than learning them only theoretically.

The application includes:

- Dashboard page
- About page
- Products page
- Dynamic product pages
- Dynamic user pages
- Login page
- Protected profile page
- Protected settings page
- Custom 404 page
- Shared dashboard layout
- Sidebar navigation
- Responsive UI

---

## 🛠️ Technologies Used

- React
- JavaScript
- React Router DOM
- Vite
- HTML
- CSS
- LocalStorage

---

# 📚 React Router Concepts Implemented

## 1. BrowserRouter

`BrowserRouter` is used as the main router wrapper for the application.

It enables client-side routing and allows React Router to control navigation based on the browser URL.

Example:

    import { BrowserRouter } from "react-router-dom";

    function App() {
      return (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }

`BrowserRouter` provides the routing context required by React Router components.

---

## 2. Routes and Route

`Routes` is used to contain all route definitions, while `Route` is used to connect a URL path with a React component.

Example:

    import { Routes, Route } from "react-router-dom";

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
    </Routes>

This allows different components to render for different URLs.

---

## 3. Basic Routing

Basic routing was implemented by connecting different URLs to different React components.

Implemented routes include:

    /
    /about
    /products
    /login
    /profile
    /settings

Each route renders its corresponding page component.

Example:

    <Route path="/" element={<Home />} />

    <Route path="/about" element={<About />} />

    <Route path="/products" element={<Products />} />

---

## 4. Link

The `Link` component is used to navigate between routes without performing a full browser page reload.

Example:

    import { Link } from "react-router-dom";

    <Link to="/products">
      Products
    </Link>

The dashboard sidebar uses `Link` components for navigation.

This provides client-side navigation between pages.

---

## 5. Nested Routes

Nested routing was implemented using `DashboardLayout`.

The dashboard layout acts as a parent route for multiple pages.

Example:

    <Route element={<DashboardLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
    </Route>

The layout remains visible while the content changes based on the current route.

This allows the application to maintain a common dashboard structure across multiple pages.

---

## 6. Outlet

`Outlet` is used inside `DashboardLayout` to render the matched child route.

Example:

    import { Outlet } from "react-router-dom";

    function DashboardLayout() {
      return (
        <div>
          <nav>
            Sidebar Navigation
          </nav>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

The `Outlet` acts as the placeholder where the child page is rendered.

The structure works like this:

    DashboardLayout
          |
          └── Outlet
                |
                ├── Home
                ├── About
                ├── Products
                ├── UserDetails
                └── ProductPage

The sidebar and topbar remain visible while the content inside `Outlet` changes.

---

## 7. Dynamic Routes

Dynamic routing was implemented using route parameters.

Example:

    <Route
      path="/users/:id"
      element={<UserDetails />}
    />

Here:

    :id

is a dynamic route parameter.

Therefore, the same route can handle different URLs:

    /users/101
    /users/202
    /users/303

All of these URLs use the same `UserDetails` component.

Dynamic routing is useful when the same page structure needs to display different data based on the URL.

---

## 8. useParams()

`useParams()` is used to retrieve dynamic values from the URL.

Example:

    import { useParams } from "react-router-dom";

    function UserDetails() {
      const { id } = useParams();

      return (
        <div>
          <h1>User Details</h1>
          <h2>User ID: {id}</h2>
        </div>
      );
    }

For:

    /users/101

the value will be:

    id = "101"

For:

    /users/202

the value will be:

    id = "202"

This demonstrates how the same component can display different information based on the URL.

---

## 9. Dynamic Product Routes

Dynamic routing was also implemented for products.

Example:

    <Route
      path="/products/:productId"
      element={<ProductPage />}
    />

Inside `ProductPage`:

    import { useParams } from "react-router-dom";

    function ProductPage() {
      const { productId } = useParams();

      return (
        <div>
          <h1>Product Details</h1>
          <h2>Product ID: {productId}</h2>
        </div>
      );
    }

The same component can handle:

    /products/101
    /products/202
    /products/303

The `productId` value changes according to the URL.

---

## 10. useNavigate()

`useNavigate()` is used for programmatic navigation.

Unlike `Link`, which is normally used directly in JSX, `useNavigate()` allows navigation from JavaScript logic.

Example:

    import { useNavigate } from "react-router-dom";

    function Login() {
      const navigate = useNavigate();

      function handleLogin() {
        localStorage.setItem("isLoggedIn", "true");

        navigate("/profile");
      }

      return (
        <button onClick={handleLogin}>
          Login
        </button>
      );
    }

After the login button is clicked:

    Login
      ↓
    Save authentication state
      ↓
    navigate("/profile")
      ↓
    Profile Page

This demonstrates programmatic navigation based on an application event.

---

## 11. Protected Routes

Protected routes were implemented to prevent unauthenticated users from accessing private pages.

The protected pages in this project are:

    /profile
    /settings

They are wrapped using the `RequireAuth` component.

Example:

    <Route element={<RequireAuth />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

This means the user must pass the authentication check before the protected page can be rendered.

---

## 12. RequireAuth

`RequireAuth` acts as a route guard.

It checks whether the user has a login state stored in LocalStorage.

Example:

    import { Navigate, Outlet } from "react-router-dom";

    function RequireAuth() {
      const isAuthenticated =
        localStorage.getItem("isLoggedIn");

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      return <Outlet />;
    }

    export default RequireAuth;

The logic is:

    User visits /profile
            ↓
        RequireAuth
            ↓
      Check LocalStorage
            ↓
    Is user authenticated?
          ↙       ↘
        YES        NO
         ↓          ↓
       Outlet      /login
         ↓
      Profile

This demonstrates how a protected route can control access to private pages.

---

## 13. Navigate

`Navigate` is used to redirect users to another route.

Example:

    <Navigate
      to="/login"
      replace
    />

If the user is not authenticated, `RequireAuth` redirects the user to `/login`.

The `replace` option replaces the current history entry during the redirect.

---

## 14. LocalStorage Authentication

A simple authentication simulation was implemented using LocalStorage.

When the user logs in:

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

The authentication state can then be checked using:

    localStorage.getItem("isLoggedIn");

The project uses this only to demonstrate the protected-route concept.

This is not production-level authentication.

It is a simple learning implementation to understand how authentication state can affect route access.

---

## 15. 404 / Catch-All Route

A catch-all route was implemented to handle URLs that do not match any existing route.

Example:

    <Route
      path="*"
      element={<NotFound />}
    />

If the user visits an invalid URL such as:

    /random-page
    /hello
    /abc

the application displays the custom `NotFound` page.

This provides a better user experience than leaving an unmatched route without any content.

---

# 🗂️ Project Structure

    react-router-dashboard/
    │
    ├── public/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── DashboardLayout.jsx
    │   │   ├── DashboardLayout.css
    │   │   └── RequireAuth.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductPage.jsx
    │   │   ├── UserDetails.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Settings.jsx
    │   │   └── NotFound.jsx
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    ├── package-lock.json
    └── README.md

---

# 🧭 Application Routes

| Route | Component | Type |
|---|---|---|
| `/` | Home | Public |
| `/about` | About | Public |
| `/products` | Products | Public |
| `/products/:productId` | ProductPage | Dynamic |
| `/users/:id` | UserDetails | Dynamic |
| `/login` | Login | Public |
| `/profile` | Profile | Protected |
| `/settings` | Settings | Protected |
| `*` | NotFound | Catch-all |

---

# 🎨 UI Features

The project includes a dashboard-style interface to make the routing concepts easier to visualize.

## Sidebar

The sidebar contains navigation links for:

- Dashboard
- About
- Products
- Users
- Profile
- Settings
- Login

The active route is visually highlighted.

---

## Topbar

The topbar contains:

- Dashboard title
- Project description
- User profile section

---

## Dashboard Cards

The Home page includes summary cards for:

- Total Pages
- Routes
- Users
- Products

---

## Responsive Layout

Basic responsive CSS was implemented so that the dashboard layout adapts to smaller screen sizes.

---

# 🧪 Route Testing

The routes were tested manually in the browser to verify that navigation and route rendering work correctly.

## Home Route

    http://localhost:5173/

Expected:

    Welcome back, Priya

---

## About Route

    http://localhost:5173/about

Expected:

    About Page

---

## Products Route

    http://localhost:5173/products

Expected:

    Products
    Product 101
    Product 202
    Product 303

---

## Dynamic Product Route

    http://localhost:5173/products/101

Expected:

    Product ID: 101

Testing another ID:

    http://localhost:5173/products/202

Expected:

    Product ID: 202

---

## Dynamic User Route

    http://localhost:5173/users/101

Expected:

    User ID: 101

Testing another ID:

    http://localhost:5173/users/202

Expected:

    User ID: 202

---

## Protected Profile Route

First remove the authentication value from LocalStorage:

    localStorage.removeItem("isLoggedIn");

Then visit:

    http://localhost:5173/profile

Expected behavior:

    /profile
       ↓
    RequireAuth
       ↓
    Not authenticated
       ↓
    /login

---

## Login Route

Click the Login button.

The application stores:

    isLoggedIn = true

in LocalStorage.

The user is then navigated to:

    /profile

---

## Settings Route

After login:

    http://localhost:5173/settings

The settings page should be accessible.

---

## 404 Route

Try an invalid URL:

    http://localhost:5173/random-page

Expected:

    404 - Page Not Found

---

# 🔄 Application Flow

## Public Route Flow

    User
      ↓
    React Router
      ↓
    Match URL
      ↓
    Render Component

---

## Nested Route Flow

    DashboardLayout
          ↓
        Outlet
          ↓
    Matched Child Route
          ↓
      Page Component

---

## Dynamic Route Flow

    /users/101
          ↓
      /users/:id
          ↓
      useParams()
          ↓
       id = "101"
          ↓
      UserDetails

---

## Protected Route Flow

    User
      ↓
    /profile
      ↓
    RequireAuth
      ↓
    Check LocalStorage
      ↓
    Authentication Check
      ↓
    ┌───────────────┐
    │               │
    YES             NO
    │               │
    ↓               ↓
    Outlet          /login
    │
    ↓
    Profile

---

# 🧠 What I Learned

This project helped me understand how routing works in a React application and how different route concepts can be combined to create a realistic application structure.

Through this project, I learned:

- How `BrowserRouter` enables routing
- How `Routes` and `Route` define application routes
- How basic routing works
- How `Link` provides client-side navigation
- How nested routes work
- Why `Outlet` is required for rendering child routes
- How dynamic routes work
- How route parameters are created using `:parameter`
- How `useParams()` retrieves values from the URL
- How `useNavigate()` performs programmatic navigation
- How `Navigate` performs redirects
- How protected routes can be implemented
- How route guards work
- How LocalStorage can be used for a simple authentication simulation
- How catch-all routes handle unknown URLs
- How a shared dashboard layout can be used across multiple pages
- How routing and UI layout work together in a React application

---

# 🐛 Problems Faced & Solutions

## Problem 1 — React Router Package Installation

Initially, React Router was not available in the project.

### Solution

Installed React Router DOM using:

    npm install react-router-dom

---

## Problem 2 — DashboardLayout Import Path

There was an import path mismatch for `DashboardLayout`.

### Solution

The import path was corrected according to the actual file location:

    import DashboardLayout from "./components/DashboardLayout";

---

## Problem 3 — Dynamic Route Returned 404

The following URL initially returned the 404 page:

    /users/101

The reason was that the dynamic route had not been added to `App.jsx`.

### Solution

Added:

    <Route
      path="/users/:id"
      element={<UserDetails />}
    />

---

## Problem 4 — Dynamic ID Needed to Be Displayed

After creating the dynamic route, the ID needed to be retrieved from the URL.

### Solution

Used:

    const { id } = useParams();

This allowed the component to display the current user ID dynamically.

---

## Problem 5 — Protected Pages Needed Authentication

The Profile and Settings pages needed to be accessible only after login.

### Solution

Created the `RequireAuth` component and wrapped the private routes:

    <Route element={<RequireAuth />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

---

## Problem 6 — Initial UI Was Too Basic

The first implementation mainly focused on understanding routing concepts, so the UI was very simple.

### Solution

A dashboard-style UI was added with:

- Sidebar navigation
- Topbar
- Active navigation states
- Dashboard cards
- User profile section
- Responsive CSS
- Shared content area using `Outlet`

---

# 🔑 Important Code Concepts

## Dynamic Route

    <Route
      path="/users/:id"
      element={<UserDetails />}
    />

## Reading URL Parameter

    const { id } = useParams();

## Nested Route

    <Route element={<DashboardLayout />}>
      <Route path="/" element={<Home />} />
    </Route>

## Rendering Child Route

    <Outlet />

## Programmatic Navigation

    navigate("/profile");

## Protected Route

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

## Catch-All Route

    <Route
      path="*"
      element={<NotFound />}
    />

---

# ▶️ How to Run the Project

## 1. Clone the Repository

    git clone YOUR_GITHUB_REPOSITORY_URL

## 2. Move Into the Project

    cd react-router-dashboard

## 3. Install Dependencies

    npm install

## 4. Start the Development Server

    npm run dev

## 5. Open the Application

Open the local development URL provided by Vite.

Usually:

    http://localhost:5173

---

# 📦 Main Dependency

The main routing library used in this project is:

    npm install react-router-dom

---

# 🚀 Future Improvements

The current project focuses on learning and implementing React Router fundamentals.

Possible future improvements include:

- Real authentication
- Logout functionality
- User data from an API
- Product data from an API
- Route-based loading states
- Error boundaries
- Route lazy loading
- `React.lazy()` with routes
- Role-based protected routes
- Search and filtering
- Better mobile navigation
- Separate Authentication Context
- Persistent user sessions
- Better form validation
- Production deployment

---

# 🎯 Phase 9 Outcome

This project helped me understand how routing works in a real React application instead of treating every component as an isolated page.

I can now understand and implement the following flow:

    BrowserRouter
          ↓
        Routes
          ↓
        Route
          ↓
        Link
          ↓
    Nested Routes
          ↓
        Outlet
          ↓
    Dynamic Routes
          ↓
      useParams()
          ↓
      useNavigate()
          ↓
       Navigate
          ↓
    Protected Routes
          ↓
    Authentication Check
          ↓
    404 Catch-All

---

# 🏆 Phase 9 Status

    React Router Phase 9
            ↓
    Basic Routing              ✅
    BrowserRouter              ✅
    Routes + Route             ✅
    Link                       ✅
    Nested Routes              ✅
    Outlet                     ✅
    Dynamic Routes             ✅
    useParams                  ✅
    useNavigate                ✅
    Navigate                   ✅
    Protected Routes           ✅
    Authentication Check       ✅
    404 Route                  ✅
    Dashboard Layout           ✅
    Responsive UI              ✅
    Route Testing              ✅
    README Documentation       ✅

## ✅ Phase 9 Completed

This project was built to strengthen my understanding of React Router and real-world navigation patterns in React applications.

---

