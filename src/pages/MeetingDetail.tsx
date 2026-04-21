import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InsightBadge from "@/components/InsightBadge";
import EntityList from "@/components/EntityList";
import LiveTranscript from "@/components/LiveTranscript";
import { mockMeetings } from "@/lib/mockData";

const MeetingDetail = () => {
  const { id } = useParams();
  const meeting = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Meeting not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 p-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground">{meeting.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(meeting.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {meeting.duration} · {meeting.participants.join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        {meeting.summary && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 mb-6"
          >
            <h2 className="text-sm font-semibold text-foreground mb-2">Executive Summary</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">{meeting.summary}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Insights + Actions */}
          <div className="lg:col-span-2 space-y-6">
            {(meeting.insights?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-sm font-semibold text-foreground mb-3">Key Insights</h2>
                <div className="space-y-2">
                  {meeting.insights?.map((insight) => (
                    <InsightBadge key={insight.id} insight={insight} />
                  ))}
                </div>
              </motion.div>
            )}

            {(meeting.actionItems?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-sm font-semibold text-foreground mb-3">Action Items</h2>
                <div className="space-y-2">
                  {meeting.actionItems?.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <input
                        type="checkbox"
                        defaultChecked={item.done}
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {item.text}
                        </p>
                        <p className="text-[10px] text-muted-foreground">→ {item.assignee}</p>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
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
              </motion.div>
            )}

            {(meeting.transcript?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="text-sm font-semibold text-foreground mb-4">Full Transcript</h2>
                <LiveTranscript chunks={meeting.transcript!} />
              </motion.div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {(meeting.entities?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-5"
              >
                <h3 className="text-sm font-semibold text-foreground mb-3">Mentioned Entities</h3>
                <EntityList entities={meeting.entities!} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
