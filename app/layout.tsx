import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://drumil-portfolio.vercel.app'),
  title: {
    default: "Drumil Nikhare - Full Stack Developer",
    template: "%s | Drumil Nikhare"
  },
  description: "Full-Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences. Specializing in React, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Node.js", "JavaScript", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Drumil Nikhare" }],
  creator: "Drumil Nikhare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com",
    title: "Drumil Nikhare - Full Stack Developer",
    description: "Full-Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.",
    siteName: "Drumil Nikhare Portfolio",
    images: [
      {
        url: "/av2.jpeg",
        width: 1200,
        height: 630,
        alt: "Drumil Nikhare - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drumil Nikhare - Full Stack Developer",
    description: "Full-Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.",
    images: ["/av2.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/av2.jpeg', sizes: '192x192', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/av2.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
