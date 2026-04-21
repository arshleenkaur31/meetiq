import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Heart,
  MessageCircle,
  Star,
} from "lucide-react";
import type { Insight } from "@/lib/mockData";

const insightConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  decision: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", label: "Decision" },
  risk: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Risk" },
  opportunity: { icon: Lightbulb, color: "text-success", bg: "bg-success/10", label: "Opportunity" },
  sentiment: { icon: Heart, color: "text-info", bg: "bg-info/10", label: "Sentiment" },
  "pain-point": { icon: MessageCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Pain Point" },
  "feature-request": { icon: Star, color: "text-warning", bg: "bg-warning/10", label: "Feature Request" },
};

const InsightBadge = ({ insight }: { insight: Insight }) => {
  const config = insightConfig[insight.type] || insightConfig.decision;
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/20">
      <div className={`w-7 h-7 rounded-md ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${config.color}`}>
          {config.label}
        </span>
        <p className="text-xs text-foreground mt-0.5 leading-relaxed">{insight.text}</p>
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0">
        {Math.round(insight.confidence * 100)}%
      </span>
    </div>
  );
};

export default InsightBadge;
