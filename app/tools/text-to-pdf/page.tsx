"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ToolShell from "@/app/components/ToolShell";

export default function TextToPdfPage() {
  const [title, setTitle] = useState<string>("Notes & Summary");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const wrapText = (text: string, maxCharsPerLine: number): string[] => {
    const paragraphs = text.split("\n");
    const lines: string[] = [];

    for (const para of paragraphs) {
      if (!para.trim()) {
        lines.push("");
        continue;
      }
      const words = para.split(/\s+/);
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
    }
    return lines;
  };

  const generatePdf = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const fontSize = 12;
      const lineHeight = 18;
      const margin = 50;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const usableWidth = pageWidth - margin * 2;
      const maxChars = Math.floor(usableWidth / (fontSize * 0.52));

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      if (title.trim()) {
        page.drawText(title.trim(), {
          x: margin,
          y,
          size: 18,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.1),
        });
        y -= 32;
      }

      const lines = wrapText(content, maxChars);
      for (const line of lines) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        if (line) {
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0.15, 0.15, 0.15),
          });
        }
        y -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Text to PDF error:", err);
      alert("Could not create PDF.");
    }
    setLoading(false);
  };

  return (
    <ToolShell
      title="Text & Notes to PDF"
      subtitle="Turn typed notes, drafts, or plain text into a clean, downloadable A4 PDF."
      accent="red"
      guideTitle="How to Create a PDF from Text?"
      guideText="Add an optional document title, write or paste your text, and generate a multi-page A4 PDF automatically."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Document Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Your Text / Notes:
          </label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write or paste your notes here..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
          />
        </div>

        <button
          onClick={generatePdf}
          disabled={!content.trim() || loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? "Generating PDF..." : "Create PDF File"}
        </button>

        {pdfUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-900 mb-3">
              Your PDF is ready!
            </p>
            <a
              href={pdfUrl}
              download="notes-document.pdf"
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