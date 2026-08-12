import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./components/DashboardLayout.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          {/* Basic Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Product Routes */}
          <Route path="/products" element={<Products />} />

          {/* Dynamic Product Route */}
          <Route path="/products/:productId" element={<ProductPage />} />

          {/* Dynamic User Route */}
          <Route path="/users/:id" element={<UserDetails />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
