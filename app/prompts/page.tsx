"use client";
import { useState } from "react";
import ToolShell from "@/app/components/ToolShell";

type PromptCategory =
  | "Image Generation"
  | "Website / Coding"
  | "Study & Exam"
  | "General AI";

interface PromptItem {
  id: number;
  title: string;
  category: "Coding" | "AI Prompts" | "Exam Prep";
  prompt: string;
}

const PRESET_PROMPTS: PromptItem[] = [
  {
    id: 1,
    title: "Debug JavaScript / React Error Step-by-Step",
    category: "Coding",
    prompt:
      "Act as a senior software engineer. Here is my code and error message: [PASTE CODE & ERROR]. Explain the root cause clearly, provide the fixed code, and share how to prevent this issue in the future.",
  },
  {
    id: 2,
    title: "Structured Exam Answer with Examples",
    category: "Exam Prep",
    prompt:
      "Explain [TOPIC NAME] for a detailed university exam answer. Structure it with: 1) Clear definition, 2) Key concepts and working, 3) Practical example or code snippet, and 4) Concise summary.",
  },
  {
    id: 3,
    title: "SQL Query Generator from Plain English",
    category: "Coding",
    prompt:
      "Given this database schema: [PASTE TABLES/COLUMNS], write a clean, optimized SQL query to [DESCRIBE DESIRED RESULT]. Briefly explain any JOINs, filters, or indexes used.",
  },
  {
    id: 4,
    title: "Turn Study Notes into Concise Revision Guide",
    category: "AI Prompts",
    prompt:
      "Summarize the following notes into structured bullet points, highlight core definitions, and generate 5 self-test questions at the end: [PASTE NOTES].",
  },
];

function buildPerfectPrompt(
  topic: string,
  category: PromptCategory,
  styleTone: string
): string {
  const cleanTopic = topic.trim() || "your requested topic";

  if (category === "Image Generation") {
    return [
      `Create a high-detail visual image of: ${cleanTopic}.`,
      `Style & Mood: ${styleTone}, natural lighting, crisp focus, rich textures, balanced composition.`,
      `Framing & Camera: Medium-wide angle, natural depth of field, clean background with minimal clutter.`,
      `Quality & Constraints: Sharp details, balanced colors, no watermarks, no distorted text or extra limbs.`,
    ].join("\n");
  }

  if (category === "Website / Coding") {
    return [
      `Act as an experienced software engineer. Help me build or solve: ${cleanTopic}.`,
      `Tone & Approach: ${styleTone}, clean architecture, readable code, and practical best practices.`,
      `Deliverables:`,
      `1. Clear step-by-step implementation plan or file structure.`,
      `2. Complete, working code with edge cases handled.`,
      `3. Concise explanation of how it works and how to run/test it.`,
    ].join("\n");
  }

  if (category === "Study & Exam") {
    return [
      `Act as a clear, structured tutor. Explain: ${cleanTopic}.`,
      `Style: ${styleTone}, easy to follow and well-organized for studying.`,
      `Include:`,
      `1. Clear definition and core concept in plain language.`,
      `2. Key points, rules, or step-by-step mechanism.`,
      `3. Concrete example or small code/case illustration.`,
      `4. Quick recap and 3 practice questions.`,
    ].join("\n");
  }

  return [
    `Help me with: ${cleanTopic}.`,
    `Style: ${styleTone}, clear, structured, and actionable.`,
    `Break down the response into practical steps, note important caveats, and ask brief clarifying questions only if essential.`,
  ].join("\n");
}

export default function PromptsDirectoryPage() {
  const [topic, setTopic] = useState<string>("");
  const [category, setCategory] = useState<PromptCategory>("Image Generation");
  const [styleTone, setStyleTone] = useState<string>("Clear & Detailed");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copiedGenerated, setCopiedGenerated] = useState<boolean>(false);

  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const promptText = buildPerfectPrompt(topic, category, styleTone);
    setGeneratedPrompt(promptText);
    setCopiedGenerated(false);
  };

  const handleCopyGenerated = async () => {
    if (!generatedPrompt) return;
    await navigator.clipboard.writeText(generatedPrompt);
    setCopiedGenerated(true);
    setTimeout(() => setCopiedGenerated(false), 1500);
  };

  const filteredPresets =
    selectedFilter === "All"
      ? PRESET_PROMPTS
      : PRESET_PROMPTS.filter((item) => item.category === selectedFilter);

  const handleCopyPreset = async (id: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <ToolShell
      title="AI Prompt Generator & Directory"
      subtitle="Enter any topic or idea to generate a structured prompt for image generation, coding, or study."
      accent="emerald"
    >
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            What do you want to create or ask?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., sports car at night in rain, or a responsive landing page in Next.js..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Prompt Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PromptCategory)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            >
              <option value="Image Generation">Image Generation (AI Art &amp; Photos)</option>
              <option value="Website / Coding">Website, Coding &amp; Apps</option>
              <option value="Study & Exam">Study &amp; Exam Preparation</option>
              <option value="General AI">General Productivity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Output Style
            </label>
            <select
              value={styleTone}
              onChange={(e) => setStyleTone(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            >
              <option value="Clear & Detailed">Clear &amp; Detailed</option>
              <option value="Beginner-Friendly">Beginner-Friendly</option>
              <option value="Concise & Direct">Concise &amp; Direct</option>
              <option value="Cinematic & Creative">Cinematic &amp; Creative</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-xs transition cursor-pointer"
        >
          Generate Perfect Prompt
        </button>
      </form>

      {generatedPrompt && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-bold text-slate-900">Generated Prompt:</span>
            <button
              type="button"
              onClick={handleCopyGenerated}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer"
            >
              {copiedGenerated ? "Copied!" : "Copy Prompt"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 font-sans leading-relaxed">
            {generatedPrompt}
          </pre>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Quick Preset Prompts</h2>

        <div className="flex flex-wrap gap-2 mb-5">
          {["All", "Coding", "AI Prompts", "Exam Prep"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                selectedFilter === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPresets.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {item.title}
                </h3>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  {item.category}
                </span>
              </div>
              <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-white p-3 rounded-lg border border-slate-200 text-slate-700 mb-3 font-sans">
                {item.prompt}
              </pre>
              <button
                onClick={() => handleCopyPreset(item.id, item.prompt)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer"
              >
                {copiedId === item.id ? "Copied!" : "Copy Prompt"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}