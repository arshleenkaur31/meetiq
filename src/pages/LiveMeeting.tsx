import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Square, Users, Clock } from "lucide-react";
import LiveTranscript from "@/components/LiveTranscript";
import InsightBadge from "@/components/InsightBadge";
import EntityList from "@/components/EntityList";
import { mockMeetings, mockTranscript } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

const liveMeeting = mockMeetings[0];

const LiveMeeting = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState(3);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate new transcript chunks appearing
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

  return (
    <div className="min-h-screen relative">
      <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-destructive/15 text-destructive">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
                LIVE
              </span>
              <h1 className="text-xl font-bold text-foreground">{liveMeeting.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {formatTime(elapsed)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> {liveMeeting.participants.join(", ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className="gap-2"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isRecording ? "Pause" : "Resume"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Square className="w-3 h-3" /> End Meeting
            </Button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transcript */}
          <div className="lg:col-span-2 glass rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mic className="w-4 h-4 text-primary" />
              Live Transcript
              {isRecording && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              )}
            </h2>
            <LiveTranscript chunks={mockTranscript.slice(0, visibleChunks)} />
          </div>

          {/* AI Sidebar */}
          <div className="space-y-6">
            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">AI Insights</h3>
              <div className="space-y-2">
                {liveMeeting.insights?.map((insight) => (
                  <InsightBadge key={insight.id} insight={insight} />
                ))}
              </div>
            </motion.div>

            {/* Entities */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">Detected Entities</h3>
              <EntityList entities={liveMeeting.entities || []} />
            </motion.div>

            {/* Action Items */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">Action Items</h3>
              <div className="space-y-2">
                {liveMeeting.actionItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 p-2 rounded-lg bg-secondary/30"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.priority === "high"
                          ? "bg-destructive"
                          : item.priority === "medium"
                          ? "bg-warning"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-foreground">{item.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        → {item.assignee}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMeeting;
