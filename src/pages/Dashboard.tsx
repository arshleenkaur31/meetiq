import { Mic, Clock, CheckSquare, Sparkles } from "lucide-react";
import StatCard from "@/components/StatCard";
import MeetingCard from "@/components/MeetingCard";
import { PageHeader, PageShell, MeetingGrid, StatGrid } from "@/components/layout/PageLayout";
import { mockMeetings, stats } from "@/lib/mockData";

const statItems = [
  { icon: Mic, label: "Total Meetings", value: stats.totalMeetings, change: "+8 this week" },
  { icon: Clock, label: "Hours Recorded", value: `${stats.hoursRecorded}h`, change: "+6.2h this week" },
  { icon: CheckSquare, label: "Action Items", value: stats.actionItems, change: "18 pending" },
  { icon: Sparkles, label: "Insights", value: stats.insightsGenerated, change: "+47 this week" },
];

const Dashboard = () => (
  <PageShell>
    <PageHeader
      title="Good morning"
      description={`You have ${mockMeetings.filter((m) => m.status === "live").length} live meeting right now`}
    />

    <StatGrid>
      {statItems.map((stat, i) => (
        <StatCard key={stat.label} {...stat} index={i} />
      ))}
    </StatGrid>

    <section>
      <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Recent Meetings</h2>
      <MeetingGrid>
        {mockMeetings.map((meeting, i) => (
          <MeetingCard key={meeting.id} meeting={meeting} index={i} />
        ))}
      </MeetingGrid>
    </section>
  </PageShell>
);

export default Dashboard;
