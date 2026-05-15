import SidebarContent from "@/components/SidebarContent";

const Sidebar = () => (
  <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] glass-strong z-50 flex-col">
    <SidebarContent />
  </aside>
);

export default Sidebar;
