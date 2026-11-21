import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SnapWorkKit - Free PDF, Image, Student & AI Tools",
    short_name: "SnapWorkKit",
    description:
      "Fast, free browser-based PDF tools, exam image compressor, CGPA & 75% attendance calculators, QR generator, and AI prompts.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  };
}