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
    <a href="https:www.zmpgroup.it"><strong>Guarda il sito »</strong></a>
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
   git clone https://github.com/tuo-username/nome-repo.git
   cd nome-repo
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


## Configurazione VPS
**DEBIAN 12**   
sistema pre installato
1. **ACCESSO AL SERVER**
  ```bash
  ssh root@IP_DEL_SERVER
  ```
2. **CONFIGURAZIONE DI BASE (SICUREZZA)**
  - creazione di un utente normale:
  ```bash
  adduser alepaolant
  usermod -aG sudo alepaolant
  ```
  - copia la chiave SSH nel nuovo utente, in modo da connettermi come alepaolant via SSH, proprio come root
  ```bash
  rsync --archive --chown=alepaolant:alepaolant ~/.ssh /home/alepaolant
  ```
  - Disabilitare l'accesso root via SSH
  ```bash
  nano /etc/ssh/sshd_config
  PermitRootLogin no
  ```
  ```bash
  systemctl restart ssh
  ```
   **IMPORTANTE:** prima di disabilitare l'accesso prova ad entrare da un'altra finestra, per non rischiare di rimanere fuori
   ```bash
   ssh alepaolant@IP_DEL_SERVER
  ```
3. **AGGIORNAMENTO SISTEMA**
  e installazione utility base:
  ```bash
  apt update && apt upgrade -y
  ```
  ```bash
  apt install -y curl ufw htop fail2ban git unzip
  ```
4. **FIREWALL + SSHGUARD**
- UFW = Uncomplicated Firewall:
lascia aperta porta 22 per SSH, 80 per HTTP, 443 HTTPS
```bash
sudo apt install ufw -y
ufw allow OpenSSH
ufw allow http
ufw allow https
ufw enable
  ```
- SSHGUARD (contro brute force - tipo FAIL2BAN):
```bash
  ```
5. **INSTALLAZIONE STACK DI BASE**
- **nvm (node version manager)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc  # (o ~/.zshrc se usi Zsh)
  ```
- **Node.js 18+ (compatibile con Next.js 15 e Strapi 5)**
```bash
nvm install --lts #ultima versione di node, attualmente v22.15.0
  ```
- **PostgreSQL**
```bash
sudo apt install -y postgresql postgresql-contrib
  ```
AAAA. **NGINX** - **Conta che la directory ora è:**
```bash
cd /var/www/zmpgroup.it/
  ```



## Roadmap & TODO
**Ottimizzazione SEO**
**Privacy**
**Deployment**
1. **VPS**
- `Hetzner`: 2vCPU - 4GB Ram - 40GB SSD - 20TB - AMD
2. **Dominio**
    - `Aruba`: dominio .it con mail associata
    b. SSL (Let's Encrypt)
3. **Backup**
    a. Automazione backup giornalieri
    b. Replica database su cloud storage
4. **Firewall e Sicurezza**

## Licenza
Il codice è proprietario e di proprietà dell'azienda ZMP GROUP. 
È concesso in uso esclusivo per il progetto specificato.

## Contatti:
Alessandro Paolantonio  - [alexpaolantonio@gmail.com](mailto:alexpaolantonio@gmail.com) -  [+39 327 4309080](tel:+393274309080)

Project Link: [https://github.com/AlePaolant/ZMPGroup-V2](https://github.com/AlePaolant/ZMPGroup-V2)