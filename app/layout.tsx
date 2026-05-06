import type { Metadata } from "next";
import localFont from "next/font/local";
import { PT_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import StylingDropdown from "@/components/styling-dropdown";
import Preloader from "@/components/preloader";
import { MenuProvider } from "@/components/menu-context";
import { getProjects, getSettings } from "@/lib/content";

const ptMono = PT_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pt-mono",
  display: "swap",
});

const nimbusSans = localFont({
  src: [
    { path: "../fonts/NimbusSanL-Reg.otf", weight: "400", style: "normal" },
    { path: "../fonts/NimbusSanL-RegIta.otf", weight: "400", style: "italic" },
    { path: "../fonts/NimbusSanL-Bol.otf", weight: "700", style: "normal" },
    { path: "../fonts/NimbusSanL-BolIta.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-nimbus-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { name, role } = await getSettings();
  const title = `${name} — ${role}`;
  return {
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description: `${name} is a photographer. Explore editorial work, archives, and collaborations.`,
    keywords: [name, role.toLowerCase(), "editorial", "archive"],
    authors: [{ name }],
    creator: name,
    metadataBase: new URL("https://siggybodolai.com"),
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: name,
      title,
      description: `${role}. Editorial work, archives, and collaborations.`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${role}. Editorial work, archives, and collaborations.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [projects, { name, role, email }] = await Promise.all([getProjects(), getSettings()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    email,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${nimbusSans.variable} ${ptMono.variable} antialiased`}>
        <MenuProvider>
          <Preloader name={name} role={role} />
          <Header name={name} />
          <StylingDropdown projects={projects} />
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}
