import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online - 90°, 180°, 270°",
  description:
    "Rotate sideways or upside-down PDF pages clockwise by 90, 180, or 270 degrees free in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}