export const metadata = {
  title: "Aurelia Zahra — Flutter Developer & Designer",
  description:
    "Portfolio of Aurelia Zahra, a Flutter Developer & UI/UX Designer. Building mobile experiences and crafting visuals that communicate.",
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}