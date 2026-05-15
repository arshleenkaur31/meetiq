import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen relative"
    >
      <div className="bg-gradient-glow pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your MeetIQ preferences
          </p>
        </div>

        <section className="glass rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Profile</h2>
          <div className="space-y-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </section>

        <section className="glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Preferences</h2>
          <div className="space-y-6">
            {settingRows.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor={row.id} className="text-foreground">
                    {row.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.description}</p>
                </div>
                <Switch
                  id={row.id}
                  checked={row.checked}
                  onCheckedChange={row.onCheckedChange}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
