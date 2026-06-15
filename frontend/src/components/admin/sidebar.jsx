import { NavLink, useNavigate } from "react-router-dom";
import { PackagePlus, LayoutGrid, Tent, LogOut } from "lucide-react";

const navItems = [
  { icon: PackagePlus, label: "Dashboard", path: "/admin" },
  { icon: LayoutGrid, label: "Umrah Packages", path: "/admin/umrah-packages" },
  { icon: Tent, label: "Hajj Packages", path: "/admin/hajj-packages" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // adjust key if different
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-40 shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-screen">

      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <span className="text-[13px] font-bold text-gray-900 tracking-tight">
          Lead Umrah
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-left w-full transition-colors ${
                  isActive
                    ? "bg-[#4a5c2f] text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
              <span className="text-[11px] font-medium leading-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* User profile + logout */}
      <div className="px-3 py-3 border-t border-gray-100 flex flex-col gap-2">

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#4a5c2f] flex items-center justify-center shrink-0">
            <span className="text-white text-[9px] font-bold">JA</span>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-gray-800 leading-tight truncate">
              Jafar Al-Giz
            </p>
            <p className="text-[9px] text-gray-400 leading-tight truncate">
              Senior Principal
            </p>
          </div>
          
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-[11px] font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>


      </div>
    </aside>
  );
}