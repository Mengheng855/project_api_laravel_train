import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: "📊", label: "Dashboard", path: "/admin" },
    { icon: "👥", label: "Users", path: "/admin/user" },
    { icon: "📦", label: "Products", path: "/admin/product" },
    { icon: "💳", label: "Orders", path: "/admin/order" },
    { icon: "🏠", label: "Teachers", path: "/admin/teacher" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"
          }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <span className="text-lg font-bold text-blue-600">Dashboard</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-3">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Right content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 font-semibold text-white rounded-full bg-blue-500 
                hover:bg-sky-900 shadow-md hover:shadow-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content changes here only */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* Nested route content render here */}
        </main>
      </div>
    </div>
  );
}
