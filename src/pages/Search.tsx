import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { Input } from "@/components/ui/input";
import { EmptyState, MeetingGrid, PageHeader, PageShell } from "@/components/layout/PageLayout";
import { mockMeetings } from "@/lib/mockData";

const Search = () => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockMeetings;

    return mockMeetings.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.summary?.toLowerCase().includes(q) ||
        m.participants.some((p) => p.toLowerCase().includes(q)) ||
        m.entities?.some((e) => e.name.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <PageShell>
      <PageHeader title="Search" description="Find meetings, participants, and topics" />

      <div className="sticky top-0 z-20 -mx-4 px-4 py-2 sm:static sm:mx-0 sm:px-0 sm:py-0 mb-4 sm:mb-6 bg-background/80 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none border-b border-border/30 sm:border-0">
        <div className="relative max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search meetings, people, companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 glass h-11 text-base sm:text-sm"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchIcon}
          title="No matches"
          description="Try a different keyword or check spelling."
        />
      ) : (
        <MeetingGrid>
          {results.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </MeetingGrid>
      )}
    </PageShell>
  );
};

export default Search;
