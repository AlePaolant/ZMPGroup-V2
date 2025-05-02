// app/components/GalleryPopup.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const GalleryPopup = ({ item, onClose }: { item: any; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-5xl h-[70vh] rounded-lg overflow-hidden flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-3 right-3 text-black" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <img src={item.images[current].url} alt="Preview" className="max-h-full max-w-full object-contain" />
        </div>

        {/* Thumbnails */}
        <div className="w-full md:w-[30%] overflow-y-auto p-4 space-y-2 bg-white">
          {item.images.map((img: any, idx: number) => (
            <img
              key={idx}
              src={img.url}
              onClick={() => setCurrent(idx)}
              className={`cursor-pointer w-full object-cover rounded ${current === idx ? "ring-2 ring-blue-500" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;