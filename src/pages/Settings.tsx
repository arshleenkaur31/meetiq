import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  ListGroup,
  ListGroupItem,
  PageCard,
  PageHeader,
  PageShell,
} from "@/components/layout/PageLayout";

const Settings = () => {
  const [autoRecord, setAutoRecord] = useState(true);
  const [liveInsights, setLiveInsights] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [displayName, setDisplayName] = useState("You");

  const settingRows = [
    {
      id: "auto-record",
      label: "Auto-record meetings",
      description: "Start recording when a supported meeting begins",
      checked: autoRecord,
      onCheckedChange: setAutoRecord,
    },
    {
      id: "live-insights",
      label: "Live insights",
      description: "Show real-time AI insights during meetings",
      checked: liveInsights,
      onCheckedChange: setLiveInsights,
    },
    {
      id: "email-digest",
      label: "Weekly email digest",
      description: "Summary of action items and insights",
      checked: emailDigest,
      onCheckedChange: setEmailDigest,
    },
  ];

  return (
    <PageShell narrow>
      <PageHeader title="Settings" description="Manage your MeetIQ preferences" />

      <PageCard title="Profile" className="mb-4 sm:mb-6">
        <div className="space-y-2">
          <Label htmlFor="display-name">Display name</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-11 sm:h-10"
          />
        </div>
      </PageCard>

      <PageCard title="Preferences">
        <ListGroup>
          {settingRows.map((row) => (
            <ListGroupItem key={row.id}>
              <div className="min-w-0 flex-1 pr-2">
                <Label htmlFor={row.id} className="text-foreground text-sm font-medium">
                  {row.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{row.description}</p>
              </div>
              <Switch
                id={row.id}
                checked={row.checked}
                onCheckedChange={row.onCheckedChange}
                className="shrink-0 scale-110 sm:scale-100"
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </PageCard>
    </PageShell>
  );
};

export default Settings;
