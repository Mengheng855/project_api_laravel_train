"use client"
import { useState } from "react"


export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "📈", label: "Analytics", active: false },
    { icon: "👥", label: "Users", active: false },
    { icon: "📦", label: "Products", active: false },
    { icon: "💳", label: "Orders", active: false },
    { icon: "⚙️", label: "Settings", active: false },
  ]

  return (
    <aside
      className={`flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && <span className="text-lg font-semibold text-foreground">Dashboard</span>}
        <button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">JD</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-foreground">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
