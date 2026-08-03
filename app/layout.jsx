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
  title: "Vignesh Nagarajan — Engineering Leader, Industry 4.0 & IIoT",
  description:
    "Engineering leader with 10+ years building intelligent manufacturing systems across Europe, APAC, and the Americas. Currently at Magna International.",
  metadataBase: new URL("https://vigneshnagarajan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vignesh Nagarajan — Engineering Leader, Industry 4.0 & IIoT",
    description:
      "Engineering leader with 10+ years building intelligent manufacturing systems across Europe, APAC, and the Americas. Currently at Magna International.",
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
