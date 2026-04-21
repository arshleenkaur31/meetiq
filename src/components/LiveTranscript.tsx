import { motion } from "framer-motion";
import type { TranscriptChunk } from "@/lib/mockData";

const LiveTranscript = ({ chunks }: { chunks: TranscriptChunk[] }) => (
  <div className="space-y-3">
    {chunks.map((chunk, i) => (
      <motion.div
        key={chunk.id}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.04, duration: 0.3 }}
        className="flex gap-3"
      >
        <span className="text-[10px] text-muted-foreground font-mono w-12 shrink-0 pt-0.5">
          {chunk.timestamp}
        </span>
        <div>
          <span className={`text-xs font-semibold ${chunk.speaker === "You" ? "text-primary" : "text-foreground"}`}>
            {chunk.speaker}
          </span>
          <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">{chunk.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default LiveTranscript;
