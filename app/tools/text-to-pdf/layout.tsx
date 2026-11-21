import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text & Notes to PDF Converter Online Free",
  description:
    "Convert typed notes, study summaries, or plain text into a formatted A4 PDF in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}