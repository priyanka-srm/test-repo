import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
// Lazy-loaded page
const RerenderPage = lazy(() => import("./pages/RerenderPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "rerender",
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Loading...
              </div>
            }
          >
            <RerenderPage />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
