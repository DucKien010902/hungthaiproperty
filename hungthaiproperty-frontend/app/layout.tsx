import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import { HomeHeader } from "./sections/home/home-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.hungthaiproperty.vn";
const siteName = "Hưng Thái Property";
const siteTitle = "Hưng Thái Property | Chủ đầu tư bất động sản";
const siteDescription =
  "Hưng Thái Property là chủ đầu tư bất động sản, phát triển các dự án chất lượng với quy hoạch đồng bộ, pháp lý minh bạch và giá trị bền vững.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Hưng Thái Property",
    "Hung Thai Property",
    "chủ đầu tư bất động sản",
    "bất động sản",
    "phát triển dự án",
    "dự án bất động sản",
    "đầu tư bất động sản",
    "nhà ở",
    "Việt Nam",
  ],
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "vi_VN",
    images: [
      {
        url: "/Logo-1.png",
        width: 1200,
        height: 1200,
        alt: `${siteName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/Logo-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/Logo-1.png?v=2", type: "image/png" },
    ],
    apple: "/icon.png?v=2",
    shortcut: "/icon.png?v=2",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/Logo-1.png`,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "VN",
      availableLanguage: ["vi", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <HomeHeader />
        {children}
      </body>
    </html>
  );
}
