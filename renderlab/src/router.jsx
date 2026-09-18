import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LazyRoute from "./components/LazyRoute";
import {
  RenderPage,
  MemoPage,
  CallbackPage,
  LazyPage,
  VirtualizationPage,
  ProfilerPage,
} from "./routes/lazyPages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "rerender",
        element: (
          <LazyRoute>
            <RenderPage />
          </LazyRoute>
        ),
      },
      {
        path: "memo",
        element: (
          <LazyRoute>
            <MemoPage />
          </LazyRoute>
        ),
      },
      {
        path: "callback",
        element: (
          <LazyRoute>
            <CallbackPage />
          </LazyRoute>
        ),
      },
      {
        path: "lazy",
        element: (
          <LazyRoute>
            <LazyPage />
          </LazyRoute>
        ),
      },
      {
        path: "virtualization",
        element: (
          <LazyRoute>
            <VirtualizationPage />
          </LazyRoute>
        ),
      },
      {
        path: "profiler",
        element: (
          <LazyRoute>
            <ProfilerPage />
          </LazyRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
