import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Image to 20KB, 50KB, 100KB for Exam Forms",
  description:
    "Reduce photo and signature file sizes to 20KB, 50KB, or 100KB for online forms locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}