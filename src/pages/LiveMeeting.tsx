import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Square,
  Users,
  Clock,
  Sparkles,
  ListChecks,
  Building2,
  type LucideIcon,
} from "lucide-react";
import LiveTranscript from "@/components/LiveTranscript";
import InsightBadge from "@/components/InsightBadge";
import EntityList from "@/components/EntityList";
import LiveMeetingMobileBar from "@/components/live/LiveMeetingMobileBar";
import { mockMeetings, mockTranscript } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ActionBar, PageCard, PageShell } from "@/components/layout/PageLayout";
import { cn } from "@/lib/utils";

const liveMeeting = mockMeetings[0];

type MobilePanel = "transcript" | "insights" | "entities" | "actions";

const LiveMeeting = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState(3);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("transcript");

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording || visibleChunks >= mockTranscript.length) return;
    const timer = setTimeout(() => setVisibleChunks((v) => v + 1), 4000);
    return () => clearTimeout(timer);
  }, [isRecording, visibleChunks]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const elapsedLabel = formatTime(elapsed);
  const insightCount = liveMeeting.insights?.length ?? 0;
  const entityCount = liveMeeting.entities?.length ?? 0;
  const actionCount = liveMeeting.actionItems?.length ?? 0;

  const mobileSegments: {
    id: MobilePanel;
    label: string;
    icon: LucideIcon;
    count?: number;
  }[] = [
    { id: "transcript", label: "Transcript", icon: Mic, count: visibleChunks },
    { id: "insights", label: "Insights", icon: Sparkles, count: insightCount },
    { id: "entities", label: "Entities", icon: Building2, count: entityCount },
    { id: "actions", label: "Actions", icon: ListChecks, count: actionCount },
  ];

  const insightsContent = (
    <div className="space-y-2">
      {liveMeeting.insights?.map((insight) => (
        <InsightBadge key={insight.id} insight={insight} />
      ))}
    </div>
  );

  const actionsContent = (
    <div className="space-y-2">
      {liveMeeting.actionItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 p-3.5 rounded-xl bg-secondary/40 border border-border/30 min-h-[56px]"
        >
          <div
            className={cn(
              "w-3 h-3 rounded-full mt-1 shrink-0",
              item.priority === "high" && "bg-destructive",
              item.priority === "medium" && "bg-warning",
              item.priority === "low" && "bg-muted-foreground",
            )}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-foreground leading-snug">{item.text}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.assignee}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <PageShell className="pb-[calc(9.5rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="glass rounded-2xl p-4 border border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-destructive/20 text-destructive">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse-glow" />
              LIVE
            </span>
            {isRecording && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Mic className="w-3 h-3 text-primary" /> Recording
              </span>
            )}
          </div>
          <h1 className="text-base font-bold text-foreground leading-snug">{liveMeeting.title}</h1>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {liveMeeting.participants.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/90"
              >
                <Users className="w-3 h-3 text-muted-foreground" />
                {name}
              </span>
            ))}
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Meeting sections"
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none snap-x snap-mandatory"
        >
          {mobileSegments.map((seg) => {
            const Icon = seg.icon;
            const active = mobilePanel === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMobilePanel(seg.id)}
                className={cn(
                  "snap-start shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border min-h-12 touch-manipulation transition-colors",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-secondary/50 text-foreground border-border/40 active:bg-secondary",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{seg.label}</span>
                {seg.count !== undefined && seg.count > 0 && (
                  <span
                    className={cn(
                      "text-xs font-bold min-w-[1.25rem] h-5 px-1.5 rounded-full flex items-center justify-center",
                      active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-background/60",
                    )}
                  >
                    {seg.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="glass rounded-2xl border border-border/40 overflow-hidden min-h-[280px] max-h-[min(52vh,420px)] flex flex-col"
        >
          <div className="px-4 py-3 border-b border-border/30 bg-secondary/20 shrink-0">
            <p className="text-sm font-semibold text-foreground">
              {mobileSegments.find((s) => s.id === mobilePanel)?.label}
            </p>
            {mobilePanel === "transcript" && isRecording && (
              <p className="text-xs text-primary mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                Updating live…
              </p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4">
            {mobilePanel === "transcript" && (
              <LiveTranscript chunks={mockTranscript.slice(0, visibleChunks)} variant="chat" />
            )}
            {mobilePanel === "insights" && insightsContent}
            {mobilePanel === "entities" && <EntityList entities={liveMeeting.entities || []} />}
            {mobilePanel === "actions" && actionsContent}
          </div>
        </div>
      </div>

      <LiveMeetingMobileBar
        elapsed={elapsedLabel}
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording(!isRecording)}
      />

      {/* Desktop */}
      <header className="hidden lg:block mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-destructive/15 text-destructive shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
            LIVE
          </span>
          <h1 className="text-xl font-bold text-foreground">{liveMeeting.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 shrink-0" /> {elapsedLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 shrink-0" />
            {liveMeeting.participants.join(", ")}
          </span>
        </div>
        <ActionBar>
          <Button variant="outline" size="sm" onClick={() => setIsRecording(!isRecording)} className="gap-2">
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {isRecording ? "Pause" : "Resume"}
          </Button>
          <Button variant="destructive" size="sm" className="gap-2">
            <Square className="w-3 h-3" /> End Meeting
          </Button>
        </ActionBar>
      </header>

      <div className="hidden lg:grid grid-cols-3 gap-6">
        <PageCard className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Mic className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-foreground">Live Transcript</span>
            {isRecording && <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />}
          </div>
          <LiveTranscript chunks={mockTranscript.slice(0, visibleChunks)} />
        </PageCard>
        <div className="space-y-6">
          <PageCard title="AI Insights">{insightsContent}</PageCard>
          <PageCard title="Detected Entities">
            <EntityList entities={liveMeeting.entities || []} />
          </PageCard>
          <PageCard title="Action Items">{actionsContent}</PageCard>
        </div>
      </div>
    </PageShell>
  );
};

export default LiveMeeting;


