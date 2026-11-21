import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Online Free - Combine Multiple PDF Files",
  description:
    "Combine two or more PDF files into one PDF document online for free. Runs locally in your browser with no file uploads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}