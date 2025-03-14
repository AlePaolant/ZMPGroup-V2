import nodemailer from 'nodemailer';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        // Ricevi i dati dal corpo della richiesta
        console.log("📩 Richiesta ricevuta:", req.headers.get("content-type"));
        const data = await req.json();
        console.log("🔹 Dati ricevuti:", data);

        const {
            moduloType,
            nome,
            cognome,
            email,
            telefono,
            indirizzo,
            comune,
            provincia,
            professione,
            mansione,
            descrizione,
            data_nascita,
            comune_nascita,
            recaptchaToken,
        } = data;

        // 🔹 1. Verifica il reCAPTCHA
        const secretKey = "6LcgifMqAAAAAB5Q17G4L11MypHL1S3ZtXjS7I5n"; // Sostituisci con la tua Secret Key
        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: secretKey,
                    response: recaptchaToken,
                },
            }
        );

        console.log("🔹 Risposta reCAPTCHA:", recaptchaResponse.data);

        if (!recaptchaResponse.data.success) {
            return new Response(JSON.stringify({ error: "Captcha non valido" }), { status: 400 });
        }

        // 🔹 2. Configura il trasportatore con un'App Password di Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "alexpaolantonio@gmail.com", // Sostituisci con il tuo indirizzo email
                pass: "qdeihcivkyojwnzj",   // Usa una App Password, NON la tua password normale!
            },
        });

        // 🔹 3. Imposta l'oggetto e il corpo della mail
        let subject = "";
        let body = "";

        switch (moduloType) {
            case "preventivo":
                subject = "Nuova richiesta di preventivo!";
                body = `
                <h3>Hai ricevuto una <strong>richiesta di preventivo!</strong></h3>
                <p>dal modulo <strong> "Hai bisogno di un preventivo?" </strong> del tuo sito.</p>
                <p><strong>📌 Dati inviati:</strong></p>
                <ul>
                    <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
                    <li><strong>✉️ Email:</strong> ${email}</li>
                    <li><strong>📞 Telefono:</strong> ${telefono}</li>
                    <li><strong>📍 Luogo dell'intervento:</strong> ${indirizzo}, ${comune}, ${provincia}</li>
                    <li><strong>📝 Descrizione dell'intervento:</strong> ${descrizione}</li>
                </ul>
                <p><strong>Ricordati di rispondere 😃</strong></p>
                <p>Questa email è stata inviata automaticamente dal modulo contatti del sito <a href="www.zmpgroup.it">www.zmpgroup.it</a></p>
                <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
                `;
                break;

            case "collaborazione":
                subject = "Nuova richiesta di collaborazione!";
                body = `
                <h3>Hai ricevuto una richiesta di collaborazione!</h3>
                <p>dal modulo <strong> "Sei un professionista e vuoi collaborare con noi?" </strong> del tuo sito.</p>
                <p><strong>📌 Dati inviati:</strong></p>
                <ul>
                    <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
                    <li><strong>✉️ Email:</strong> ${email}</li>
                    <li><strong>📞 Telefono:</strong> ${telefono}</li>
                    <li><strong>🎂 Data di nascita:</strong> ${data_nascita} (${comune_nascita})</li>
                    <li><strong>👨‍💼 Professione:</strong> ${professione}</li>
                    <li><strong>📝 Descrizione:</strong> ${descrizione}</li>
                </ul>
                <p><strong>Ricordati di rispondere 😃</strong></p>
                <p>Questa email è stata inviata automaticamente dal modulo contatti del sito <a href="www.zmpgroup.it">www.zmpgroup.it</a></p>
                <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
                `;
                break;

            case "settoreEdile":
                subject = "Nuova richiesta di lavoro!";
                body = `
                <h3>Hai ricevuto una richiesta di lavoro!</h3>
                <p>dal modulo <strong> "Cerchi lavoro nel settore edile?" </strong> del tuo sito.</p>
                <p><strong>📌 Dati inviati:</strong></p>
                <ul>
                    <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
                    <li><strong>✉️ Email:</strong> ${email}</li>
                    <li><strong>📞 Telefono:</strong> ${telefono}</li>
                    <li><strong>🎂 Data di nascita:</strong> ${data_nascita} (${comune_nascita})</li>
                    <li><strong>🏗️ Mansione:</strong> ${mansione}</li>
                    <li><strong>📝 Descrizione delle attività svolte:</strong> ${descrizione}</li>
                </ul>
                <p><strong>Ricordati di rispondere 😃</strong></p>
                <p>Questa email è stata inviata automaticamente dal modulo contatti del sito <a href="www.zmpgroup.it">www.zmpgroup.it</a></p>
                <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
                `;
                break;

            default:
                return new Response(JSON.stringify({ error: "Tipo di modulo non valido" }), { status: 400 });
        }

        // 🔹 4. Crea e invia l'email
        const message = {
            from: "alexpaolantonio@gmail.com",
            to: "alexpaolantonio@gmail.com",
            subject: subject,
            text: "Questa è una versione di fallback in testo, poiché alcuni client potrebbero non supportare HTML.",
            html: body, 
        };

        console.log("🔹 Email in invio:", message);

        await transporter.sendMail(message);

        return new Response(JSON.stringify({ message: "Email inviata con successo!" }), { status: 200 });

    } catch (error) {
        console.error("Errore invio email:", error);
        return new Response(JSON.stringify({ error: "Errore nell'invio della email" }), { status: 500 });
    }
}