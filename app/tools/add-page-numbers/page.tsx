"use client";

import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

type NumberFormat = "number" | "page_of_num" | "page_of_total" | "dashed";
type PositionType =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right";
type BadgeStyle = "clean" | "pill" | "lined";

export default function AddPageNumbersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [format, setFormat] = useState<NumberFormat>("page_of_total");
  const [position, setPosition] = useState<PositionType>("bottom-center");
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>("pill");
  const [fontSize, setFontSize] = useState<number>(11);
  const [margin, setMargin] = useState<number>(28);
  const [startNumber, setStartNumber] = useState<number>(1);
  const [skipFirstPage, setSkipFirstPage] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setDoneMessage(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    try {
      const bytes = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      setFile(selected);
      setPageCount(pdfDoc.getPageCount());
    } catch {
      setError("Could not read this PDF file. It may be password-protected or corrupted.");
      setFile(null);
      setPageCount(0);
    }
  };

  const formatLabel = (displayNum: number, total: number) => {
    switch (format) {
      case "number":
        return `${displayNum}`;
      case "page_of_num":
        return `Page ${displayNum}`;
      case "page_of_total":
        return `Page ${displayNum} of ${total}`;
      case "dashed":
        return `— ${displayNum} —`;
    }
  };

  const handleAddNumbers = async () => {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    setProcessing(true);
    setError(null);
    setDoneMessage(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const activeFont = badgeStyle === "clean" ? regularFont : font;

      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      let counter = startNumber;

      for (let i = 0; i < totalPages; i++) {
        if (skipFirstPage && i === 0) continue;

        const page = pages[i];
        const { width, height } = page.getSize();
        const text = formatLabel(counter, totalPages);
        counter += 1;

        const textWidth = activeFont.widthOfTextAtSize(text, fontSize);
        const textHeight = activeFont.heightAtSize(fontSize);

        let x = (width - textWidth) / 2;
        if (position.endsWith("left")) {
          x = margin;
        } else if (position.endsWith("right")) {
          x = width - margin - textWidth;
        }

        const isTop = position.startsWith("top");
        const y = isTop ? height - margin - textHeight : margin;

        if (badgeStyle === "pill") {
          const padX = 10;
          const padY = 5;
          page.drawRectangle({
            x: x - padX,
            y: y - padY,
            width: textWidth + padX * 2,
            height: textHeight + padY * 2,
            color: rgb(0.95, 0.96, 0.98),
            borderColor: rgb(0.82, 0.86, 0.92),
            borderWidth: 0.8,
          });
        } else if (badgeStyle === "lined") {
          const lineY = isTop ? y - 6 : y + textHeight + 6;
          page.drawLine({
            start: { x: margin, y: lineY },
            end: { x: width - margin, y: lineY },
            thickness: 0.6,
            color: rgb(0.84, 0.87, 0.91),
          });
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: activeFont,
          color: rgb(0.15, 0.2, 0.3),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      const baseName = file.name.replace(/\.pdf$/i, "");
      link.href = url;
      link.download = `${baseName}-numbered.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setDoneMessage(`Done! Added page numbers to "${baseName}-numbered.pdf".`);
    } catch {
      setError("Something went wrong while adding page numbers.");
    } finally {
      setProcessing(false);
    }
  };

  const previewText = formatLabel(startNumber, pageCount || 10);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          PDF Suite • Browser-Based
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Add Page Numbers to PDF
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Add clean, publication-ready page numbers to your PDF directly in your browser. Your
          files never leave your device.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">1. Select PDF File</label>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 hover:border-blue-400 transition">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {file ? file.name : "Choose a PDF document"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {file
                  ? `${pageCount} pages detected • ${(file.size / 1024).toFixed(1)} KB`
                  : "Supports multi-page PDFs locally in your browser"}
              </p>
            </div>
            <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shrink-0">
              Browse PDF
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Format, Position, Badge Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Number Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as NumberFormat)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="page_of_total">Page 1 of 10</option>
              <option value="page_of_num">Page 1</option>
              <option value="number">1</option>
              <option value="dashed">— 1 —</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as PositionType)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Visual Style
            </label>
            <select
              value={badgeStyle}
              onChange={(e) => setBadgeStyle(e.target.value as BadgeStyle)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pill">Soft Pill Badge</option>
              <option value="clean">Clean Text</option>
              <option value="lined">Divider Line</option>
            </select>
          </div>
        </div>

        {/* Size, Start At, Margin & Skip Cover */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Font Size ({fontSize}px)
            </label>
            <input
              type="range"
              min={9}
              max={18}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Margin ({margin}pt)
            </label>
            <input
              type="range"
              min={16}
              max={56}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Start Numbering At
            </label>
            <input
              type="number"
              min={1}
              value={startNumber}
              onChange={(e) => setStartNumber(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={skipFirstPage}
            onChange={(e) => setSkipFirstPage(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Skip page 1 (useful when page 1 is a cover/title page)</span>
        </label>

        {/* Live Visual Preview Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Style Preview ({position.replace("-", " ")})
          </div>
          <div className="h-24 rounded-lg bg-white border border-slate-200 flex items-center justify-center relative px-4">
            <span
              className={
                badgeStyle === "pill"
                  ? "px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-semibold"
                  : badgeStyle === "lined"
                  ? "pt-1.5 border-t border-slate-300 text-slate-800 font-semibold"
                  : "text-slate-700 font-medium"
              }
              style={{ fontSize: `${fontSize}px` }}
            >
              {previewText}
            </span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        {doneMessage && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 font-medium">
            {doneMessage}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddNumbers}
          disabled={!file || processing}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm transition shadow-xs"
        >
          {processing ? "Processing PDF..." : "Add Page Numbers & Download PDF"}
        </button>
      </div>
    </main>
  );
}