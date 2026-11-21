"use client";
import { useEffect, useState } from "react";
import ToolShell from "@/app/components/ToolShell";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState<string>("2004-01-01");
  const [age, setAge] = useState<AgeResult | null>(null);

  useEffect(() => {
    if (!birthDate) {
      setAge(null);
      return;
    }

    const dob = new Date(birthDate + "T00:00:00");
    const today = new Date();

    if (isNaN(dob.getTime()) || dob > today) {
      setAge(null);
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      const prevMonthLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonthLastDay;
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.floor(
      (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)
    );

    setAge({ years, months, days, totalDays });
  }, [birthDate]);

  return (
    <ToolShell
      title="Age Calculator"
      subtitle="Find your exact age in years, months, and days for application forms and eligibility checks."
      accent="blue"
      guideTitle="How Exact Age is Calculated?"
      guideText="Age is computed accurately between your selected birth date and today's calendar date, accounting for month lengths and leap years."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Select Date of Birth:
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {age ? (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200/80 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
              Exact Age
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {age.years} Years, {age.months} Months, {age.days} Days
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5">
              Total days lived:{" "}
              <b className="text-slate-800">{age.totalDays.toLocaleString()}</b> days
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            Please select a valid birth date on or before today.
          </div>
        )}
      </div>
    </ToolShell>
  );
}