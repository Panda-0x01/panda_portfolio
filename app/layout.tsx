import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandProvider } from "@/components/providers/command-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";

export const metadata: Metadata = {
  title: {
    default: "Drumil Nikhare — Security Engineer & SOC Analyst",
    template: "%s | Drumil Nikhare",
  },
  description:
    "Cybersecurity professional specializing in SOC analysis, threat detection, incident response, and security engineering.",
  keywords: ["Drumil Nikhare", "Security Engineer", "SOC Analyst", "Cybersecurity", "Threat Detection", "India"],
  authors: [{ name: "Drumil Nikhare" }],
  creator: "Drumil Nikhare",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drumilnikhare.dev",
    title: "Drumil Nikhare — Security Engineer & SOC Analyst",
    description: "Cybersecurity professional specializing in SOC analysis, threat detection, and security engineering.",
    siteName: "Drumil Nikhare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drumil Nikhare — Security Engineer & SOC Analyst",
    description: "Cybersecurity professional specializing in SOC analysis, threat detection, and security engineering.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <CommandProvider>
            <div className="relative min-h-screen flex flex-col">
              <ScrollProgress />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
            </div>
          </CommandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
