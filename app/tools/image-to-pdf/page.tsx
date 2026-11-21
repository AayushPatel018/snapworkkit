"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function ImageToPdfPage() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
    setPdfUrl(null);
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const imgFile of images) {
        const bytes = await imgFile.arrayBuffer();
        const embeddedImg =
          imgFile.type === "image/png"
            ? await pdfDoc.embedPng(bytes)
            : await pdfDoc.embedJpg(bytes);

        const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
        page.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width: embeddedImg.width,
          height: embeddedImg.height,
        });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Image to PDF Error:", err);
      alert("Please upload valid JPG or PNG images.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="JPG / PNG Images to PDF"
      subtitle="Convert photos and scanned images into a single organized PDF document."
      accent="red"
      guideTitle="How to Convert Images to PDF?"
      guideText="Select one or more JPG or PNG images and click Convert to PDF. Each image is placed on its own page and compiled locally in your browser."
    >
      <div className="space-y-5">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50/70 hover:bg-rose-50/30 rounded-2xl p-8 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            Click to select JPG or PNG images
          </span>
          <span className="text-xs text-slate-500">
            Select single or multiple image files
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>

        {images.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">
              {images.length} image(s) selected
            </p>
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={images.length === 0 || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Creating PDF..." : "Convert to PDF"}
        </button>

        {pdfUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              PDF created successfully!
            </p>
            <a
              href={pdfUrl}
              download="images-converted.pdf"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}