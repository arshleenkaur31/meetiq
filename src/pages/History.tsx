import { motion } from "framer-motion";
import MeetingCard from "@/components/MeetingCard";
import { mockMeetings } from "@/lib/mockData";

const History = () => {
  const pastMeetings = mockMeetings.filter((m) => m.status !== "live");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen relative"
    >
      <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Meeting History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pastMeetings.length} past meetings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pastMeetings.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;
