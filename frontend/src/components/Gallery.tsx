// app/components/Gallery.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchGalleryItems } from "@/lib/strapi";
import GalleryPopup from "@/components/GalleryPopup";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  collectionName: string;
}

const Gallery = ({ collectionName }: Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    fetchGalleryItems(collectionName).then(setItems);
  }, [collectionName]);

  const scrollContainer = (dir: "left" | "right") => {
    const scrollAmount = dir === "left" ? -300 : 300;
    setScrollX(prev => prev + scrollAmount);
  };

  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Scroll buttons */}
      <button onClick={() => scrollContainer("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md">
        <ChevronLeft />
      </button>
      <button onClick={() => scrollContainer("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md">
        <ChevronRight />
      </button>

      {/* Gallery container */}
      <div
        className="flex gap-4 transition-transform duration-300 overflow-x-auto no-scrollbar px-8"
        style={{ transform: `translateX(${scrollX}px)` }}
      >
        {items.map((item, index) => (
          <div key={item.id} className="relative group min-w-[300px] max-w-[300px] h-[200px] rounded-lg overflow-hidden cursor-pointer">
            <img src={item.images[0].url} alt={item.title} className="object-cover w-full h-full transition-all group-hover:brightness-50" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="text-center text-white">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <button onClick={() => setPopupIndex(index)} className="mt-2 bg-white text-black px-4 py-1 rounded shadow">Apri</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupIndex !== null && (
        <GalleryPopup
          item={items[popupIndex]}
          onClose={() => setPopupIndex(null)}
        />
      )}
    </div>
  );
};

export default Gallery;