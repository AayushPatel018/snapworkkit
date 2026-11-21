import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove PDF Pages Online - Delete Unwanted Pages",
  description:
    "Delete blank or unwanted pages from any PDF file and download a clean PDF locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}