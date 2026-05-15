import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import MobileNav from "@/components/MobileNav";
import MobileSidebar from "@/components/MobileSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen min-h-[100dvh] w-full">
      <Sidebar />
      <MobileHeader onOpenMenu={() => setMenuOpen(true)} />
      <MobileSidebar open={menuOpen} onOpenChange={setMenuOpen} />
      <main className="flex-1 w-full min-w-0 pt-[calc(3.5rem+env(safe-area-inset-top,0px))] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:pt-0 lg:pb-0 lg:ml-[220px]">
        {children}
      </main>
      <MobileNav />
    </div>
  );
};

export default AppLayout;
