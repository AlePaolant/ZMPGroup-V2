import axios from "axios";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const STRAPI_MEDIA_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || "http://localhost:1337";

export interface GalleryItem {
  id: number;
  title: string;
  images: { url: string }[];
}

export const fetchGalleryItems = async (collection: string): Promise<GalleryItem[]> => {
  try {
    const { data } = await axios.get(`${STRAPI_API_URL}/${collection}?populate=*`);

    const items = Array.isArray(data.data) ? data.data : [data.data];

    console.log("Strapi response:", JSON.stringify(data, null, 2));

    return items.map((item: any) => {
      const attributes = item.attributes || item;
    
      const images = (attributes.images || []).map((img: any) => {
        const imageUrl = img.formats?.small?.url || img.url;
        return {
          url: `${STRAPI_MEDIA_URL}${imageUrl}`
        };
      });
    
      return {
        id: item.id,
        title: attributes.title || "Senza titolo",
        images
      };
    }).reverse();

  } catch (error) {
    console.error("Errore nel fetch dei dati da Strapi:", error);
    throw new Error("Impossibile caricare la galleria");
  }
};