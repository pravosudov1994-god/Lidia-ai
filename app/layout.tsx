import type { Metadata } from "next";
import "./globals.css";
import "./chat/chat-enhancements.css";

export const metadata: Metadata = {
  title: "Motin AI — интеллектуальный партнёр для бизнеса",
  description:
    "Motin AI: стратегии, маркетинг, презентации и лидогенерация Motin Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
