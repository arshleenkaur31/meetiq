import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export const PageShell = ({ children, className, narrow }: PageShellProps) => (
  <div className="min-h-screen relative">
    <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />
    <div
      className={cn(
        "page-content mx-auto w-full max-w-7xl",
        narrow && "max-w-2xl",
        className,
      )}
    >
      {children}
    </div>
  </div>
);

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => (
  <motion.header
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-5 sm:mb-8"
  >
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        )}
      </div>
      {children && <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">{children}</div>}
    </div>
  </motion.header>
);

interface PageCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const PageCard = ({ title, children, className }: PageCardProps) => (
  <section className={cn("glass rounded-xl p-4 sm:p-6 shadow-card", className)}>
    {title && <h2 className="text-sm font-semibold text-foreground mb-3 sm:mb-4">{title}</h2>}
    {children}
  </section>
);

export const MeetingGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">{children}</div>
);

export const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-8">{children}</div>
);

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 glass rounded-xl">
    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-muted-foreground" />
    </div>
    <p className="text-sm font-semibold text-foreground">{title}</p>
    {description && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>}
  </div>
);

interface ResponsiveTabsProps {
  tabs: { value: string; label: string; content: ReactNode }[];
  defaultValue?: string;
}

/** Mobile: tabbed panels. Desktop: hidden (use grid layout in parent). */
export const ResponsiveTabs = ({ tabs, defaultValue }: ResponsiveTabsProps) => {
  const initial = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs defaultValue={initial} className="lg:hidden w-full">
      <TabsList className="w-full h-auto flex flex-wrap sm:flex-nowrap gap-1 p-1 bg-secondary/50">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-1 min-w-[4.5rem] text-xs sm:text-sm py-2.5 min-h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-3 focus-visible:outline-none">
          <PageCard>{tab.content}</PageCard>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export const ActionBar = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col sm:flex-row gap-2 w-full [&_button]:min-h-11 [&_button]:flex-1 sm:[&_button]:flex-none sm:[&_button]:min-h-9">
    {children}
  </div>
);

export const ListGroup = ({ children }: { children: ReactNode }) => (
  <div className="divide-y divide-border/40 rounded-xl border border-border/40 overflow-hidden">
    {children}
  </div>
);

export const ListGroupItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-start sm:items-center justify-between gap-4 p-4 bg-secondary/20", className)}>
    {children}
  </div>
);
