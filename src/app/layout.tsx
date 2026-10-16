import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F2E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Wedding & Convention Halls in Mangalagiri`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "The Royal Conventions",
    "Royal Convention Mangalagiri",
    "Royal Banquet Mangalagiri",
    "Vaishnavi Vaidehi",
    "Marriage Hall in Mangalagiri",
    "Convention Centre near Vijayawada",
    "Wedding Venue Guntur",
    "Luxury Banquet Hall Amaravati",
    "Function Hall RTC Depot Road Mangalagiri",
    "N. Nageswara Rao Royal Conventions",
    "Deluxe Lodging Rooms Mangalagiri",
    "Pillarless AC Convention Centre",
  ],
  authors: [{ name: siteConfig.proprietor.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} | Mangalagiri's Premier Multi-Venue Destination`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Conventions - Luxury Wedding & Convention Campus in Mangalagiri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
    google: "google4aa46241f4fa9527",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enhanced Multi-Entity JSON-LD (EventVenue + LocalBusiness + Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EventVenue", "LocalBusiness"],
        "@id": `${siteConfig.url}/#venue`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        description: siteConfig.description,
        telephone: siteConfig.contact.primaryPhone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.locality,
          addressRegion: siteConfig.contact.address.state,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "16.4358941",
          longitude: "80.5487123",
        },
        founder: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#proprietor`,
          name: siteConfig.proprietor.name,
          jobTitle: siteConfig.proprietor.title,
          description: siteConfig.proprietor.bio,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Venue Venues & Halls",
          itemListElement: siteConfig.venues.map((venue, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "EventVenue",
              name: venue.name,
              description: venue.shortDescription,
              maximumAttendeeCapacity: venue.floatingCapacity,
              url: `${siteConfig.url}/${venue.slug}`,
            },
            position: idx + 1,
          })),
        },
        amenityFeature: siteConfig.facilities.map((fac) => ({
          "@type": "LocationFeatureSpecification",
          name: fac.title,
          value: true,
        })),
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#proprietor`,
        name: siteConfig.proprietor.name,
        jobTitle: siteConfig.proprietor.title,
        affiliation: {
          "@id": `${siteConfig.url}/#venue`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-cream text-forest-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
