import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import AppNav from "@/components/AppNav";

interface SidebarContentProps {
  onNavigate?: () => void;
}

const SidebarContent = ({ onNavigate }: SidebarContentProps) => (
  <div className="flex flex-col h-full py-6 px-3">
    <Link
      to="/"
      onClick={onNavigate}
      className="flex items-center gap-2.5 px-3 mb-8 touch-manipulation"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="text-base font-bold tracking-tight text-foreground">
        <span className="text-gradient">MeetIQ</span>
      </span>
    </Link>

    <AppNav variant="sidebar" onNavigate={onNavigate} />

    <div className="px-3 py-3 rounded-lg bg-secondary/50 border border-border/30 mt-4">
      <p className="text-xs text-muted-foreground mb-1">This week</p>
      <p className="text-lg font-bold text-foreground">12 meetings</p>
      <p className="text-xs text-primary">+23% insights captured</p>
    </div>
  </div>
);

export default SidebarContent;
