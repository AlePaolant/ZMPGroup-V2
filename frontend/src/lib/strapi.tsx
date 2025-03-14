import axios from "axios";

const STRAPI_URL = "http://localhost:1337/api";

/**
 * Recupera i dati dal CMS Strapi per il carosello
 */
export async function getEdiliziaCarousel() {
    try {
      const res = await axios.get(`${STRAPI_URL}/edilizia-carousels?populate=*`);
      console.log(res.data.data);  // Aggiungi questa riga per vedere i dati
      return res.data.data;
    } catch (error) {
      console.error("Errore nel recupero del carosello:", error);
      return [];
    }
  }