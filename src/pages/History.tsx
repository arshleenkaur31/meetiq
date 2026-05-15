import { Clock } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { EmptyState, MeetingGrid, PageHeader, PageShell } from "@/components/layout/PageLayout";
import { mockMeetings } from "@/lib/mockData";

const History = () => {
  const pastMeetings = mockMeetings.filter((m) => m.status !== "live");

  return (
    <PageShell>
      <PageHeader
        title="Meeting History"
        description={`${pastMeetings.length} past meetings`}
      />

      {pastMeetings.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No past meetings"
          description="Completed meetings will appear here."
        />
      ) : (
        <MeetingGrid>
          {pastMeetings.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </MeetingGrid>
      )}
    </PageShell>
  );
};

export default History;
