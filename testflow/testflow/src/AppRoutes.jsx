import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<App />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
