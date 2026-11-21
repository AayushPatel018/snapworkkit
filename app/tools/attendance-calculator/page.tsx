"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

export default function AttendanceCalculatorPage() {
  const [attendedClasses, setAttendedClasses] = useState<string>("36");
  const [totalClasses, setTotalClasses] = useState<string>("50");
  const [targetPercentage, setTargetPercentage] = useState<number>(75);
  const [upcomingClasses, setUpcomingClasses] = useState<string>("10");

  const stats = useMemo(() => {
    const attended = Math.max(0, Number(attendedClasses) || 0);
    const total = Math.max(0, Number(totalClasses) || 0);
    const future = Math.max(0, Number(upcomingClasses) || 0);
    const targetDecimal = targetPercentage / 100;

    if (total === 0) {
      return {
        attended,
        total,
        future,
        currentPct: 0,
        status: "empty" as const,
        classesNeededNow: 0,
        bunksAllowedNow: 0,
        projectedTotal: future,
        projectedPct: 0,
        neededInUpcoming: 0,
      };
    }

    const currentPct = (attended / total) * 100;

    // Classes needed consecutively to reach target percentage:
    // (attended + x) / (total + x) >= targetDecimal
    // attended + x >= targetDecimal * total + targetDecimal * x
    // x * (1 - targetDecimal) >= targetDecimal * total - attended
    let classesNeededNow = 0;
    if (currentPct < targetPercentage) {
      if (targetDecimal >= 1) {
        classesNeededNow = Infinity;
      } else {
        const rawNeeded = Math.ceil(
          (targetDecimal * total - attended) / (1 - targetDecimal)
        );
        classesNeededNow = Math.max(0, rawNeeded);
      }
    }

    // Classes you can miss (bunk) while staying >= target percentage:
    // attended / (total + b) >= targetDecimal
    // attended >= targetDecimal * total + targetDecimal * b
    // b <= (attended - targetDecimal * total) / targetDecimal
    let bunksAllowedNow = 0;
    if (currentPct >= targetPercentage) {
      if (targetDecimal <= 0) {
        bunksAllowedNow = Infinity;
      } else {
        const rawBunks = Math.floor(
          (attended - targetDecimal * total) / targetDecimal
        );
        bunksAllowedNow = Math.max(0, rawBunks);
      }
    }

    // Projection if user attends all upcoming classes
    const projectedAttendedAll = attended + future;
    const projectedTotal = total + future;
    const projectedPct =
      projectedTotal > 0 ? (projectedAttendedAll / projectedTotal) * 100 : 0;

    // How many of the upcoming `future` classes must be attended to reach target
    const maxPossibleAttended = attended + future;
    const maxPossiblePct =
      projectedTotal > 0 ? (maxPossibleAttended / projectedTotal) * 100 : 0;

    let neededInUpcoming = 0;
    if (projectedTotal > 0) {
      const requiredTotalAttended = Math.ceil(targetDecimal * projectedTotal);
      neededInUpcoming = Math.max(0, requiredTotalAttended - attended);
    }

    const status =
      currentPct >= targetPercentage ? ("safe" as const) : ("shortage" as const);

    return {
      attended,
      total,
      future,
      currentPct,
      status,
      classesNeededNow,
      bunksAllowedNow,
      projectedTotal,
      projectedPct,
      neededInUpcoming,
      maxPossiblePct,
    };
  }, [attendedClasses, totalClasses, targetPercentage, upcomingClasses]);

  const progressWidth = Math.min(100, Math.max(0, stats.currentPct));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Student Calculator • Browser-Based
          </span>
          <Link
            href="/tools/cgpa-calculator"
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            CGPA Calculator →
          </Link>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {targetPercentage}% Attendance Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Check your current attendance percentage, see how many classes you can safely skip or
          need to attend, and plan upcoming lectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">Enter Class Details</h2>

          <div>
            <label
              htmlFor="attended-classes"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Classes Attended
            </label>
            <input
              id="attended-classes"
              type="number"
              min={0}
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              placeholder="e.g., 36"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="total-classes"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Total Classes Conducted
            </label>
            <input
              id="total-classes"
              type="number"
              min={0}
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              placeholder="e.g., 50"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Required Attendance Target
            </span>
            <div className="flex flex-wrap gap-2">
              {[65, 75, 80, 85, 90].map((preset) => {
                const active = targetPercentage === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetPercentage(preset)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {preset}%
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label
              htmlFor="upcoming-classes"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Upcoming Classes (Optional Projection)
            </label>
            <input
              id="upcoming-classes"
              type="number"
              min={0}
              value={upcomingClasses}
              onChange={(e) => setUpcomingClasses(e.target.value)}
              placeholder="e.g., 10"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* Right: Results */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-5">
          {stats.status === "empty" ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-base font-bold text-slate-800">Enter your class numbers</p>
              <p className="text-sm text-slate-500">
                Add attended and total classes on the left to calculate your attendance percentage.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Current Attendance
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                      {stats.currentPct.toFixed(2)}%
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                      stats.status === "safe"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {stats.status === "safe"
                      ? `Above ${targetPercentage}%`
                      : `Below ${targetPercentage}%`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/70">
                    <div
                      className={`h-full transition-all duration-300 ${
                        stats.status === "safe" ? "bg-emerald-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                    <span>
                      Attended: {stats.attended} / {stats.total}
                    </span>
                    <span>Target: {targetPercentage}%</span>
                  </div>
                </div>

                {/* Actionable Guidance Card */}
                {stats.status === "safe" ? (
                  <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-4 space-y-1">
                    <p className="text-sm font-bold text-emerald-900">
                      You can skip up to{" "}
                      <span className="underline">
                        {Number.isFinite(stats.bunksAllowedNow)
                          ? `${stats.bunksAllowedNow} ${
                              stats.bunksAllowedNow === 1 ? "class" : "classes"
                            }`
                          : "any number of classes"}
                      </span>{" "}
                      right now.
                    </p>
                    <p className="text-xs text-emerald-800">
                      Your attendance will stay at or above {targetPercentage}%.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-4 space-y-1">
                    <p className="text-sm font-bold text-amber-950">
                      Attend the next{" "}
                      <span className="underline">
                        {Number.isFinite(stats.classesNeededNow)
                          ? `${stats.classesNeededNow} ${
                              stats.classesNeededNow === 1 ? "class" : "classes"
                            }`
                          : "all possible classes"}
                      </span>{" "}
                      in a row to reach {targetPercentage}%.
                    </p>
                    <p className="text-xs text-amber-900">
                      Missing classes while below target will increase the recovery count.
                    </p>
                  </div>
                )}

                {/* Upcoming Projection */}
                {stats.future > 0 && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Next {stats.future} Classes Projection
                    </p>
                    <p className="text-sm text-slate-800 font-semibold">
                      Attend all {stats.future} →{" "}
                      <span className="text-blue-700 font-extrabold">
                        {stats.projectedPct.toFixed(2)}%
                      </span>{" "}
                      ({stats.attended + stats.future}/{stats.projectedTotal})
                    </p>
                    <p className="text-xs text-slate-600">
                      {stats.neededInUpcoming <= stats.future
                        ? `You need to attend at least ${stats.neededInUpcoming} of the next ${stats.future} classes to hit ${targetPercentage}%.`
                        : `Even attending all ${stats.future} upcoming classes would reach ${stats.maxPossiblePct?.toFixed(
                            2
                          )}%.`}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setAttendedClasses("0");
                  setTotalClasses("0");
                  setUpcomingClasses("0");
                  setTargetPercentage(75);
                }}
                className="w-full sm:w-auto self-start px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Reset Values
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}