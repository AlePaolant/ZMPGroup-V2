import axios from "axios";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || "http://localhost:1337";

export interface GalleryItem {
  id: number;
  title: string;
  images: { url: string }[];
  coverImage?: { url: string };
}

interface StrapiRawItem {
  id: number;
  title: string;
  images: StrapiImage[];
  coverImage?: StrapiImage;
}

interface StrapiImageFormat {
  url: string;
}

interface StrapiImage {
  url: string;
  formats?: {
    small?: StrapiImageFormat;
  };
}



export const fetchGalleryItems = async (collection: string): Promise<GalleryItem[]> => {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/${collection}?populate=*`);
    const items: StrapiRawItem[] = Array.isArray(response.data.data)
      ? response.data.data
      : [response.data.data];

    console.log("DEBUG - Risposta da Strapi:", items);

    return items.map((item) => {
      const images = (item.images || []).map((img: StrapiImage) => {
        const imageUrl = img.formats?.small?.url || img.url;
        return { url: `${STRAPI_MEDIA_URL}${imageUrl}` };
      });

      const cover = item.coverImage;
      const coverImageUrl = cover?.formats?.small?.url || cover?.url;
      const coverImage = coverImageUrl
        ? { url: `${STRAPI_MEDIA_URL}${coverImageUrl}` }
        : undefined;

      return {
        id: item.id,
        title: item.title || "Senza titolo",
        images,
        coverImage,
      };
    }).reverse();
  } catch (error) {
    console.error("Errore nel fetch dei dati da Strapi:", error);
    throw new Error("Impossibile caricare la galleria");
  }
};