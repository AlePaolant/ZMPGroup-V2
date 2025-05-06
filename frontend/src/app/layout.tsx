import { Montserrat, Raleway, Poppins, Playfair } from "next/font/google";
import "aos/dist/aos.css"; // Importa i CSS di AOS
import "./styles/globals.css";
import { ReactNode } from "react"; // Importa ReactNode da React

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};


// Aggiungi la tipizzazione esplicita per 'children' come 'ReactNode'
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body
        className={`${montserrat.variable} ${raleway.variable} ${poppins.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}