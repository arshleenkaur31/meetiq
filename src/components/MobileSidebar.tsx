import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import SidebarContent from "@/components/SidebarContent";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSidebar = ({ open, onOpenChange }: MobileSidebarProps) => {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[min(280px,85vw)] p-0 glass-strong border-border/60 [&>button]:top-5 [&>button]:right-4"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarContent onNavigate={close} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
