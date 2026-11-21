"use client";
import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<number>(90);
  const [loading, setLoading] = useState<boolean>(false);
  const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setRotatedUrl(null);
  };

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + angle) % 360));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setRotatedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Rotate PDF error:", err);
      alert("Could not rotate PDF. Check if the file is valid.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Rotate PDF Pages"
      subtitle="Rotate sideways or upside-down PDF pages by 90°, 180°, or 270° clockwise."
      accent="red"
      guideTitle="How to Rotate PDF Pages?"
      guideText="Upload your PDF file, choose the rotation angle, and generate a corrected PDF file directly in your browser."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            {file ? file.name : "Click to select a PDF file"}
          </span>
          <span className="text-xs text-slate-500">
            Applies rotation across all pages in the PDF
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
            Rotation Angle (Clockwise):
          </label>
          <select
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          >
            <option value={90}>90° Clockwise (Right)</option>
            <option value={180}>180° (Upside Down)</option>
            <option value={270}>270° Clockwise (Left)</option>
          </select>
        </div>

        <button
          onClick={handleRotate}
          disabled={!file || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Rotating PDF..." : "Rotate & Generate PDF"}
        </button>

        {rotatedUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              PDF rotated successfully!
            </p>
            <a
              href={rotatedUrl}
              download="rotated-document.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Rotated PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}