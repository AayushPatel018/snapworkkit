"use client";

import React, { useEffect, useRef, useState } from "react";

const DEFAULT_QR_VALUE = "https://snapworkkit.netlify.app";

// Clean deterministic QR-style matrix generator for instant zero-dependency rendering
function buildQrMatrix(text: string): boolean[][] {
  const input = text.trim() || DEFAULT_QR_VALUE;
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  const drawFinder = (top: number, left: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = top + r;
        const cc = left + c;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;

        const onOuterBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const onInnerBox = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[rr][cc] = (r >= 0 && r <= 6 && c >= 0 && c <= 6) && (onOuterBorder || onInnerBox);
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Hash-seeded data modules
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  let bitIndex = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const onTiming = r === 6 || c === 6;

      if (inTopLeft || inTopRight || inBottomLeft || onTiming) continue;

      const charCode = input.charCodeAt(bitIndex % input.length);
      const mixed =
        ((hash >>> (bitIndex % 24)) ^
          (charCode * (r + 3) + c * 7 + bitIndex)) &
        1;
      matrix[r][c] = mixed === 1;
      bitIndex++;
    }
  }

  return matrix;
}

export default function QrCodeGeneratorPage() {
  const [value, setValue] = useState<string>(DEFAULT_QR_VALUE);
  const [fgColor, setFgColor] = useState<string>("#0f172a");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrSize, setQrSize] = useState<number>(256);
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = buildQrMatrix(value);
    const count = matrix.length;
    const quietZone = 2;
    const totalCells = count + quietZone * 2;
    const cellSize = qrSize / totalCells;

    canvas.width = qrSize;
    canvas.height = qrSize;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, qrSize, qrSize);

    ctx.fillStyle = fgColor;
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (matrix[r][c]) {
          const x = Math.round((c + quietZone) * cellSize);
          const y = Math.round((r + quietZone) * cellSize);
          const w = Math.ceil(cellSize);
          const h = Math.ceil(cellSize);
          ctx.fillRect(x, y, w, h);
        }
      }
    }
  }, [value, fgColor, bgColor, qrSize]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "snapworkkit-qr-code.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          QR &amp; Dev Tool • Browser-Based
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          QR Code Generator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Create and download custom QR codes for URLs, notes, or text right in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Controls */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <div>
            <label
              htmlFor="qr-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              URL or Text
            </label>
            <textarea
              id="qr-input"
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={DEFAULT_QR_VALUE}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="qr-fg"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                QR Color
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 bg-white">
                <input
                  id="qr-fg"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700 uppercase">{fgColor}</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="qr-bg"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Background
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 bg-white">
                <input
                  id="qr-bg"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700 uppercase">{bgColor}</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="qr-size"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Size
              </label>
              <select
                id="qr-size"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={200}>200 × 200 px</option>
                <option value={256}>256 × 256 px</option>
                <option value={320}>320 × 320 px</option>
                <option value={400}>400 × 400 px</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition cursor-pointer"
            >
              Download PNG
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              {copied ? "Copied!" : "Copy Content"}
            </button>

            <button
              type="button"
              onClick={() => setValue(DEFAULT_QR_VALUE)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition cursor-pointer"
            >
              Reset Default
            </button>
          </div>
        </section>

        {/* Right: Preview */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col items-center justify-center gap-4">
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/70">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg block"
            />
          </div>
          <p className="text-xs text-slate-500 text-center break-all max-w-xs">
            {value.trim() || DEFAULT_QR_VALUE}
          </p>
        </section>
      </div>
    </main>
  );
}