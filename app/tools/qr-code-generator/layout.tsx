import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online - URL & Text to PNG",
  description:
    "Generate high-resolution QR codes from website links or text and download them as PNG images in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}