// app/components/Gallery.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { fetchGalleryItems } from "@/lib/strapi";
import GalleryPopup from "@/components/GalleryPopup";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    collectionName: string;
}

interface GalleryItem {
    id: number;
    title: string;
    coverImage?: { url: string };
    images: { url: string }[];
}

const Gallery = ({ collectionName }: Props) => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [popupIndex, setPopupIndex] = useState<number | null>(null);
    //const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchGalleryItems(collectionName).then((items) => {
            console.log("DEBUG - Gallery items:", items);
            setItems(items);
        }).catch((err) => {
            console.error("DEBUG - Errore nel fetch:", err);
        });
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
            //const index = Math.round(container.scrollLeft / 300);
            //setCurrentIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCardClick = (index: number, event: React.MouseEvent) => {
        // Su mobile (o touch device), apri direttamente il popup
        if (window.innerWidth < 768 || 'ontouchstart' in window) {
            setPopupIndex(index);
            return;
        }

        // Su desktop, controlla se il click è sul pulsante
        const target = event.target as HTMLElement;
        if (!target.closest('button')) {
            // Se non è sul pulsante, non fare nulla (o puoi aggiungere altro comportamento)
            return;
        }
    };

    return (
        <div className="relative w-full pt-4 pb-16 overflow-hidden">
            {/* Gallery container */}
            <div
                ref={containerRef}
                className="flex gap-4 px-8 overflow-x-scroll scroll-smooth scroll-snap-x snap-x snap-mandatory no-scrollbar"
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={(e) => handleCardClick(index, e)}
                        className="relative group snap-start min-w-[300px] max-w-[300px] h-[200px] rounded-lg overflow-hidden cursor-pointer shrink-0"
                    >
                        <Image
                            src={item.coverImage?.url || item.images[0]?.url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover transition-all group-hover:brightness-50"
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <div className="text-center text-white">
                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPopupIndex(index);
                                    }}
                                    className="mt-2 bg-white text-black px-4 py-1 rounded shadow cursor-pointer"
                                >
                                    Apri
                                </button>
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
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => scrollContainer("left")}
                        className="absolute left-0 bg-white/70 rounded-full p-2 shadow-md z-10 cursor-pointer"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={() => scrollContainer("right")}
                        className="absolute right-0 bg-white/70 rounded-full p-2 shadow-md z-10 cursor-pointer"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gallery;