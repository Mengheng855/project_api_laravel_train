import { useState } from "react";
    

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "📈", label: "Analytics", active: false },
    { icon: "👥", label: "Users", active: false },
    { icon: "📦", label: "Products", active: false },
    { icon: "💳", label: "Orders", active: false },
    { icon: "⚙️", label: "Settings", active: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && <span className="text-lg font-bold text-blue-600">Dashboard</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <button
              key={index}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 transition">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              JD
            </div>
            {!collapsed && (
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">John Doe</span>
                <span className="text-xs text-gray-500">john@example.com</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Observability</h1>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                New Report
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Example Card */}
            <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">289K</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-green-500">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> 2XX
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" /> 4XX
                </span>
                <span className="flex items-center gap-1 text-red-500">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> 5XX
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Data Transfer</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">102GB</p>
              <p className="text-xs text-gray-500 mt-1">3GB incoming</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">352ms</p>
              <p className="text-xs text-green-500 mt-1">↓ 12% from last period</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Error Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">0.2%</p>
              <p className="text-xs text-red-500 mt-1">↑ 0.1% from last period</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
