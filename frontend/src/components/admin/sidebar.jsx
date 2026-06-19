import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  PackagePlus,
  LayoutGrid,
  MessageSquare, // Imported for Inquiries
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { logoutRequest } from "../../services/auth.service";

const navItems = [
  { icon: PackagePlus, label: "Dashboard", path: "/admin" },
  { icon: LayoutGrid, label: "Umrah Packages", path: "/admin/umrah-packages" },
  { icon: LayoutGrid, label: "Hajj Packages", path: "/admin/hajj-packages" },
  { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries" }, // Added Inquiries link
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate("/login");
    }
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow"
      >
        <Menu size={18} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-52 bg-white border-r border-gray-100 flex flex-col min-h-screen transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Lead Umrah</span>

          <button
            onClick={closeSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3 bg-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">
                Admin
              </p>
              <p className="text-[10px] text-gray-500 truncate">Dashboard</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-600 hover:text-red-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}