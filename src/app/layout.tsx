import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KellelOn",
  description: "Kellel on minu asjad? Laenatud asjade nimekiri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  );
}
