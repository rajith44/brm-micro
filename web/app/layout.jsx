import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import { getCategories, getSettings } from "@/lib/api";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata() {
  const settings = await getSettings();
  const seo = settings.seo || {};
  return {
    title: seo.title || "Micro Art LTD — Luxury Ceylon Gemstones & Jewelry",
    description:
      seo.description ||
      "A premium storefront for exceptional Ceylon gemstones, handcrafted jewelry and one-of-a-kind heirloom pieces inspired by Sri Lankan artistry.",
    keywords: seo.keywords || undefined,
  };
}

export default async function RootLayout({ children }) {
  const [gemCategories, jewelryCategories, settings] = await Promise.all([
    getCategories("gemstone"),
    getCategories("jewelry"),
    getSettings(),
  ]);

  return (
    <html lang="en" className={cormorant.variable}>
      <body className="bg-cream text-ink">
        {settings.maintenanceMode ? (
          <MaintenanceScreen message={settings.maintenanceMessage} />
        ) : (
          <>
            <AnnouncementBar />
            <Header gemCategories={gemCategories} jewelryCategories={jewelryCategories} />
            <main>{children}</main>
            <Footer business={settings.business} social={settings.social} />
            <ScrollToTop />
          </>
        )}
      </body>
    </html>
  );
}
