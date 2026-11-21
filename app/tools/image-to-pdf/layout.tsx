import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG & PNG to PDF Converter Online Free",
  description:
    "Convert JPG and PNG images into a clean PDF document directly in your browser without sign-up.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}