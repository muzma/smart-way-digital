'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  MessageCircle,
  Sparkles,
  AudioLines,
  ChartNoAxesCombined,
  GraduationCap,
  Library,
  LayoutGrid,
  CircleCheck,
  Info,
  Star,
  Plus,
  ArrowRight,
  Mic,
  BadgeCheck,
  Volume2,
  PlayCircle,
  PauseCircle,
  Wand2,
  ClipboardCheck,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// If shadcn/ui is available in this environment, use it. Otherwise, fall back to simple primitives.

export function Button(
  { className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm border border-black/5 bg-white hover:bg-zinc-50 active:scale-[.99] transition " +
        className
      }
    />
  );
}

export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div {...props} className={"rounded-3xl border bg-white shadow-sm " + className} />
  );
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div {...props} className={"p-5 border-b " + className} />;
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return <h3 {...props} className={"text-lg font-semibold " + className} />;
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div {...props} className={"p-5 " + className} />;
}

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      {...props}
      className={
        "w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 " +
        className
      }
    />
  );
}

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 min-h-[120px] " +
        className
      }
    />
  );
}

export function Badge({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): JSX.Element {
  return (
    <span
      {...props}
      className={
        "inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs " +
        className
      }
    />
  );
}

export function Separator({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div {...props} className={"h-px bg-zinc-200 " + className} />;
}

export function ScrollArea({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div {...props} className={"overflow-auto " + className} />;
}

let ui = {} as any;
try {
  // @ts-ignore
  ui = {
    // @ts-ignore
    Button: (await import("@/components/ui/button")).Button,
    Card: (await import("@/components/ui/card")).Card,
    CardContent: (await import("@/components/ui/card")).CardContent,
    CardHeader: (await import("@/components/ui/card")).CardHeader,
    CardTitle: (await import("@/components/ui/card")).CardTitle,
    Input: (await import("@/components/ui/input")).Input,
    Textarea: (await import("@/components/ui/textarea")).Textarea,
    Badge: (await import("@/components/ui/badge")).Badge,
    Tabs: (await import("@/components/ui/tabs")).Tabs,
    TabsList: (await import("@/components/ui/tabs")).TabsList,
    TabsTrigger: (await import("@/components/ui/tabs")).TabsTrigger,
    TabsContent: (await import("@/components/ui/tabs")).TabsContent,
    Separator: (await import("@/components/ui/separator")).Separator,
    Tooltip: (await import("@/components/ui/tooltip")).Tooltip,
    TooltipProvider: (await import("@/components/ui/tooltip")).TooltipProvider,
    TooltipTrigger: (await import("@/components/ui/tooltip")).TooltipTrigger,
    TooltipContent: (await import("@/components/ui/tooltip")).TooltipContent,
    Switch: (await import("@/components/ui/switch")).Switch,
    Slider: (await import("@/components/ui/slider")).Slider,
    Progress: (await import("@/components/ui/progress")).Progress,
    ScrollArea: (await import("@/components/ui/scroll-area")).ScrollArea,
    Sheet: (await import("@/components/ui/sheet")).Sheet,
    SheetTrigger: (await import("@/components/ui/sheet")).SheetTrigger,
    SheetContent: (await import("@/components/ui/sheet")).SheetContent,
    Avatar: (await import("@/components/ui/avatar")).Avatar,
    AvatarImage: (await import("@/components/ui/avatar")).AvatarImage,
    AvatarFallback: (await import("@/components/ui/avatar")).AvatarFallback,
    Dialog: (await import("@/components/ui/dialog")).Dialog,
    DialogTrigger: (await import("@/components/ui/dialog")).DialogTrigger,
    DialogContent: (await import("@/components/ui/dialog")).DialogContent,
    DialogHeader: (await import("@/components/ui/dialog")).DialogHeader,
    DialogTitle: (await import("@/components/ui/dialog")).DialogTitle,
  };
} catch (e) {
  // soft fallback primitives
  ui.Button = Button;
  ui.Card = Card;
  ui.CardHeader = CardHeader;
  ui.CardTitle = CardTitle;
  ui.CardContent = CardContent;
  ui.Input = Input;
  ui.Textarea = Textarea;
  ui.Badge = Badge;
  ui.Separator = Separator;
  ui.ScrollArea = ScrollArea;
}

// ---------- Helpers & mock data ----------
const tenseGroups: Record<string, { key: string; name: string; pattern: string; example: string }[]> = {
  Past: [
    { key: "past_simple", name: "Past Simple", pattern: "S + V2", example: "I walked to school yesterday." },
    { key: "past_cont", name: "Past Continuous", pattern: "S + was/were + V-ing", example: "I was walking when it rained." },
    { key: "past_perf", name: "Past Perfect", pattern: "S + had + V3", example: "I had finished before 8." },
    { key: "past_perf_cont", name: "Past Perfect Cont.", pattern: "S + had been + V-ing", example: "I had been studying for hours." },
  ],
  Present: [
    { key: "pres_simple", name: "Present Simple", pattern: "S + V1(s/es)", example: "She studies English." },
    { key: "pres_cont", name: "Present Continuous", pattern: "S + am/is/are + V-ing", example: "She is studying now." },
    { key: "pres_perf", name: "Present Perfect", pattern: "S + has/have + V3", example: "She has studied since 5." },
    { key: "pres_perf_cont", name: "Present Perfect Cont.", pattern: "S + has/have been + V-ing", example: "She has been studying for 2 hours." },
  ],
  Future: [
    { key: "fut_simple", name: "Future Simple", pattern: "S + will + V1", example: "They will travel tomorrow." },
    { key: "be_going_to", name: "Be going to", pattern: "S + am/is/are going to + V1", example: "They are going to travel soon." },
    { key: "fut_cont", name: "Future Continuous", pattern: "S + will be + V-ing", example: "They will be traveling at 9." },
    { key: "fut_perf", name: "Future Perfect", pattern: "S + will have + V3", example: "They will have finished by 10." },
  ],
};

const collocations: Record<string, string[]> = {
  decision: ["make a decision", "reach a decision", "tough decision"],
  coffee: ["order coffee", "strong coffee", "black coffee"],
  interview: ["job interview", "interview skills", "mock interview"],
  direction: ["ask for directions", "give clear directions"],
  huge: ["huge success", "huge difference"],
};

const simpleDict: Record<string, { id: string; word: string; meaning: string; ipa?: string; example?: string }> = {
  decision: { id: "decision", word: "decision", meaning: "a choice that you make", ipa: "/dɪˈsɪʒ.ən/", example: "I made a decision to study daily." },
  coffee: { id: "coffee", word: "coffee", meaning: "a hot drink made from roasted beans", ipa: "/ˈkɒf.i/", example: "I ordered a cup of coffee." },
  interview: { id: "interview", word: "interview", meaning: "a formal meeting with questions", ipa: "/ˈɪn.tə.vjuː/", example: "She has a job interview tomorrow." },
  directions: { id: "directions", word: "directions", meaning: "instructions about how to get to a place", ipa: "/dəˈrɛkʃənz/", example: "We asked for directions to the museum." },
  huge: { id: "huge", word: "huge", meaning: "very big", ipa: "/hjuːdʒ/", example: "a huge improvement" },
};

const authenticSnippets = [
  {
    id: "news-1",
    title: "Morning Coffee Ritual",
    level: "A2",
    source: "mini-article",
    text:
      "Every morning, I make a decision to start my day with coffee. I listen to a short podcast while I wait. Then I write a quick plan for the day.",
  },
  {
    id: "dialog-1",
    title: "Asking for Directions",
    level: "B1",
    source: "dialogue",
    text:
      "Excuse me, could you tell me how to get to Maplewood School? Sure, go straight, then turn left at the second traffic light.",
  },
  {
    id: "work-1",
    title: "Interview Day",
    level: "B1",
    source: "story",
    text:
      "Lina has a job interview today. She reviews common questions and practices calm breathing to reduce stress.",
  },
];

// Simple SRS scheduler (Again/Good/Easy)
function scheduleNextReview(card: FlashCard, rating: "again" | "good" | "easy") {
  const now = Date.now();
  const intervals = { again: 5 * 60 * 1000, good: 24 * 60 * 60 * 1000, easy: 72 * 60 * 60 * 1000 }; // 5 min, 1 day, 3 days
  const easeAdj = rating === "again" ? 0.9 : rating === "good" ? 1.0 : 1.15;
  const newEase = Math.max(1.3, Math.min(2.5, (card.ease ?? 2.0) * easeAdj));
  const base = card.intervalMs ? card.intervalMs * (rating === "again" ? 0.5 : rating === "good" ? 1.4 : 2) : intervals[rating];
  return {
    ...card,
    ease: newEase,
    intervalMs: base,
    dueAt: now + base,
    history: [...(card.history ?? []), { at: now, rating }],
  } as FlashCard;
}

// Types
type FlashCard = {
  id: string;
  word: string;
  context: string;
  meaning?: string;
  collocations?: string[];
  ipa?: string;
  dueAt?: number;
  intervalMs?: number;
  ease?: number;
  history?: { at: number; rating: string }[];
};

// ---------- UI building blocks ----------
const { Button, Card, CardHeader, CardTitle, CardContent, Input, Textarea, Badge, Separator, ScrollArea } = ui;

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="size-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white shadow">
        <Sparkles className="size-5" />
      </div>
      <div>
        <div className="text-sm text-zinc-500 leading-none">THE SMART WAY</div>
        <div className="text-xl font-bold tracking-tight">Digital</div>
      </div>
    </div>
  );
}

function Sidebar({ current, onChange }: { current: string; onChange: (k: string) => void }) {
  const items = [
    { key: "core", label: "The Core", icon: Brain, desc: "Pondasi Logika" },
    { key: "context", label: "Context is King", icon: Library, desc: "Konten Otentik" },
    { key: "sandbox", label: "The Sandbox", icon: MessageCircle, desc: "Latihan Aman" },
    { key: "progress", label: "Progress Tracker", icon: ChartNoAxesCombined, desc: "Papan Kemajuan" },
  ];
  return (
    <div className="w-full lg:w-72 shrink-0 p-3">
      <Card className="sticky top-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between"><Brand /> <Settings className="size-4 text-zinc-400" /></CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid gap-2">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onChange(it.key)}
                className={
                  "group w-full flex items-center justify-between rounded-2xl border p-3 text-left hover:bg-zinc-50 transition " +
                  (current === it.key ? "border-indigo-300 bg-indigo-50" : "border-zinc-200")
                }
              >
                <div className="flex items-center gap-3">
                  <it.icon className="size-5 text-zinc-600 group-hover:text-zinc-900" />
                  <div>
                    <div className="font-semibold">{it.label}</div>
                    <div className="text-xs text-zinc-500">{it.desc}</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-zinc-400" />
              </button>
            ))}
          </nav>
          <Separator className="my-4" />
          <div className="text-xs text-zinc-500">Filosofi: <span className="font-medium text-zinc-700">Coach pribadi, logis, kontekstual.</span></div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Module 1: The Core ----------
