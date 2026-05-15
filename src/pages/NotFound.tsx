import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageShell } from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <EmptyState icon={Home} title="Page not found" description="This page doesn't exist or was moved." />
      <div className="flex justify-center mt-6">
        <Button asChild className="min-h-11 w-full sm:w-auto max-w-xs">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </PageShell>
  );
};

export default NotFound;
