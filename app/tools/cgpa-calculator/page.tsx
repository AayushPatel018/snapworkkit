"use client";
import { useState } from "react";
import ToolShell from "@/app/components/ToolShell";

export default function CgpaCalculatorPage() {
  const [cgpa, setCgpa] = useState<string>("8.5");
  const [scale, setScale] = useState<string>("gtu-minus-05");

  const parsedCgpa = parseFloat(cgpa);
  const isValid = !isNaN(parsedCgpa) && parsedCgpa >= 0 && parsedCgpa <= 10;

  const calculatePercentage = (): string => {
    if (!isValid) return "0.00";
    if (scale === "gtu-10") {
      return (parsedCgpa * 10).toFixed(2);
    }
    if (scale === "gtu-minus-05") {
      return Math.max(0, (parsedCgpa - 0.5) * 10).toFixed(2);
    }
    return Math.min(100, parsedCgpa * 9.5).toFixed(2);
  };

  return (
    <ToolShell
      title="CGPA to Percentage Calculator"
      subtitle="Convert your CGPA into an estimated percentage for admissions, forms, and placements."
      accent="blue"
      guideTitle="How is CGPA Converted to Percentage?"
      guideText="Conversion rules vary across universities and boards. Always verify your institution's official formula before submitting final applications."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Enter Your CGPA (0 to 10):
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            placeholder="e.g. 8.25"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Conversion Formula:
          </label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          >
            <option value="gtu-minus-05">
              (CGPA - 0.5) × 10 (University Scale)
            </option>
            <option value="gtu-10">CGPA × 10 (Direct 10x Scale)</option>
            <option value="aicte-95">CGPA × 9.5 (Standard 9.5x Scale)</option>
          </select>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200/80 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Estimated Percentage
          </p>
          <p className="text-4xl font-extrabold text-blue-700 mt-1.5">
            {calculatePercentage()}%
          </p>
        </div>
      </div>
    </ToolShell>
  );
}