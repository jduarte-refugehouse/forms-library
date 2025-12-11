import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "@/lib/radix-setup"

export const metadata: Metadata = {
  title: {
    default: "Refuge House Forms Library",
    template: "%s | Refuge House",
  },
  description: "T3C Foster Care Forms Library - Refuge House Child Placing Agency",
  keywords: ["foster care", "child welfare", "TBRI", "T3C", "forms", "Refuge House"],
  authors: [{ name: "Refuge House Child Placing Agency" }],
  icons: {
    icon: "/images/refugehouse-logo.png",
    shortcut: "/images/refugehouse-logo.png",
    apple: "/images/refugehouse-logo.png",
  },
  openGraph: {
    title: "Refuge House Forms Library",
    description: "T3C Foster Care Forms Library - Refuge House Child Placing Agency",
    siteName: "Refuge House Forms",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
