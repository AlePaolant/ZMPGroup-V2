"use client";

import { useEffect, useState } from "react";
import { getEdiliziaCarousel } from "@/lib/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import Card from "@/components/Edilizia-card";

interface EdiliziaItem {
  id: number;
  Titolo: string;
  Descrizione: string;
  Luogo: string;
  Data: string;
  Immagine: {
    url: string;
  };
}

export default function Carousel() {
  const [slides, setSlides] = useState<EdiliziaItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getEdiliziaCarousel();
      setSlides(data);
    }
    fetchData();
  }, []);

  if (slides.length === 0) {
    return <p className="text-center text-lg">Caricamento...</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto sm:px-1 md:px-2 lg:px-8 pb-8 pt-8 
    h-[65vh] max-h-[400px] md:max-h-[500px] lg:max-h-[600px] flex items-center justify-center">
      <Swiper
        spaceBetween={20}  // Ridotto per migliorare la visibilità
        centeredSlides={true}
        loop={true}
        effect="coverflow"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        modules={[EffectCoverflow]}
        className="w-full h-full overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="transition-all duration-300 flex justify-center">
            <Card
              titolo={slide.Titolo}
              descrizione={slide.Descrizione}
              luogo={slide.Luogo}
              data={slide.Data}
              immagine={`http://localhost:1337${slide.Immagine.url}`}
              isActive={index === activeIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
};