import nodemailer from 'nodemailer';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  console.log("Inizio elaborazione richiesta...");

  try {
    const formData = await req.formData();
    console.log("FormData parsato correttamente");

    const fields = {
      nome: formData.get('nome')?.toString() || '',
      cognome: formData.get('cognome')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      telefono: formData.get('telefono')?.toString() || '',
      targa: formData.get('targa')?.toString() || '',
      descrizione: formData.get('descrizione')?.toString() || '',
      recaptchaToken: formData.get('recaptchaToken')?.toString() || '',
    };

    console.log("Campi estratti:", JSON.stringify(fields, null, 2));

    // Verifica reCAPTCHA
    if (!fields.recaptchaToken) {
      console.error("Token reCAPTCHA mancante");
      return NextResponse.json({ error: "Token reCAPTCHA mancante" }, { status: 400 });
    }

    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: fields.recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      console.error("reCAPTCHA fallito:", recaptchaResponse.data);
      return NextResponse.json({ error: "Verifica reCAPTCHA fallita" }, { status: 400 });
    }

    // Gestione allegati
    const immagini = formData.getAll('immagini').filter((item): item is File => item instanceof File);
    console.log(`Trovati ${immagini.length} file allegati`);

    const attachments = await Promise.all(
      immagini.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Configurazione Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email a ZMPCars (interna)
    const mailOptionsAdmin = {
      from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Nuova richiesta di vendita auto',
      html: `
      <h3>Hai ricevuto una <strong>richiesta di vendita auto!</strong></h3>
            <p>dal modulo <strong> "Vendi la tua auto" </strong> del tuo sito.</p>
            <p><strong>📌 Dati inviati:</strong></p>
        <ul>
                <li><strong>👤 Nome:</strong> ${fields.nome} ${fields.cognome}</li>
                <li><strong>📞 Telefono:</strong> ${fields.telefono}</li>
                <li><strong>✉️ Email:</strong> ${fields.email}</li>
                <li><strong>🚘 Targa:</strong> ${fields.targa}</li>
        </ul>
        <p><strong>📝 Descrizione:</strong><br>${fields.descrizione || 'Nessuna'}</p>
        <p>📎 In allegato trovi le immagini.</p>
        <p>Ricordati di rispondere 😃</p>
            <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `,
      attachments,
    };

    await transporter.sendMail(mailOptionsAdmin);
    console.log("📤 Email inviata a ZMPCars");

    // Email di conferma all'utente
    const mailOptionsUser = {
      from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
      to: fields.email,
      subject: 'Abbiamo ricevuto la tua richiesta di vendita',
      html: `
      <h2>Ciao ${fields.nome},</h2>
        <p>📌 Grazie di aver inviato la richiesta di vendita della tua auto sul sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a>! Ti inviamo un riepilogo della tua richiesta:</p>
        <ul>
                <li><strong>👤 Nome:</strong> ${fields.nome} ${fields.cognome}</li>
                <li><strong>📞 Telefono:</strong> ${fields.telefono}</li>
                <li><strong>✉️ Email:</strong> ${fields.email}</li>
                <li><strong>🚘 Targa:</strong> ${fields.targa}</li>
        </ul>
        <p><strong>📝 Descrizione:</strong><br>${fields.descrizione || 'Nessuna'}</p>
        <p>📎 In allegato trovi le immagini. Ti contatteremo il prima possibile.</p>
        <p>Il team di ZMPCars</p>
        <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `,
      attachments,
    };

    await transporter.sendMail(mailOptionsUser);
    console.log("📤 Email di conferma inviata all'utente");

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("ERRORE CRITICO:", error);
    return NextResponse.json(
      {
        error: "Errore durante l'elaborazione della richiesta",
        details: error instanceof Error ? error.message : 'Errore sconosciuto'
      },
      { status: 500 }
    );
  }
}