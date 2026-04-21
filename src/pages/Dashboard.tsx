import { motion } from "framer-motion";
import { Mic, Clock, CheckSquare, Sparkles } from "lucide-react";
import StatCard from "@/components/StatCard";
import MeetingCard from "@/components/MeetingCard";
import { mockMeetings, stats } from "@/lib/mockData";

const statItems = [
  { icon: Mic, label: "Total Meetings", value: stats.totalMeetings, change: "+8 this week" },
  { icon: Clock, label: "Hours Recorded", value: `${stats.hoursRecorded}h`, change: "+6.2h this week" },
  { icon: CheckSquare, label: "Action Items", value: stats.actionItems, change: "18 pending" },
  { icon: Sparkles, label: "Insights", value: stats.insightsGenerated, change: "+47 this week" },
];

const Dashboard = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

    <div className="relative z-10 p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">Good morning</h1>
        <p className="text-sm text-muted-foreground mt-1">
          You have {mockMeetings.filter((m) => m.status === "live").length} live meeting right now
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statItems.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Meetings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockMeetings.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
