import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  // Login is outside DashboardLayout
  {
    path: "/login",
    element: <Login />,
  },
  // Dashboard Layout
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
      // Protected routes
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  // 404
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
