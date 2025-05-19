<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AlePaolant/ZMPGroup-V2">
    <img src="frontend/public/images/logo-zmp-group-w-V2.png" alt="Logo" width="auto" height="80">
  </a>

  <h3 align="center">ZMP GROUP WEBSITE</h3>

  <p align="center">
    Sito web creato da Alessandro Paolantonio per ZMP GROUP
    <br />
    <a href="https://zmpgroup.it"><strong>Guarda il sito »</strong></a>
  </p>
</div>


## Built With:
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-000000?logo=next.js)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5.11.2-2F2E8B?logo=strapi)](https://strapi.io/)
[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

 
## Tech Stack
**Frontend:** 
- `Next.js 15.2.4` - (App Router)
- `TailwindCSS` 
- `framer-motion` + `AOS` - Animazioni
- `lucide-react` o `react-icons` - Icone
- `react-google-recaptcha` - Form
- `axios` - HTTP Client

**Backend:**
- `Strapi 5.11.2`
- `PostgreSQL` 
- `nodemailer`- Invio di email


## Struttura del Sito
```bash
home

edilizia/
├── hero
├── chi-siamo
├── moduli (preventivi, collaborazioni, lavoro)
├── gallery-lavori
├── contatti
├── certificazioni

cars/
├── hero
├── about
├── moduli (acquisto auto, valutazione usato)
├── gallery-auto
├── contatti
├── perchè-noi
```

### Configurazione
**Variabili d'ambiente (frontend/.env)**
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tua_chiave
NEXT_PUBLIC_NODEMAILER_API=/api/send-email
```
**Ngrok Config (ngrok.yml)**
```bash
tunnels:
  frontend:
    addr: 3000
    proto: http
  strapi:
    addr: 1337
    proto: http
```

### Avvio Sviluppo

1. **Clona il repository**
   ```bash
   git clone https://github.com/AlePaolant/ZMPGroup-V2.git
   cd ZMPGroup-V2
   ```
2. **Backend Strapi**
   ```bash
   cd backend
   npm run develop
   ```
3. **Frontend Next.js**
   ```bash
   cd frontend
   npm run dev
   ```
4. **Tunnel Ngrok**
   ```bash
   ngrok start --all
   ```

### Dipendenze Principali
**Frontend:**
- `framer-motion`: Animazioni complesse
- `aos`: Animazioni On Scroll
- `react-google-recaptcha`: Validazione form
- `lucide-react`+`react-icons`: Set icone
- `axios`: Fetch dati da Strapi
- `nodemailer`: Gestione invio delle email
**Backend:**
- `pg`: Connessione PostgreSQL




## Roadmap & TODO
**Ottimizzazione SEO**
1. **VPS**
- `Hetzner`: 2vCPU - 4GB Ram - 40GB SSD - 20TB - AMD
2. **Dominio**
    - `Aruba`: dominio .it con mail associata
    b. SSL (Let's Encrypt)
3. **Backup**
    a. Automazione backup giornalieri
    b. Replica database su HDD privato

# Licenza
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contatti:
Alessandro Paolantonio  - [alexpaolantonio@gmail.com](mailto:alexpaolantonio@gmail.com) -  [+39 327 4309080](tel:+393274309080)

Project Link: [https://github.com/AlePaolant/ZMPGroup-V2](https://github.com/AlePaolant/ZMPGroup-V2)