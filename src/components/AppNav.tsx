import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface AppNavProps {
  variant: "sidebar" | "bottom";
  onNavigate?: () => void;
}

const AppNav = ({ variant, onNavigate }: AppNavProps) => {
  const location = useLocation();
  const isBottom = variant === "bottom";

  return (
    <nav
      className={cn(
        isBottom
          ? "flex items-stretch justify-around gap-0.5 px-1"
          : "flex flex-col gap-1 flex-1",
      )}
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const active =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              "relative font-medium transition-colors group touch-manipulation",
              isBottom
                ? "flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[56px] min-w-0 rounded-lg py-2 px-0.5 active:bg-secondary/80"
                : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm",
            )}
          >
            {active && (
              <motion.div
                layoutId={isBottom ? "mobile-nav-active" : "sidebar-active"}
                className={cn(
                  "absolute inset-0 rounded-lg bg-secondary",
                  isBottom && "inset-x-0.5",
                )}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <item.icon
              className={cn(
                "relative z-10 shrink-0 transition-colors",
                isBottom ? "w-5 h-5" : "w-4 h-4",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <span
              className={cn(
                "relative z-10 transition-colors truncate max-w-full",
                isBottom ? "text-[10px] leading-tight" : "text-sm",
                active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {isBottom ? item.shortLabel : item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default AppNav;
