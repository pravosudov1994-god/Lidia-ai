import type { Metadata } from "next";
import "./globals.css";
import "./chat/chat-enhancements.css";
import "./typography.css";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
