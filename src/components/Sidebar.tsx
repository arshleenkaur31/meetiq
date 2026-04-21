import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Mic,
  Clock,
  Search,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Mic, label: "Live Meeting", path: "/live" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] glass-strong z-50 flex flex-col py-6 px-3">
      <Link to="/" className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">
          <span className="text-gradient">MeetIQ</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group"
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-secondary"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <item.icon
                className={`w-4 h-4 relative z-10 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`relative z-10 transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 rounded-lg bg-secondary/50 border border-border/30">
        <p className="text-xs text-muted-foreground mb-1">This week</p>
        <p className="text-lg font-bold text-foreground">12 meetings</p>
        <p className="text-xs text-primary">+23% insights captured</p>
      </div>
    </aside>
  );
};

export default Sidebar;
