"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function AddPageNumbersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<"center" | "right">("center");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setResultUrl(null);
  };

  const handleNumbering = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const count = pages.length;

      pages.forEach((page, index) => {
        const { width } = page.getSize();
        const label = `Page ${index + 1} of ${count}`;
        const fontSize = 10;
        const textWidth = font.widthOfTextAtSize(label, fontSize);

        const x =
          position === "right" ? width - textWidth - 40 : (width - textWidth) / 2;

        page.drawText(label, {
          x,
          y: 22,
          size: fontSize,
          font,
          color: rgb(0.35, 0.35, 0.35),
        });
      });

      const outBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Page numbering error:", err);
      alert("Could not add page numbers to this PDF.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Add Page Numbers to PDF"
      subtitle="Insert clean page numbering at the bottom of every page in your PDF document."
      accent="red"
      guideTitle="How to Number PDF Pages?"
      guideText="Upload a PDF document, choose bottom-center or bottom-right alignment, and download your numbered PDF."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            {file ? file.name : "Click to select a PDF file"}
          </span>
          <span className="text-xs text-slate-500">
            Adds &ldquo;Page X of Y&rdquo; at the bottom margin
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Number Alignment (Bottom):
          </label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as "center" | "right")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          >
            <option value="center">Bottom Center</option>
            <option value="right">Bottom Right</option>
          </select>
        </div>

        <button
          onClick={handleNumbering}
          disabled={!file || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Adding Numbers..." : "Add Page Numbers"}
        </button>

        {resultUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              Page numbers added!
            </p>
            <a
              href={resultUrl}
              download="numbered-document.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Numbered PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}