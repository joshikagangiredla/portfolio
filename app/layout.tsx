import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Fragment_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-sans" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono" });

const site = getSite();
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.siteTitle, template: `%s | ${site.name}` },
  description: site.siteDescription,
  openGraph: { type: "website", siteName: site.name, title: site.siteTitle, description: site.siteDescription },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="top" tabIndex={-1} />
        <div className="shell">
          <Sidebar site={site} />
          <div className="main-col">
            <TopBar site={site} />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter site={site} />
          </div>
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