function MindMap({ onPickTense }: { onPickTense: (t: any) => void }) {
  const [zone, setZone] = useState<"Past" | "Present" | "Future" | null>(null);
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><LayoutGrid className="size-5" /> Peta Pikiran Interaktif</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[320px] grid place-items-center bg-gradient-to-b from-white to-zinc-50 rounded-2xl">
          {/* Center node */}
          <motion.div layout className="relative">
            <div className="rounded-full px-5 py-3 bg-indigo-600 text-white shadow-lg">WAKTU & KEJADIAN</div>
          </motion.div>

          {/* Branch buttons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-6 -translate-x-1/2 pointer-events-auto">
              <Branch label="Present" color="emerald" onClick={() => setZone("Present")} />
            </div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto">
              <Branch label="Past" color="orange" onClick={() => setZone("Past")} />
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
              <Branch label="Future" color="violet" onClick={() => setZone("Future")} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {zone && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-500">Zona dipilih: <span className="font-semibold text-zinc-700">{zone}</span></div>
                <ui.Button onClick={() => setZone(null)} className="text-xs">Tutup</ui.Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                {tenseGroups[zone].map((t) => (
                  <div
                    key={t.key}
                    onClick={() => onPickTense({ ...t, zone })}
                    className="group cursor-pointer rounded-2xl border p-4 hover:shadow-md hover:-translate-y-0.5 transition bg-white"
                  >
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">{zone}</div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-zinc-600 mt-1">Pola: {t.pattern}</div>
                    <div className="text-sm text-zinc-500 mt-2 italic group-hover:text-zinc-700">“{t.example}”</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function Branch({ label, color, onClick }: { label: string; color: "emerald" | "orange" | "violet"; onClick: () => void }) {
  const colorMap: any = {
    emerald: "from-emerald-500 to-emerald-600",
    orange: "from-orange-500 to-orange-600",
    violet: "from-violet-500 to-violet-600",
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-4 py-2 bg-gradient-to-br ${colorMap[color]} text-white shadow`}
    >
      {label}
    </motion.button>
  );
}

function TenseInfo({ tense, onSpeak }: { tense: any; onSpeak: (text: string) => void }) {
  if (!tense) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BookOpen className="size-5" /> {tense.name} <Badge className="ml-2">{tense.zone}</Badge></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-zinc-500">Pola</div>
            <div className="font-semibold text-zinc-800">{tense.pattern}</div>
            <div className="text-sm text-zinc-500 mt-3">Contoh</div>
            <div className="text-zinc-800 italic">“{tense.example}”</div>
          </div>
          <div className="flex items-center gap-3">
            <ui.Button onClick={() => onSpeak(tense.example)}><Volume2 className="size-4" /> Dengarkan</ui.Button>
            <Badge className="bg-zinc-100 text-zinc-700">Fokus: logika waktu</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SentenceBuilder() {
  const slots = ["Subject", "Aux", "Verb", "Object/Time"] as const;
  type Slot = typeof slots[number];
  const [bank, setBank] = useState<string[]>(["I", "She", "was", "is", "walk", "walked", "to school", "yesterday", "now"]);
  const [placed, setPlaced] = useState<Record<Slot, string | null>>({ Subject: null, Aux: null, Verb: null, "Object/Time": null });
  const [feedback, setFeedback] = useState<string>("");

  const allowDrop = (e: React.DragEvent) => e.preventDefault();
  const onDragStart = (e: React.DragEvent, token: string) => {
    e.dataTransfer.setData("text/plain", token);
  };
  const onDrop = (slot: Slot, e: React.DragEvent) => {
    e.preventDefault();
    const token = e.dataTransfer.getData("text/plain");
    if (!token) return;
    // remove from bank if present
    setBank((b) => b.filter((t) => t !== token));
    setPlaced((p) => ({ ...p, [slot]: token }));
    setFeedback("");
  };
  const reset = () => {
    setBank(["I", "She", "was", "is", "walk", "walked", "to school", "yesterday", "now"]);
    setPlaced({ Subject: null, Aux: null, Verb: null, "Object/Time": null });
    setFeedback("");
  };

  function check() {
    const s = placed.Subject, a = placed.Aux, v = placed.Verb, o = placed["Object/Time"];
    const sentence = [s, a, v, o].filter(Boolean).join(" ") + ".";
    // Simple logic: if there is "yesterday" then Aux should be was/were and Verb should be V-ing or V2; if "now", prefer is/am/are + V-ing
    if (o === "yesterday") {
      if (a === "is") {
        setFeedback("Ingat, untuk cerita di masa lalu, gunakan 'was'/'were'. 'Is' untuk kejadian sekarang.");
        return;
      }
      if (v === "walk") {
        setFeedback("Untuk masa lalu sederhana, gunakan V2: 'walked'.");
        return;
      }
      setFeedback("✅ Bagus! Kalimat masa lalu sudah tepat: " + sentence);
    } else if (o === "now") {
      if (a !== "is") {
        setFeedback("Untuk kejadian sekarang yang sedang berlangsung, gunakan 'am/is/are'.");
        return;
      }
      if (v !== "walk") {
        setFeedback("Untuk present continuous, gunakan bentuk V-ing seperti 'walking' (disederhanakan di demo).");
        return;
      }
      setFeedback("✅ Bagus! Logika waktu sekarang terpakai: " + sentence);
    } else {
      setFeedback("Coba tambahkan keterangan waktu agar logika makin jelas (mis. 'yesterday' atau 'now').");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wand2 className="size-5" /> Simulator Kalimat (Drag & Drop)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <div key={slot} onDrop={(e) => onDrop(slot, e)} onDragOver={allowDrop} className="rounded-2xl border border-dashed p-4 min-h-[64px] bg-zinc-50">
                  <div className="text-xs text-zinc-500 mb-1">{slot}</div>
                  <div className="font-semibold text-zinc-800">{placed[slot] ?? <span className="text-zinc-400">(drop here)</span>}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Button onClick={check} className="">Check</Button>
              <Button onClick={reset} className="" variant="ghost">Reset</Button>
              <div className="text-sm text-zinc-600">Tip: Geser token ke slot yang sesuai.</div>
            </div>
            {feedback && (
              <div className="mt-3 rounded-2xl bg-amber-50 text-amber-900 p-3 border border-amber-200">{feedback}</div>
            )}
          </div>
          <div>
            <div className="text-sm text-zinc-500 mb-2">Bank Kata</div>
            <div className="flex flex-wrap gap-2">
              {bank.map((t) => (
                <span
                  key={t}
                  draggable
                  onDragStart={(e) => onDragStart(e, t)}
                  className="cursor-grab inline-flex items-center rounded-full border px-3 py-1 bg-white hover:bg-zinc-50 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Module 2: Context is King ----------
function ContentLibrary({ onSaveCard }: { onSaveCard: (c: FlashCard) => void }) {
  const [active, setActive] = useState(authenticSnippets[0]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  function handleWordClick(w: string) {
    const clean = w.toLowerCase().replace(/[^a-z]/gi, "");
    if (!clean) return;
    setSelectedWord(clean);
  }

  const dict = selectedWord ? simpleDict[selectedWord] : null;
  const colls = selectedWord ? collocations[selectedWord] : undefined;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Library className="size-5" /> Perpustakaan Konten Otentik</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {authenticSnippets.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={`rounded-full px-3 py-1 border ${active.id === s.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}
              >
                {s.title} <span className="text-xs opacity-70">• {s.level}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border p-4 bg-gradient-to-b from-white to-zinc-50 leading-relaxed text-[15px]">
            {active.text.split(/(\s+)/).map((tok, i) => {
              if (tok.trim() === "") return <span key={i}>{tok}</span>;
              return (
                <button
                  key={i}
                  onClick={() => handleWordClick(tok)}
                  className="inline px-1 rounded hover:bg-yellow-100 hover:shadow-sm transition"
                  title="Klik untuk lihat konteks"
                >
                  {tok}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-zinc-500 mt-2">Tip: Klik kata apa pun untuk Smart Highlight (arti + kolokasi + audio).</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="size-5" /> Smart Highlight</CardTitle>
        </CardHeader>
        <CardContent>
          {dict ? (
            <div className="space-y-3">
              <div className="text-sm text-zinc-500">Kata</div>
              <div className="text-xl font-bold">{dict.word} <span className="text-zinc-400 text-base">{dict.ipa}</span></div>
              <div className="text-sm text-zinc-600">Arti: {dict.meaning}</div>
              <div className="text-sm text-zinc-600">Contoh: <span className="italic">{dict.example}</span></div>
              <div>
                <div className="text-sm text-zinc-500">Kolokasi umum</div>
                <ul className="list-disc list-inside text-sm text-zinc-700">
                  {(colls ?? ["(tidak tersedia di demo)"]).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => speak(dict.word)}><Volume2 className="size-4" /> Dengarkan</Button>
                <Button
                  onClick={() =>
                    onSaveCard({ id: dict.id + Date.now(), word: dict.word, context: active.text, meaning: dict.meaning, collocations: colls, ipa: dict.ipa })
                  }
                >
                  <Plus className="size-4" /> Simpan ke SRS
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-zinc-500">Klik kata pada teks untuk melihat detail dan menyimpannya sebagai kartu.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FlashcardReview({ deck, onUpdate }: { deck: FlashCard[]; onUpdate: (d: FlashCard[]) => void }) {
  const due = deck.filter((c) => (c.dueAt ?? 0) <= Date.now());
  const [idx, setIdx] = useState(0);
  const card = due[idx];
  const [showBack, setShowBack] = useState(false);
  useEffect(() => setIdx(0), [deck.length]);

  function rate(r: "again" | "good" | "easy") {
    if (!card) return;
    const updated = deck.map((c) => (c.id === card.id ? scheduleNextReview(c, r) : c));
    onUpdate(updated);
    setShowBack(false);
    setIdx((v) => Math.min(v + 1, Math.max(due.length - 2, 0)));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ClipboardCheck className="size-5" /> Smart Flashcards (SRS)</CardTitle>
      </CardHeader>
      <CardContent>
        {card ? (
          <div className="space-y-4">
            <div className="text-sm text-zinc-500">{idx + 1} / {due.length} due</div>
            <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="text-xs uppercase text-zinc-500">Front</div>
              <div className="text-2xl font-bold tracking-tight">{card.word}</div>
              <div className="mt-2 text-sm text-zinc-500">/ {card.ipa} /</div>
              {showBack && (
                <div className="mt-4 border-t pt-4">
                  <div className="text-xs uppercase text-zinc-500">Back</div>
                  <div className="font-medium">{card.meaning}</div>
                  <div className="text-sm text-zinc-600 mt-2">Konteks: <span className="italic">{card.context}</span></div>
                  {card.collocations && (
                    <div className="text-sm text-zinc-600 mt-2">Kolokasi: {card.collocations.join(", ")}</div>
                  )}
                </div>
              )}
              <div className="flex justify-center gap-2 mt-4">
                <Button onClick={() => setShowBack((v) => !v)}>{showBack ? "Sembunyikan" : "Tampilkan"} jawaban</Button>
                <Button onClick={() => speak(card.word)}><Volume2 className="size-4" /> Audio</Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => rate("again")}>Again</Button>
              <Button onClick={() => rate("good")}>Good</Button>
              <Button onClick={() => rate("easy")}>Easy</Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-zinc-500">Tidak ada kartu yang jatuh tempo. Tambahkan dari Smart Highlight atau tunggu jadwal review.</div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- Module 3: The Sandbox ----------
function Journal() {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string[]>([]);

  function analyze() {
    const fb: string[] = [];
    // simple demo heuristics
    if (/very big/gi.test(text)) fb.push("Kalimat sudah bagus! Agar lebih natural, ganti 'very big' dengan 'huge' atau 'enormous'.");
    if (/yesterday.*is/gi.test(text)) fb.push("Perhatikan waktu: setelah 'yesterday', gunakan 'was/were', bukan 'is'.");
    if (text.split(" ").length < 20) fb.push("Coba kembangkan cerita menjadi 3-4 kalimat agar konteks lebih kaya.");
    setFeedback(fb.length ? fb : ["Great job! Tidak ada masukan besar. Lanjutkan!"]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BookOpen className="size-5" /> Jurnal Pribadi – umpan balik ramah</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Tulis cerita harianmu di sini (EN)..." value={text} onChange={(e: any) => setText(e.target.value)} />
        <div className="flex items-center gap-2 mt-3">
          <Button onClick={analyze}><Wand2 className="size-4" /> Analisis</Button>
          <div className="text-xs text-zinc-500">Privat untukmu. Kami fokus pada perbaikan, bukan menyalahkan.</div>
        </div>
        {feedback.length > 0 && (
          <div className="mt-3 space-y-2">
            {feedback.map((f, i) => (
              <div key={i} className="rounded-2xl border bg-emerald-50 text-emerald-900 p-3 border-emerald-200">{f}</div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ConversationSim() {
  const scenarios = [
    { id: "coffee", title: "Memesan kopi", prompt: "Order a coffee politely." },
    { id: "interview", title: "Wawancara kerja", prompt: "Answer: Tell me about yourself." },
    { id: "directions", title: "Menanyakan arah", prompt: "Ask how to get to the station." },
  ];
  const [active, setActive] = useState(scenarios[0]);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! Let's practice. Type your line when you're ready." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    // tiny scripted feedback
    const lower = input.toLowerCase();
    let reply = "Good! Try adding a polite opener like 'Could I...?'";
    if (active.id === "coffee" && /coffee|latte|espresso/.test(lower)) reply = "Great order! Add size and sweetness, e.g., 'A small latte with less sugar, please.'";
    if (active.id === "interview" && /i am|my name/.test(lower)) reply = "Nice start. Add a key strength + example in one sentence.";
    if (active.id === "directions" && /how|where|get/.test(lower)) reply = "Good question. Remember a follow-up: 'How long does it take?'";
    setMessages((m) => [...m, { role: "ai", text: reply }]);
    setInput("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><MessageCircle className="size-5" /> Simulasi Percakapan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {scenarios.map((s) => (
            <button key={s.id} onClick={() => setActive(s)} className={`rounded-full px-3 py-1 border ${active.id === s.id ? "bg-purple-600 text-white border-purple-600" : "bg-white"}`}>
              {s.title}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border bg-white p-4 h-64 overflow-auto">
          {messages.map((m, i) => (
            <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start") }>
              <div className={"max-w-[75%] my-1 px-3 py-2 rounded-2xl " + (m.role === "user" ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-800") }>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2 mt-2">
          <Input placeholder={active.prompt} value={input} onChange={(e: any) => setInput(e.target.value)} />
          <Button onClick={send}><ArrowRight className="size-4" /> Kirim</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Module 4: Progress Tracker ----------
function ProgressTracker({ deckSize, convCount, journalCount }: { deckSize: number; convCount: number; journalCount: number }) {
  // Tiny fake metrics
  const confidence = 62; // %
  const learnedByTopic = [
    { topic: "Business", count: 14 },
    { topic: "Travel", count: 22 },
    { topic: "Tech", count: 9 },
    { topic: "Daily", count: 31 },
  ];
  const badges = [
    { id: "ctx-50", name: "Lencana Kontekstual", desc: "50 kata dari konten otentik", earned: deckSize >= 50 },
    { id: "brave-5", name: "Lencana Pemberani", desc: "5 simulasi percakapan", earned: convCount >= 5 },
    { id: "journal-7", name: "Penulis Rajin", desc: "7 hari jurnal berturut", earned: journalCount >= 7 },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ChartNoAxesCombined className="size-5" /> Dasbor Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <Stat label="Kartu SRS" value={String(deckSize)} sub="aktif" />
            <Stat label="Sesi Percakapan" value={String(convCount)} sub="total" />
            <Stat label="Entri Jurnal" value={String(journalCount)} sub="total" />
          </div>
          <Separator className="my-4" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Peta Kosakata (by Topic)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {learnedByTopic.map((t) => (
                    <div key={t.topic} className="rounded-2xl border p-3 bg-white">
                      <div className="text-sm text-zinc-500">{t.topic}</div>
                      <div className="text-2xl font-bold">{t.count}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 mt-2">(Demo ringkas – bisa diganti grafik Recharts pada versi penuh)</div>
              </CardContent>
            </Card>
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Grafik Kepercayaan Diri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative size-24 rounded-full bg-zinc-100 grid place-items-center">
                    <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#6366f1 ${confidence}%, #e4e4e7 0)` }} />
                    <div className="relative z-10 text-xl font-bold">{confidence}%</div>
                  </div>
                  <div className="text-sm text-zinc-600">Self-rating mingguan terhadap speaking, writing, listening. (Form input dapat ditambahkan untuk update berkala.)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BadgeCheck className="size-5" /> Lencana Pencapaian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {badges.map((b) => (
              <div key={b.id} className={`rounded-2xl border p-3 flex items-center gap-3 ${b.earned ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}>
                <Star className={`size-5 ${b.earned ? "text-emerald-600" : "text-zinc-300"}`} />
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-zinc-500">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-3xl border p-4 bg-white">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {sub && <div className="text-xs text-zinc-400">{sub}</div>}
    </div>
  );
}

// ---------- Speech helper ----------
function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    (window as any).speechSynthesis?.speak(u);
  } catch {}
}

// ---------- Page ----------
export default function App() {
  const [tab, setTab] = useState("core");
  const [pickedTense, setPickedTense] = useState<any | null>(null);
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [convCount, setConvCount] = useState(1);
  const [journalCount, setJournalCount] = useState(0);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      {/* Top bar */}
      <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Brand />
          <div className="hidden md:flex items-center gap-2">
            <TopButton active={tab === "core"} onClick={() => setTab("core")} icon={<Brain className="size-4" />} label="The Core" />
            <TopButton active={tab === "context"} onClick={() => setTab("context")} icon={<Library className="size-4" />} label="Context" />
            <TopButton active={tab === "sandbox"} onClick={() => setTab("sandbox")} icon={<MessageCircle className="size-4" />} label="Sandbox" />
            <TopButton active={tab === "progress"} onClick={() => setTab("progress")} icon={<ChartNoAxesCombined className="size-4" />} label="Progress" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:flex gap-4">
        <div className="hidden lg:block">
          <Sidebar current={tab} onChange={setTab} />
        </div>
        <div className="flex-1 grid gap-4">
          {tab === "core" && (
            <>
              <MindMap onPickTense={setPickedTense} />
              <TenseInfo tense={pickedTense} onSpeak={speak} />
              <SentenceBuilder />
            </>
          )}
          {tab === "context" && (
            <>
              <ContentLibrary onSaveCard={(c) => setDeck((d) => [...d, c])} />
              <FlashcardReview deck={deck} onUpdate={setDeck} />
            </>
          )}
          {tab === "sandbox" && (
            <>
              <Journal />
              <ConversationSim />
            </>
          )}
          {tab === "progress" && (
            <>
              <ProgressTracker deckSize={deck.length} convCount={convCount} journalCount={journalCount} />
            </>
          )}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 pb-10 pt-2 text-xs text-zinc-500">
        Anti-hafalan rumus • Kontekstual • Personalisasi • Sinergi dengan Buku
      </footer>
    </div>
  );
}

function TopButton({ active, onClick, icon, label }: { active?: boolean; onClick?: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 border ${active ? "bg-zinc-900 text-white border-zinc-900" : "bg-white hover:bg-zinc-50"}`}
    >
      {icon} <span className="text-sm">{label}</span>
    </button>
  );
}
