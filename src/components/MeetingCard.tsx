import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, Video, MessageSquare, Monitor, Headphones } from "lucide-react";
import type { Meeting } from "@/lib/mockData";

const platformIcons: Record<string, React.ElementType> = {
  zoom: Video,
  meet: Monitor,
  teams: MessageSquare,
  slack: Headphones,
};

const MeetingCard = ({ meeting, index }: { meeting: Meeting; index: number }) => {
  const PlatformIcon = platformIcons[meeting.platform] || Video;
  const isLive = meeting.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link
        to={isLive ? "/live" : `/meeting/${meeting.id}`}
        className="block glass rounded-xl p-5 hover:shadow-glow hover:border-primary/30 transition-all duration-300 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <PlatformIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{meeting.platform}</span>
          </div>
          {isLive ? (
            <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-destructive/15 text-destructive">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
              LIVE
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">{meeting.duration}</span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {meeting.title}
        </h3>

        {meeting.summary && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{meeting.summary}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {meeting.participants.length}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {new Date(meeting.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>

        {(meeting.actionItems?.length ?? 0) > 0 && (
          <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
            <span className="text-xs text-primary font-medium">
              {meeting.actionItems?.filter((a) => !a.done).length} action items
            </span>
            <span className="text-xs text-muted-foreground">
              · {meeting.insights?.length} insights
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default MeetingCard;
