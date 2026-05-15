import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InsightBadge from "@/components/InsightBadge";
import EntityList from "@/components/EntityList";
import LiveTranscript from "@/components/LiveTranscript";
import { mockMeetings } from "@/lib/mockData";
import {
  ActionBar,
  PageCard,
  PageShell,
  ResponsiveTabs,
} from "@/components/layout/PageLayout";

const MeetingDetail = () => {
  const { id } = useParams();
  const meeting = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <PageShell>
        <p className="text-center text-muted-foreground py-16">Meeting not found</p>
      </PageShell>
    );
  }

  const dateLabel = new Date(meeting.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const insightsPanel = (
    <div className="space-y-2">
      {meeting.insights?.map((insight) => (
        <InsightBadge key={insight.id} insight={insight} />
      ))}
    </div>
  );

  const actionsPanel = (
    <div className="space-y-2">
      {meeting.actionItems?.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-secondary/30 min-h-[52px]"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              defaultChecked={item.done}
              className="w-5 h-5 rounded accent-primary shrink-0 mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm leading-snug ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.text}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">→ {item.assignee}</p>
            </div>
          </div>
          <span
            className={`self-start sm:self-center text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
              item.priority === "high"
                ? "bg-destructive/15 text-destructive"
                : item.priority === "medium"
                  ? "bg-warning/15 text-warning"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {item.priority}
          </span>
        </div>
      ))}
    </div>
  );

  const transcriptPanel = <LiveTranscript chunks={meeting.transcript!} />;
  const entitiesPanel = <EntityList entities={meeting.entities!} />;

  const mobileTabs = [
    ...(meeting.insights?.length ? [{ value: "insights", label: "Insights", content: insightsPanel }] : []),
    ...(meeting.actionItems?.length ? [{ value: "actions", label: "Actions", content: actionsPanel }] : []),
    ...(meeting.transcript?.length ? [{ value: "transcript", label: "Transcript", content: transcriptPanel }] : []),
    ...(meeting.entities?.length ? [{ value: "entities", label: "Entities", content: entitiesPanel }] : []),
  ];

  return (
    <PageShell>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 min-h-11 touch-manipulation -ml-1 px-1"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <header className="mb-5 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{meeting.title}</h1>
        <p className="text-sm text-muted-foreground mt-2 space-y-1">
          <span className="block">{dateLabel}</span>
          <span className="block">
            {meeting.duration} · {meeting.participants.join(", ")}
          </span>
        </p>
        <div className="mt-4">
          <ActionBar>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
          </ActionBar>
        </div>
      </header>

      {meeting.summary && (
        <PageCard title="Executive Summary" className="mb-4 sm:mb-6">
          <p className="text-sm text-foreground/80 leading-relaxed">{meeting.summary}</p>
        </PageCard>
      )}

      {mobileTabs.length > 0 && (
        <ResponsiveTabs defaultValue={mobileTabs[0].value} tabs={mobileTabs} />
      )}

      <div className="hidden lg:grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {(meeting.insights?.length ?? 0) > 0 && (
            <PageCard title="Key Insights">{insightsPanel}</PageCard>
          )}
          {(meeting.actionItems?.length ?? 0) > 0 && (
            <PageCard title="Action Items">{actionsPanel}</PageCard>
          )}
          {(meeting.transcript?.length ?? 0) > 0 && (
            <PageCard title="Full Transcript">{transcriptPanel}</PageCard>
          )}
        </div>
        {(meeting.entities?.length ?? 0) > 0 && (
          <PageCard title="Mentioned Entities">{entitiesPanel}</PageCard>
        )}
      </div>
    </PageShell>
  );
};

export default MeetingDetail;
