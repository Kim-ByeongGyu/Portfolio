import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${profile.nameEn} · ${profile.role}`,
  description: `${profile.name} (${profile.nameEn}) — ${profile.tagline}`,
  metadataBase: new URL("https://kbg-dev-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.nameEn} · ${profile.role}`,
    description: profile.tagline,
    url: "/",
    siteName: `${profile.nameEn} Portfolio`,
    images: [
      {
        url: "/projects/univus/01-landing.png",
        width: 1624,
        height: 990,
        alt: "Kim ByeongGyu backend portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.nameEn} · ${profile.role}`,
    description: profile.tagline,
    images: ["/projects/univus/01-landing.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoKr.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var theme = localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch (_) {}
`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
