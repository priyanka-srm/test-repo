import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="route-layout">
      <Outlet />
    </div>
  );
}

export default AppLayout;
