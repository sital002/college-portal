import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
