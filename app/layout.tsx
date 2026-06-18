import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-kr",
});

export const metadata: Metadata = {
  title: "이게 되네? AI 쇼츠 만들기 미친 자동화 22제",
  description: "AI 쇼츠 자동화 프롬프트 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${notoSerifKr.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
