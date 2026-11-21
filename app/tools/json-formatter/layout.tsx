import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter, Beautifier & Validator Online",
  description:
    "Format, minify, and validate JSON data with instant syntax error checks in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}