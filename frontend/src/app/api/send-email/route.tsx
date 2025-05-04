import nodemailer from 'nodemailer';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        console.log("Inizio elaborazione richiesta...", req.headers.get("content-type"));
        const data = await req.json();
        console.log("Dati ricevuti:", data);

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

        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        console.log("🔹 Risposta reCAPTCHA:", recaptchaResponse.data);

        if (!recaptchaResponse.data.success) {
            return new Response(JSON.stringify({ error: "Captcha non valido" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        let subject = "";
        let body = "";
        let userSubject = "";
        let userBody = "";

        switch (moduloType) {
            case "preventivo":
                subject = "Nuova richiesta di preventivo!";
                body = `
          <h3>Hai ricevuto una <strong>richiesta di preventivo!</strong></h3>
          <p>dal modulo <strong> "Hai bisogno di un preventivo?" </strong> del tuo sito.</p>
          <ul>
            <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📞 Telefono:</strong> ${telefono}</li>
            <li><strong>📍 Luogo dell'intervento:</strong> ${indirizzo}, ${comune}, ${provincia}</li>
            <li><strong>📝 Descrizione dell'intervento:</strong> ${descrizione}</li>
          </ul>
          <p>Questa email è stata inviata automaticamente dal sito <a href="https://www.zmpgroup.it/edilizia">zmpgroup.it/edilizia</a></p>
        `;
                userSubject = "Abbiamo ricevuto la tua richiesta di preventivo";
                userBody = `
          <p>Ciao ${nome},</p>
          <p>grazie per aver inviato una richiesta di preventivo sul nostro sito <a href="https://www.zmpgroup.it/edilizia">zmpgroup.it/edilizia</a> .</p>
          <p><strong>📌 Ecco un riepilogo dei dati inviati:</strong></p>
          <ul>
            <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📞 Telefono:</strong> ${telefono}</li>
            <li><strong>📍 Luogo dell'intervento:</strong> ${indirizzo}, ${comune}, ${provincia}</li>
            <li><strong>📝 Descrizione:</strong> ${descrizione}</li>
          </ul>
          <p>Ti ricontatteremo il prima possibile!</p>
           <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/edilizia">www.zmpgroup.it/edilizia</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `;
                break;

            case "collaborazione":
                subject = "Nuova richiesta di collaborazione!";
                body = `
          <h3>Hai ricevuto una richiesta di collaborazione!</h3>
          <p>dal modulo <strong> "Sei un professionista e vuoi collaborare con noi?" </strong> del tuo sito.</p>
          <ul>
            <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📞 Telefono:</strong> ${telefono}</li>
            <li><strong>🎂 Data di nascita:</strong> ${data_nascita} (${comune_nascita})</li>
            <li><strong>👨‍💼 Professione:</strong> ${professione}</li>
            <li><strong>📝 Descrizione:</strong> ${descrizione}</li>
          </ul>
         <p>Questa email è stata inviata automaticamente dal sito <a href="https://www.zmpgroup.it/edilizia">zmpgroup.it/edilizia</a></p>
        `;
                userSubject = "Conferma ricezione richiesta di collaborazione";
                userBody = `
          <p>Ciao ${nome},</p>
          <p>questa è una risposta generata automaticamente dal sito <a href="www.zmpgroup.it/edilizia">www.zmpgroup.it/edilizia</a> .</p>
          <p>Grazie per la tua disponibilità a collaborare con noi!</p>
          <p><strong>📌 Ecco un riepilogo dei dati inviati:</strong></p>
          <ul>
            <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📞 Telefono:</strong> ${telefono}</li>
            <li><strong>🎂 Data di nascita:</strong> ${data_nascita} (${comune_nascita})</li>
            <li><strong>👨‍💼 Professione:</strong> ${professione}</li>
            <li><strong>📝 Descrizione:</strong> ${descrizione}</li>
          </ul>
          <p>Ti ricontatteremo il prima possibile!</p>
           <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/edilizia">www.zmpgroup.it/edilizia</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `;
                break;

            case "settoreEdile":
                subject = "Nuova richiesta di lavoro!";
                body = `
          <h3>Hai ricevuto una richiesta di lavoro!</h3>
          <p>dal modulo <strong> "Cerchi lavoro nel settore edile?" </strong> del tuo sito.</p>
          <ul>
            <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📞 Telefono:</strong> ${telefono}</li>
            <li><strong>🎂 Data di nascita:</strong> ${data_nascita} (${comune_nascita})</li>
            <li><strong>🏗️ Mansione:</strong> ${mansione}</li>
            <li><strong>📝 Descrizione delle attività svolte:</strong> ${descrizione}</li>
          </ul>
          <p>Questa email è stata inviata automaticamente dal sito <a href="https://www.zmpgroup.it/edilizia">zmpgroup.it/edilizia</a></p>
        `;
                userSubject = "Abbiamo ricevuto la tua candidatura nel settore edile";
                userBody = `
          <p>Ciao ${nome},</p>
          <p>grazie per esserti candidato per collaborare con noi nel settore edile.</p>
          <p>Ti contatteremo appena possibile dopo aver visionato la tua richiesta.</p>
          <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/edilizia">www.zmpgroup.it/edilizia</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `;
                break;

            default:
                return new Response(JSON.stringify({ error: "Tipo di modulo non valido" }), { status: 400 });
        }

        // Email all’amministratore
        const adminMessage = {
            from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject,
            text: "Questa è una versione di fallback in testo.",
            html: body,
        };

        // Email di conferma all’utente
        const userMessage = {
            from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: userSubject,
            text: "Abbiamo ricevuto la tua richiesta.",
            html: userBody,
        };

        console.log("📤 Invio email a ZMPCars e utente...");
        await transporter.sendMail(adminMessage);
        await transporter.sendMail(userMessage);
        console.log("✅ Email inviate con successo");

        return new Response(JSON.stringify({ message: "Email inviata con successo!" }), { status: 200 });

    } catch (error) {
        console.error("Errore invio email:", error);
        return new Response(JSON.stringify({ error: "Errore nell'invio della email" }), { status: 500 });
    }
}