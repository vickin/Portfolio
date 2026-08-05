import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Vignesh Nagarajan — Smart Factory & Digital Manufacturing Leader",
  description:
    "Digital transformation leader with 10+ years turning shop-floor pain points into funded Industry 4.0 and AI programmes — $2.3M+ tracked EBIT impact across 100+ manufacturing divisions in Europe, North America, and China. Currently at Magna International.",
  metadataBase: new URL("https://vigneshnagarajan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vignesh Nagarajan — Smart Factory & Digital Manufacturing Leader",
    description:
      "Digital transformation leader with 10+ years turning shop-floor pain points into funded Industry 4.0 and AI programmes — $2.3M+ tracked EBIT impact across 100+ manufacturing divisions in Europe, North America, and China.",
    url: "https://vigneshnagarajan.com",
    images: ["/profile.png"],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
