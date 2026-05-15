import { motion } from "framer-motion";
import type { TranscriptChunk } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface LiveTranscriptProps {
  chunks: TranscriptChunk[];
  variant?: "default" | "chat";
}

const LiveTranscript = ({ chunks, variant = "default" }: LiveTranscriptProps) => {
  if (variant === "chat") {
    return (
      <div className="flex flex-col gap-3 pb-2">
        {chunks.map((chunk, i) => {
          const isYou = chunk.speaker === "You";
          return (
            <motion.div
              key={chunk.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className={cn("flex flex-col max-w-[92%]", isYou ? "ml-auto items-end" : "mr-auto items-start")}
            >
              <span className="text-[10px] text-muted-foreground mb-1 px-1">
                {chunk.speaker} · {chunk.timestamp}
              </span>
              <div
                className={cn(
                  "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
                  isYou
                    ? "bg-primary/20 text-foreground rounded-br-md"
                    : "bg-secondary/80 text-foreground/90 rounded-bl-md border border-border/30",
                )}
              >
                {chunk.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {chunks.map((chunk, i) => (
        <motion.div
          key={chunk.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="flex gap-2 sm:gap-3"
        >
          <span className="text-[10px] sm:text-xs text-muted-foreground font-mono w-10 sm:w-12 shrink-0 pt-0.5">
            {chunk.timestamp}
          </span>
          <div className="min-w-0 flex-1">
            <span
              className={`text-xs font-semibold ${chunk.speaker === "You" ? "text-primary" : "text-foreground"}`}
            >
              {chunk.speaker}
            </span>
            <p className="text-sm text-foreground/80 leading-relaxed mt-0.5 break-words">{chunk.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveTranscript;
