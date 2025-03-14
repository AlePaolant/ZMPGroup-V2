"use client"; // Necessario per Next.js (App Router)

import { useEffect, useState } from "react";
import { getEdiliziaCarousel } from "@/lib/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Card from "@/components/Edilizia-card";

interface EdiliziaItem {
  id: number;
  attributes: {
    Titolo: string;
    Descrizione: string;
    Luogo: string;
    Data: string;
    Immagine: {
      name: string;  // Assicurati che l'immagine abbia la proprietà "name"
    };
  };
}

export default function Carousel() {
  const [slides, setSlides] = useState<EdiliziaItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getEdiliziaCarousel();
      console.log("Dati del carosello:", data); // Aggiungi un log per controllare i dati
      setSlides(data);
    }
    fetchData();
  }, []);

  if (slides.length === 0) {
    return <p>Caricamento...</p>; // Mostra un messaggio di caricamento se i dati non sono ancora disponibili
  }

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Pagination, Autoplay]}
      className="w-full max-w-4xl mx-auto"
    >
      {slides.map((slide) => {
        if (!slide.attributes) {
          return null; // Se non ci sono attributi, non renderizzare il componente
        }

        return (
          <SwiperSlide key={slide.id}>
            <Card
              titolo={slide.attributes.Titolo}
              descrizione={slide.attributes.Descrizione}
              luogo={slide.attributes.Luogo}
              data={slide.attributes.Data}
              immagine={`http://localhost:1337${slide.attributes.Immagine.name}`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}