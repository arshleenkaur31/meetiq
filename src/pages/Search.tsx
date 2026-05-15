import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen relative">
      <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-8"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Search</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find meetings, participants, and topics
          </p>
        </div>

        <div className="relative max-w-xl mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search meetings, people, companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {results.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </motion.div>

        {results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">
            No meetings match your search.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Search;
