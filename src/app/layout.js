import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "BhojRaj Pandit - Hindu Religious Services & Ceremonies",
  description: "Experienced Pandit offering authentic Hindu ceremonies including Pujas, Bratabandhan, Wedding Rituals, and more. Book your appointment today.",
  keywords: "pandit, hindu ceremonies, puja services, bratabandhan, wedding rituals, religious services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
