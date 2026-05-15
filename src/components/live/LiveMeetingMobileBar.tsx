import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LiveMeetingMobileBarProps {
  elapsed: string;
  isRecording: boolean;
  onToggleRecording: () => void;
}

const LiveMeetingMobileBar = ({ elapsed, isRecording, onToggleRecording }: LiveMeetingMobileBarProps) => (
  <div
    className={cn(
      "lg:hidden fixed left-0 right-0 z-30",
      "bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))]",
      "px-3 py-2.5 glass-strong border-t border-border/50 shadow-[0_-8px_32px_rgba(0,0,0,0.35)]",
    )}
  >
    <div className="flex items-center gap-2 max-w-lg mx-auto">
      <div className="shrink-0 w-14 text-center rounded-lg bg-secondary/60 py-1.5 px-1">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Time</p>
        <p className="text-base font-mono font-bold text-foreground tabular-nums">{elapsed}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onToggleRecording}
        className="flex-1 min-h-12 gap-2 text-sm font-semibold touch-manipulation"
      >
        {isRecording ? <MicOff className="w-5 h-5 shrink-0" /> : <Mic className="w-5 h-5 shrink-0" />}
        {isRecording ? "Pause" : "Resume"}
      </Button>

      <Button
        type="button"
        variant="destructive"
        className="flex-1 min-h-12 gap-2 text-sm font-semibold touch-manipulation"
      >
        <Square className="w-4 h-4 shrink-0 fill-current" />
        End
      </Button>
    </div>
  </div>
);

export default LiveMeetingMobileBar;
