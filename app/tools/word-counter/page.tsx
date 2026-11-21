"use client";
import { useState } from "react";
import ToolShell from "@/app/components/ToolShell";

export default function WordCounterPage() {
  const [text, setText] = useState<string>("");

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const charactersWithSpaces = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const readingMinutes = words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0;

  return (
    <ToolShell
      title="Word & Character Counter"
      subtitle="Count words, characters, sentences, and reading time instantly as you type or paste text."
      accent="blue"
      guideTitle="How Word & Character Count Helps?"
      guideText="Useful for essays, assignments, articles, meta descriptions, and social posts where character or word limits matter."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl bg-blue-50/80 border border-blue-200/80 p-3.5">
            <p className="text-2xl font-extrabold text-blue-700">{words}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Words</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
            <p className="text-2xl font-extrabold text-slate-900">{charactersWithSpaces}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Characters</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
            <p className="text-2xl font-extrabold text-slate-900">{charactersNoSpaces}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">No Spaces</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
            <p className="text-2xl font-extrabold text-slate-900">{sentences}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Sentences</p>
          </div>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <span>
            Estimated reading time: <b className="text-slate-900">{readingMinutes} min</b>
          </span>
          <button
            type="button"
            onClick={() => setText("")}
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Clear Text
          </button>
        </div>
      </div>
    </ToolShell>
  );
}