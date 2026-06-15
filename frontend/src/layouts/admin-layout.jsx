import Sidebar from "../components/admin/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-white font-sans">

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-40 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-40 flex flex-col flex-1 min-h-screen">
        <main className="h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}