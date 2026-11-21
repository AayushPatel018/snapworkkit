"use client";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import ToolShell from "@/app/components/ToolShell";

export default function ImageCompressorPage() {
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSizeKB, setOriginalSizeKB] = useState<number | null>(null);
  const [compressedSizeKB, setCompressedSizeKB] = useState<number | null>(null);
  const [targetKB, setTargetKB] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setCompressedUrl(null);
    setOriginalSizeKB(Math.round(file.size / 1024));

    const options = {
      maxSizeMB: targetKB / 1024,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setCompressedSizeKB(Math.round(compressedFile.size / 1024));
      setCompressedUrl(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error("Compression error:", error);
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Exam Form Image Compressor"
      subtitle="Compress photos, signatures, and scans to 20KB, 50KB, or 100KB for online applications."
      accent="purple"
      guideTitle="How to Compress Images for Application Forms?"
      guideText="Select your target file size and choose an image. Everything runs locally inside your browser—your photos are never uploaded to an external server."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Target File Size (KB):
          </label>
          <select
            value={targetKB}
            onChange={(e) => setTargetKB(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          >
            <option value={20}>20 KB (Signature / Small Stamp)</option>
            <option value={50}>50 KB (Passport Photo)</option>
            <option value={100}>100 KB (Scanned Document)</option>
          </select>
        </div>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-purple-400 bg-slate-50/70 hover:bg-purple-50/30 rounded-2xl p-7 text-center cursor-pointer transition">
          <span className="text-sm font-semibold text-slate-800 mb-1">
            Choose an image (JPG / PNG / WebP)
          </span>
          <span className="text-xs text-slate-500">
            Instant preview &amp; download
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {loading && (
          <p className="text-sm font-semibold text-purple-700 text-center">
            Compressing image...
          </p>
        )}

        {compressedUrl && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            {originalSizeKB !== null && compressedSizeKB !== null && (
              <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold mb-4">
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                  Original: {originalSizeKB} KB
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                  Compressed: {compressedSizeKB} KB
                </span>
              </div>
            )}
            <img
              src={compressedUrl}
              alt="Compressed preview"
              className="max-h-48 mx-auto mb-4 rounded-xl border border-slate-200 bg-white p-1"
            />
            <a
              href={compressedUrl}
              download={`compressed-${targetKB}kb.jpg`}
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download Compressed Image
            </a>
          </div>
        )}
      </div>
    </ToolShell>
  );
}