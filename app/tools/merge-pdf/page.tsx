"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMergedUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedBytes)], { type: "application/pdf" });
      setMergedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("PDF Merge Error:", err);
      alert("Error merging PDFs. Make sure files are valid and not password-protected.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Merge PDF Files"
      subtitle="Combine two or more PDF documents into a single clean PDF file right in your browser."
      accent="red"
      guideTitle="How to Merge PDF Files?"
      guideText="Select two or more PDF files and click Merge PDFs Now. All pages are combined locally on your device without uploading files to a server."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-8 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            Click to select 2 or more PDF files
          </span>
          <span className="text-xs text-slate-500">
            Supports multiple PDF documents
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {files.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900 mb-2">
              Selected Files ({files.length}):
            </p>
            <ul className="space-y-1 text-xs sm:text-sm">
              {files.map((f, idx) => (
                <li key={idx} className="truncate">
                  {idx + 1}. {f.name}
                </li>
              ))}
            </ul>
            {files.length < 2 && (
              <p className="text-xs text-amber-700 mt-2">
                Please select at least 2 PDF files to merge.
              </p>
            )}
          </div>
        )}

        <button
          onClick={mergePdfs}
          disabled={files.length < 2 || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Merging PDFs..." : "Merge PDFs Now"}
        </button>

        {mergedUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              Your merged PDF is ready!
            </p>
            <a
              href={mergedUrl}
              download="merged-document.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Merged PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}