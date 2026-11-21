"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import ToolShell from "@/app/components/ToolShell";

type QrType = "link" | "whatsapp" | "social" | "wifi" | "image-url" | "text";

const QR_TYPES: { id: QrType; label: string; hint: string }[] = [
  { id: "link", label: "URL / Link", hint: "Website link or form URL" },
  { id: "whatsapp", label: "WhatsApp", hint: "Phone number & pre-filled message" },
  { id: "social", label: "Instagram / YouTube", hint: "Profile, reel, or video URL" },
  { id: "wifi", label: "Wi-Fi", hint: "Network name (SSID) & password" },
  { id: "image-url", label: "Photo / Image Link", hint: "Direct photo URL to share via QR" },
  { id: "text", label: "Plain Text", hint: "Any note, code, or message" },
];

export default function QrCodeGeneratorPage() {
  const [qrType, setQrType] = useState<QrType>("link");

  // Type-specific inputs
  const [urlInput, setUrlInput] = useState<string>("https://snaptools.vercel.app");
  const [waPhone, setWaPhone] = useState<string>("919876543210");
  const [waMsg, setWaMsg] = useState<string>("Hello!");
  const [socialUrl, setSocialUrl] = useState<string>("https://instagram.com/");
  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPass, setWifiPass] = useState<string>("");
  const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");

  // Customization options
  const [qrColor, setQrColor] = useState<string>("#0f172a");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrSize, setQrSize] = useState<number>(320);

  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const buildPayload = (): string => {
    if (qrType === "link") {
      return urlInput.trim();
    }
    if (qrType === "whatsapp") {
      const cleanPhone = waPhone.replace(/\D/g, "");
      if (!cleanPhone) return "";
      const encodedMsg = encodeURIComponent(waMsg.trim());
      return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
    }
    if (qrType === "social") {
      return socialUrl.trim();
    }
    if (qrType === "wifi") {
      const ssid = wifiSsid.trim();
      if (!ssid) return "";
      const safeSsid = ssid.replace(/([\\;,:"])/g, "\\$1");
      const safePass = wifiPass.replace(/([\\;,:"])/g, "\\$1");
      return `WIFI:T:${wifiSecurity};S:${safeSsid};P:${safePass};;`;
    }
    if (qrType === "image-url") {
      return photoUrl.trim();
    }
    return plainText.trim();
  };

  useEffect(() => {
    const payload = buildPayload();
    if (!payload) {
      setQrDataUrl("");
      return;
    }

    QRCode.toDataURL(payload, {
      width: qrSize,
      margin: 2,
      color: {
        dark: qrColor,
        light: bgColor,
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    qrType,
    urlInput,
    waPhone,
    waMsg,
    socialUrl,
    wifiSsid,
    wifiPass,
    wifiSecurity,
    photoUrl,
    plainText,
    qrColor,
    bgColor,
    qrSize,
  ]);

  const activeMeta = QR_TYPES.find((t) => t.id === qrType)!;

  return (
    <ToolShell
      title="QR Code Generator"
      subtitle="Create customizable QR codes for links, WhatsApp, social profiles, Wi-Fi, photo links, or text."
      accent="emerald"
      guideTitle="How Different QR Code Types Work?"
      guideText="Select a QR category, enter your details, customize color and resolution, and download the PNG QR code. For photos, enter a public image/photo URL so scanners can open or view the photo."
    >
      <div className="space-y-6">
        {/* 1. QR Type Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            1. Select QR Code Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {QR_TYPES.map((item) => {
              const active = qrType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQrType(item.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border text-left transition cursor-pointer ${
                    active
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                      : "bg-slate-50 text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-2">{activeMeta.hint}</p>
        </div>

        {/* 2. Dynamic Content Input */}
        <div className="rounded-xl bg-slate-50/80 border border-slate-200 p-4 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
            2. Add Content ({activeMeta.label})
          </p>

          {qrType === "link" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Website / Link URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {qrType === "whatsapp" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Phone Number (with country code, e.g., 919876543210)
                </label>
                <input
                  type="text"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  placeholder="919876543210"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Default Message (Optional)
                </label>
                <input
                  type="text"
                  value={waMsg}
                  onChange={(e) => setWaMsg(e.target.value)}
                  placeholder="Hi, I would like to know more..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {qrType === "social" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Instagram / YouTube / Social Link
              </label>
              <input
                type="url"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder="https://instagram.com/username or https://youtu.be/..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {qrType === "wifi" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Network Name (SSID)*
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyWiFi"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="Wi-Fi password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Security
                </label>
                <select
                  value={wifiSecurity}
                  onChange={(e) =>
                    setWifiSecurity(e.target.value as "WPA" | "WEP" | "nopass")
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="WPA">WPA / WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
            </div>
          )}

          {qrType === "image-url" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Photo / Image URL
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Paste a direct image link so scanning the QR opens the photo.
              </p>
            </div>
          )}

          {qrType === "text" && (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Text Content
              </label>
              <textarea
                rows={3}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text to encode into QR..."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        {/* 3. Customize QR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              QR Color
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs font-mono text-slate-700">{qrColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Background Color
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs font-mono text-slate-700">{bgColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Download Size
            </label>
            <select
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={256}>256 × 256 px</option>
              <option value={320}>320 × 320 px</option>
              <option value={512}>512 × 512 px (HD)</option>
            </select>
          </div>
        </div>

        {/* 4. Live Preview & Download */}
        {qrDataUrl ? (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Live QR Preview
            </p>
            <img
              src={qrDataUrl}
              alt="Generated QR code"
              className="w-48 h-48 mx-auto mb-4 rounded-xl border border-slate-200 bg-white p-2 shadow-2xs"
            />
            <a
              href={qrDataUrl}
              download={`snaptools-${qrType}-qr.png`}
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Download PNG QR Code
            </a>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs sm:text-sm text-slate-500">
            Enter valid details above to generate your QR code preview.
          </div>
        )}
      </div>
    </ToolShell>
  );
}