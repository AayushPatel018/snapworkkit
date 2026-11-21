"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function ExtractPdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageInput, setPageInput] = useState<string>("1");
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

  const parsePageNumbers = (input: string, max: number): number[] => {
    const pagesSet = new Set<number>();
    const parts = input.split(",").map((p) => p.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-").map((n) => parseInt(n.trim(), 10));
        if (!isNaN(startStr) && !isNaN(endStr)) {
          const start = Math.max(1, Math.min(startStr, endStr));
          const end = Math.min(max, Math.max(startStr, endStr));
          for (let i = start; i <= end; i++) {
            pagesSet.add(i - 1);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= max) {
          pagesSet.add(num - 1);
        }
      }
    }
    return Array.from(pagesSet).sort((a, b) => a - b);
  };

  const handleExtract = async () => {
    if (!file || totalPages === 0) return;
    const indices = parsePageNumbers(pageInput, totalPages);
    if (indices.length === 0) {
      alert(`Please enter valid page numbers between 1 and ${totalPages}.`);
      return;
    }

    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(srcDoc, indices);
      copied.forEach((p) => newDoc.addPage(p));

      const outBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Extract error:", err);
      alert("Error extracting pages.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Extract / Split PDF Pages"
      subtitle="Extract specific pages or page ranges (such as 1, 3-5) into a new PDF file."
      accent="red"
      guideTitle="How to Extract Specific Pages?"
      guideText="Upload a PDF to inspect its total page count, enter page numbers or ranges separated by commas, and download a new PDF containing only those pages."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            {file ? file.name : "Click to select a PDF file"}
          </span>
          <span className="text-xs text-slate-500">
            Supports multi-page PDF documents
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
            Pages to Extract (e.g., 1, 2, 4-6):
          </label>
          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            placeholder="1, 2, 4-6"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          />
        </div>

        <button
          onClick={handleExtract}
          disabled={!file || totalPages === 0 || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Extracting Pages..." : "Extract Selected Pages"}
        </button>

        {resultUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              Selected pages extracted!
            </p>
            <a
              href={resultUrl}
              download="extracted-pages.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Extracted PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}