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
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors z-10"
                    onClick={onClose}
                >
                    <X size={28} className="bg-white/80 rounded-full p-1" />
                </button>

                {/* Preview */}
                <div className="flex-1 flex items-center justify-center bg-gray-100 overflow-hidden relative">
                    <img
                        src={item.images[current].url}
                        alt="Preview"
                        className="h-full w-[100%] object-contain p-4"
                    />
                </div>

                {/* Thumbnails */}
                <div className="w-full md:w-[25%] overflow-y-auto p-3 space-y-3 bg-white border-l border-gray-200">
                    {item.images.map((img: any, idx: number) => (
                        <div key={idx} className="relative">
                            <img
                                src={img.url}
                                onClick={() => setCurrent(idx)}
                                className={`cursor-pointer w-full h-20 object-cover rounded-md transition-all ${current === idx
                                        ? "ring-2 ring-blue-500 scale-95"
                                        : "opacity-80 hover:opacity-100 hover:scale-[0.98]"
                                    }`}
                            />
                            {current === idx && (
                                <div className="absolute inset-0 border-2 border-white rounded-md pointer-events-none" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPopup;