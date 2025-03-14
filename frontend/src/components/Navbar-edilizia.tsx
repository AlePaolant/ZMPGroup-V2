"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  logo: string;
  logoScroll?: string;
  linksLeft?: { name: string; href: string }[];
  linksRight?: { name: string; href: string }[];
  logoSize?: string;
  colorsTop?: {
    background?: string;
    text?: string;
    hover?: string;
  };
  colorsScroll?: {
    background?: string;
    text?: string;
    hover?: string;
  };
  scrollThreshold?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoScroll,
  linksLeft = [],
  linksRight = [],
  logoSize = "h-13",
  colorsTop = {},
  colorsScroll = {},
  scrollThreshold = 50,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effetto per rilevare lo scroll della pagina
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  // Colori in base alla posizione dello scroll
  const colors = scrolled ? colorsScroll : colorsTop;

  // Logo da mostrare in base allo scroll
  const currentLogo = scrolled && logoScroll ? logoScroll : logo;

  return (
    <nav
      className={`${colors.background} fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-0 py-4 flex items-center justify-between">
        {/* Logo con cursor-pointer solo per il logo */}
        <div className="flex items-center justify-start flex-grow-0 pointer-events-auto">
          <Link href="/" passHref>
            <img
              src={currentLogo}
              alt="Logo"
              className={`${logoSize} transition-all duration-300 cursor-pointer`} // Aggiungi il cursore pointer al logo
            />
          </Link>
        </div>

        {/* Menu Links a destra su desktop */}
        <div className="hidden md:flex ml-auto space-x-6">
          {/* Links a sinistra */}
          {linksLeft.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-lg font-medium ${colors.text} ${colors.hover} cursor-pointer`} // Aggiungi il cursore pointer ai link
            >
              {link.name}
            </Link>
          ))}

          {/* Links a destra */}
          {linksRight.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-lg font-medium ${colors.text} ${colors.hover} cursor-pointer`} // Aggiungi il cursore pointer ai link
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay con dissolvenza e colori Scroll */}
      {isOpen && (
        <div
          className={`${colors.background} absolute top-0 left-0 w-full h-screen backdrop-blur-lg flex flex-col items-center justify-center space-y-6 md:hidden transition-opacity duration-300 ease-in-out opacity-100`}
        >
          {/* Logo sopra l'overlay mobile */}
          <div className="absolute top-6 left-6">
            <img
              src={currentLogo}
              alt="Logo"
              className={`${logoSize} transition-all duration-300 cursor-pointer`} // Aggiungi il cursore pointer anche nel menu mobile
            />
          </div>

          {/* Links nel menu mobile (uno sotto l'altro) */}
          <div className="mt-20 space-y-6 flex flex-col justify-center items-center gap-10">
            {linksLeft.concat(linksRight).map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`${colors.text} text-xl font-semibold cursor-pointer`} // Aggiungi il cursore pointer ai link
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;