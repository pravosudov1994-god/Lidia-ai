import type { Metadata } from "next";
import "./globals.css";
import "./chat/chat-enhancements.css";
import "./typography.css";
import "./leadgen.css";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Motin AI — целевые лиды для вашего бизнеса",
  description:
    "Motin AI — умная лидогенерация: анализ ниши, привлечение, квалификация колл-центром и передача целевых лидов. Бесплатный тест на 7 дней. Тарифы от 20 лидов.",
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
