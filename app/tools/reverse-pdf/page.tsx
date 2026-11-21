"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function ReversePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setResultUrl(null);
  };

  const handleReverse = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const total = srcDoc.getPageCount();
      const reversedIndices = Array.from({ length: total }, (_, i) => total - 1 - i);

      const copied = await newDoc.copyPages(srcDoc, reversedIndices);
      copied.forEach((p) => newDoc.addPage(p));

      const outBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Reverse PDF error:", err);
      alert("Could not reverse PDF pages.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Reverse PDF Page Order"
      subtitle="Flip the page sequence of a PDF from last-to-first to restore proper reading order."
      accent="red"
      guideTitle="When Should You Reverse PDF Pages?"
      guideText="Use this tool when a document scanner saves pages face-down or in reverse order and you need page one back at the front."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            {file ? file.name : "Click to select a PDF file"}
          </span>
          <span className="text-xs text-slate-500">
            Reverses page order locally in your browser
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handleReverse}
          disabled={!file || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Reversing Pages..." : "Reverse Page Order"}
        </button>

        {resultUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              PDF page order reversed!
            </p>
            <a
              href={resultUrl}
              download="reversed-document.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Reversed PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}