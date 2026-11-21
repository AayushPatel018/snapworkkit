"use client";
import { useState } from "react";
import ToolShell from "@/app/components/ToolShell";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState<number>(14);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("Click Generate Below");
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolShell
      title="Strong Password Generator"
      subtitle="Generate random, high-entropy passwords locally using your browser's crypto API."
      accent="emerald"
      guideTitle="Tips for Strong Passwords"
      guideText="Use at least 12 to 16 characters combining uppercase and lowercase letters, numbers, and symbols—and avoid reusing the same password across accounts."
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm sm:text-base text-slate-900 break-all">
          <span>{password}</span>
          <button
            onClick={copyPassword}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3.5 py-2 rounded-lg font-semibold shrink-0 transition cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Password Length: <span className="text-emerald-700">{length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-slate-700 font-medium">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Include Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Include Symbols (@#$%)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-xs transition cursor-pointer"
        >
          Generate New Password
        </button>
      </div>
    </ToolShell>
  );
}