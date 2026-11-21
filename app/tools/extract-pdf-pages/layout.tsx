import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract & Split PDF Pages Online Free",
  description:
    "Extract specific pages or page ranges from a PDF into a new document directly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}