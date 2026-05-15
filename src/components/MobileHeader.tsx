import { useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
import { getPageTitle } from "@/lib/navigation";

interface MobileHeaderProps {
  onOpenMenu: () => void;
}

const MobileHeader = ({ onOpenMenu }: MobileHeaderProps) => {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-strong border-b border-border/40 pt-[env(safe-area-inset-top,0px)]">
      <div className="flex items-center justify-between gap-3 h-14 px-4 max-w-full">
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex items-center gap-2 shrink-0 touch-manipulation rounded-lg active:opacity-80 -ml-1 px-1 min-h-10"
          aria-label="Open navigation menu"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-gradient">MeetIQ</span>
        </button>
        <h1 className="text-sm font-semibold text-foreground truncate text-right flex-1 min-w-0">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default MobileHeader;
