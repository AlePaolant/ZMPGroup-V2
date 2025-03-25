import { useState } from "react";

interface CardProps {
  titolo: string;
  descrizione: string;
  luogo: string;
  data: string;
  immagine: string;
  isActive: boolean; // Indica se la card è attiva nel carosello
}

export default function Card({ titolo, descrizione, luogo, data, immagine, isActive }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative w-[85vw] max-w-[200px] sm:w-56 sm:max-w-[250px] md:w-64 md:max-w-[280px] 
      aspect-[3/4] transition-transform duration-300 overflow-hidden rounded-2xl shadow-lg cursor-pointer 
      ${isActive ? "scale-100" : "scale-90 opacity-70"}`}
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Immagine */}
      <img
        src={immagine}
        alt={titolo}
        className="w-full h-full object-cover transition-transform duration-300"
      />

      {/* Overlay sfumato sulle card NON attive */}
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent transition-opacity duration-300"></div>
      )}

      {/* Overlay info (compare su hover/click) */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
      >
        <h2 className="text-lg font-semibold">{titolo}</h2>
        <p className="text-sm text-gray-300 mt-2">{descrizione}</p>
        <p className="text-xs text-gray-400 mt-2">📍 {luogo} | 📅 {data}</p>
      </div>
    </div>
  );
}