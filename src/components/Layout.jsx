import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4 flex-1 overflow-auto  ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
