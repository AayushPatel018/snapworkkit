"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function RemovePdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [removeInput, setRemoveInput] = useState<string>("2");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setResultUrl(null);
    setTotalPages(0);

    if (selected) {
      try {
        const bytes = await selected.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        setTotalPages(doc.getPageCount());
      } catch {
        setTotalPages(0);
      }
    }
  };

  const parseRemoveSet = (input: string, max: number): Set<number> => {
    const toRemove = new Set<number>();
    const parts = input.split(",").map((p) => p.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((n) => parseInt(n.trim(), 10));
        if (!isNaN(a) && !isNaN(b)) {
          const start = Math.max(1, Math.min(a, b));
          const end = Math.min(max, Math.max(a, b));
          for (let i = start; i <= end; i++) {
            toRemove.add(i - 1);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= max) {
          toRemove.add(num - 1);
        }
      }
    }
    return toRemove;
  };

  const handleRemovePages = async () => {
    if (!file || totalPages === 0) return;
    const removeSet = parseRemoveSet(removeInput, totalPages);
    const keepIndices: number[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (!removeSet.has(i)) keepIndices.push(i);
    }

    if (keepIndices.length === 0) {
      alert("You cannot remove every page from the PDF.");
      return;
    }

    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(srcDoc, keepIndices);
      copied.forEach((p) => newDoc.addPage(p));

      const outBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Remove pages error:", err);
      alert("Error removing pages.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Remove PDF Pages"
      subtitle="Delete unwanted or blank pages from a PDF and save a clean document."
      accent="red"
      guideTitle="How to Delete Unwanted PDF Pages?"
      guideText="Select your PDF, enter the page numbers or ranges you want to remove, and download the updated document."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            {file ? file.name : "Click to select a PDF file"}
          </span>
          <span className="text-xs text-slate-500">
            At least one page must remain in the PDF
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {totalPages > 0 && (
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Total Pages in PDF: {totalPages}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Page Numbers to Remove (e.g., 2, 5-6):
          </label>
          <input
            type="text"
            value={removeInput}
            onChange={(e) => setRemoveInput(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          />
        </div>

        <button
          onClick={handleRemovePages}
          disabled={!file || totalPages === 0 || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Removing Pages..." : "Remove Pages"}
        </button>

        {resultUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              Pages removed successfully!
            </p>
            <a
              href={resultUrl}
              download="cleaned-document.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Updated PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}