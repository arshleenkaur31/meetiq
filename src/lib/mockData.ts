export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  platform: "zoom" | "meet" | "teams" | "slack";
  participants: string[];
  status: "live" | "completed" | "scheduled";
  summary?: string;
  actionItems?: ActionItem[];
  insights?: Insight[];
  entities?: Entity[];
  transcript?: TranscriptChunk[];
}

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  done: boolean;
}

export interface Insight {
  id: string;
  type: "decision" | "risk" | "opportunity" | "sentiment" | "pain-point" | "feature-request";
  text: string;
  confidence: number;
}

export interface Entity {
  id: string;
  type: "company" | "person" | "tool" | "url" | "competitor";
  name: string;
  url?: string;
}

export interface TranscriptChunk {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
}

export const mockTranscript: TranscriptChunk[] = [
  { id: "1", speaker: "You", text: "Thanks for joining, Sarah. Let's talk about Series A timeline.", timestamp: "00:00:12" },
  { id: "2", speaker: "Sarah Chen", text: "Absolutely. I've reviewed the deck — the traction numbers are compelling. 40% MoM growth is strong.", timestamp: "00:00:28" },
  { id: "3", speaker: "You", text: "Yes, and we just closed our biggest enterprise deal with Stripe. $120K ARR contract.", timestamp: "00:00:45" },
  { id: "4", speaker: "Sarah Chen", text: "That's great social proof. What's your burn rate and runway looking like?", timestamp: "00:01:02" },
  { id: "5", speaker: "You", text: "We're at $85K monthly burn. Current runway is about 14 months. But we want to raise to accelerate hiring.", timestamp: "00:01:18" },
  { id: "6", speaker: "Sarah Chen", text: "Makes sense. I'd suggest targeting $5-8M for the round. Sequoia and a16z have been active in this space.", timestamp: "00:01:35" },
  { id: "7", speaker: "You", text: "We're also looking at Accel and Lightspeed. Any concerns about our competitive position vs. Notion AI?", timestamp: "00:01:52" },
  { id: "8", speaker: "Sarah Chen", text: "The differentiation is clear — your founder-specific angle is unique. But you need to build moats around the data layer.", timestamp: "00:02:10" },
];

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Series A Strategy Call with Sarah Chen",
    date: "2026-04-12T10:00:00",
    duration: "45 min",
    platform: "zoom",
    participants: ["You", "Sarah Chen"],
    status: "live",
    summary: "Discussing Series A fundraising strategy, target investors, and competitive positioning.",
    actionItems: [
      { id: "a1", text: "Prepare updated pitch deck with Stripe case study", assignee: "You", priority: "high", done: false },
      { id: "a2", text: "Schedule intro calls with Sequoia and a16z", assignee: "Sarah Chen", priority: "high", done: false },
      { id: "a3", text: "Build competitive moat analysis document", assignee: "You", priority: "medium", done: false },
    ],
    insights: [
      { id: "i1", type: "opportunity", text: "Investor Sarah Chen is bullish — strong buying signal detected", confidence: 0.92 },
      { id: "i2", type: "decision", text: "Target round size: $5-8M Series A", confidence: 0.88 },
      { id: "i3", type: "risk", text: "Competitive threat from Notion AI needs addressing", confidence: 0.75 },
      { id: "i4", type: "sentiment", text: "Positive investor sentiment on traction metrics", confidence: 0.95 },
    ],
    entities: [
      { id: "e1", type: "company", name: "Stripe", url: "https://stripe.com" },
      { id: "e2", type: "company", name: "Sequoia Capital", url: "https://sequoiacap.com" },
      { id: "e3", type: "company", name: "a16z", url: "https://a16z.com" },
      { id: "e4", type: "company", name: "Accel", url: "https://accel.com" },
      { id: "e5", type: "competitor", name: "Notion AI", url: "https://notion.so" },
      { id: "e6", type: "person", name: "Sarah Chen" },
    ],
    transcript: mockTranscript,
  },
  {
    id: "2",
    title: "Product Roadmap Review — Q2 Planning",
    date: "2026-04-11T14:00:00",
    duration: "60 min",
    platform: "meet",
    participants: ["You", "Alex Rivera", "Priya Patel"],
    status: "completed",
    summary: "Reviewed Q2 product roadmap priorities. Agreed on shipping AI copilot v2 and enterprise SSO by end of May.",
    actionItems: [
      { id: "a4", text: "Finalize AI copilot v2 spec", assignee: "Alex Rivera", priority: "high", done: true },
      { id: "a5", text: "Research SSO providers (Okta, Auth0)", assignee: "Priya Patel", priority: "medium", done: false },
    ],
    insights: [
      { id: "i5", type: "decision", text: "AI copilot v2 is top priority for Q2", confidence: 0.95 },
      { id: "i6", type: "feature-request", text: "Enterprise SSO requested by 3 pipeline customers", confidence: 0.88 },
    ],
    entities: [
      { id: "e7", type: "tool", name: "Okta", url: "https://okta.com" },
      { id: "e8", type: "tool", name: "Auth0", url: "https://auth0.com" },
    ],
    transcript: [],
  },
  {
    id: "3",
    title: "Customer Discovery — Acme Corp",
    date: "2026-04-10T09:30:00",
    duration: "30 min",
    platform: "teams",
    participants: ["You", "James Liu (Acme Corp)"],
    status: "completed",
    summary: "Discussed Acme Corp's meeting workflow pain points. Strong interest in real-time action item extraction.",
    actionItems: [
      { id: "a6", text: "Send Acme Corp a pilot proposal", assignee: "You", priority: "high", done: false },
    ],
    insights: [
      { id: "i7", type: "pain-point", text: "Acme spends 5+ hours/week on meeting notes manually", confidence: 0.9 },
      { id: "i8", type: "opportunity", text: "Potential $50K ARR deal if pilot succeeds", confidence: 0.7 },
    ],
    entities: [
      { id: "e9", type: "company", name: "Acme Corp" },
      { id: "e10", type: "person", name: "James Liu" },
    ],
    transcript: [],
  },
  {
    id: "4",
    title: "Weekly Team Standup",
    date: "2026-04-09T09:00:00",
    duration: "15 min",
    platform: "slack",
    participants: ["You", "Alex Rivera", "Priya Patel", "Jordan Kim"],
    status: "completed",
    summary: "Quick sync on sprint progress. All on track except auth migration which is 1 day behind.",
    actionItems: [],
    insights: [
      { id: "i9", type: "risk", text: "Auth migration delayed — could impact enterprise launch", confidence: 0.65 },
    ],
    entities: [],
    transcript: [],
  },
];

export const stats = {
  totalMeetings: 47,
  hoursRecorded: 38.5,
  actionItems: 124,
  insightsGenerated: 312,
};
