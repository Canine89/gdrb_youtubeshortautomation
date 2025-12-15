import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
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
      <body className={`${notoSansKr.className} antialiased min-h-screen bg-background`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
