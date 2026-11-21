"use client";
import { useState } from "react";
import ToolShell from "@/app/components/ToolShell";

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>('{"name":"Alex","role":"Developer","active":true}');
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON format");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON format");
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolShell
      title="JSON Formatter & Validator"
      subtitle="Beautify, minify, and validate JSON data with clear syntax error feedback."
      accent="emerald"
      guideTitle="Why Format & Validate JSON?"
      guideText="Formatting makes nested API responses and configuration files easy to read, while validation catches missing commas, quotes, or brackets before deployment."
    >
      <div className="space-y-5">
        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
        />

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={formatJson}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            Format / Beautify
          </button>
          <button
            onClick={minifyJson}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            Minify JSON
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError(null);
            }}
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            <b>Syntax Error:</b> {error}
          </div>
        )}

        {output && (
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Formatted Output
              </span>
              <button
                onClick={copyOutput}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer"
              >
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            </div>
            <pre className="overflow-x-auto text-sm font-mono bg-white p-3.5 rounded-lg border border-slate-200 text-slate-900">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolShell>
  );
}