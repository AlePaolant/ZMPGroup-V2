export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors', // Questo middleware è già presente, ma ora dobbiamo configurarlo correttamente
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  
  // Configurazione personalizzata per CORS
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://9cca-151-15-234-41.ngrok-free.app'], // URL di Ngrok (o '*')
    },
  },
];