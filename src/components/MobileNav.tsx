import AppNav from "@/components/AppNav";

const MobileNav = () => (
  <nav
    className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/40 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_24px_rgba(0,0,0,0.25)]"
    aria-label="Mobile navigation"
  >
    <AppNav variant="bottom" />
  </nav>
);

export default MobileNav;
