import { Building2, User, Wrench, Globe, Swords } from "lucide-react";
import type { Entity } from "@/lib/mockData";

const entityIcons: Record<string, React.ElementType> = {
  company: Building2,
  person: User,
  tool: Wrench,
  url: Globe,
  competitor: Swords,
};

const EntityList = ({ entities }: { entities: Entity[] }) => (
  <div className="space-y-2">
    {entities.map((entity) => {
      const Icon = entityIcons[entity.type] || Globe;
      return (
        <div
          key={entity.id}
          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/40 transition-colors group"
        >
          <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground font-medium truncate">{entity.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{entity.type}</p>
          </div>
          {entity.url && (
            <a
              href={entity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              Open →
            </a>
          )}
        </div>
      );
    })}
  </div>
);

export default EntityList;
