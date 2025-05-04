// app/components/Gallery.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { fetchGalleryItems } from "@/lib/strapi";
import GalleryPopup from "@/components/GalleryPopup";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    collectionName: string;
}

const Gallery = ({ collectionName }: Props) => {
    const [items, setItems] = useState<any[]>([]);
    const [popupIndex, setPopupIndex] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchGalleryItems(collectionName).then(setItems);
    }, [collectionName]);

    const scrollContainer = (dir: "left" | "right") => {
        const scrollAmount = 300;
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: dir === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const index = Math.round(container.scrollLeft / 300);
            setCurrentIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="relative w-full pt-4 pb-16 overflow-hidden">

            {/* Gallery container */}
            <div
                ref={containerRef}
                className="flex gap-4 px-8 overflow-x-scroll scroll-smooth scroll-snap-x snap-x snap-mandatory no-scrollbar"
            >
                {items.map((item, index) => (
                    <div key={item.id} className="relative group snap-start min-w-[300px] max-w-[300px] h-[200px] rounded-lg overflow-hidden cursor-pointer shrink-0">
                        <img
                            src={item.coverImage?.url || item.images[0]?.url}
                            alt={item.title}
                            className="object-cover w-full h-full transition-all group-hover:brightness-50"
                        />            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
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
            <div className="mt-10 mx-4 relative">
                {/* Contenitore principale con posizione relativa */}
                <div className="flex items-center justify-center">
                    {/* Freccia sinistra - posizionata assolutamente a sinistra */}
                    <button
                        onClick={() => scrollContainer("left")}
                        className="absolute left-0 bg-white/70 rounded-full p-2 shadow-md z-10"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Pallini indicatori 
                    <div className="flex gap-2">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    containerRef.current?.scrollTo({
                                        left: idx * containerRef.current.offsetWidth,
                                        behavior: "smooth",
                                    });
                                    setCurrentIndex(idx); // Assicurati di aggiornare lo stato
                                }}
                                className={`w-3 h-3 cursor-pointer rounded-full ${idx === currentIndex ? "bg-black" : "bg-gray-400"
                                    } transition`}
                            />
                        ))}
                    </div>
                    */}

                    {/* Freccia destra - posizionata assolutamente a destra */}
                    <button
                        onClick={() => scrollContainer("right")}
                        className="absolute right-0 bg-white/70 rounded-full p-2 shadow-md z-10"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gallery;