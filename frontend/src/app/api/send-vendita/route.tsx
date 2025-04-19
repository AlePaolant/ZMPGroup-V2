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
    // 1. Parsing del FormData
    const formData = await req.formData();
    console.log("FormData parsato correttamente");

    // 2. Estrazione campi
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

    // 3. Verifica reCAPTCHA
    if (!fields.recaptchaToken) {
      console.error("Token reCAPTCHA mancante");
      return NextResponse.json(
        { error: "Token reCAPTCHA mancante" },
        { status: 400 }
      );
    }

    console.log("Verifica reCAPTCHA in corso...");
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
      return NextResponse.json(
        { error: "Verifica reCAPTCHA fallita" },
        { status: 400 }
      );
    }
    console.log("reCAPTCHA verificato con successo");

    // 4. Gestione allegati
    const immagini = formData.getAll('immagini').filter((item): item is File => item instanceof File);
    console.log(`Trovati ${immagini.length} file allegati`);

    const attachments = await Promise.all(
      immagini.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        console.log(`Elaborato file: ${file.name} (${buffer.length} bytes)`);
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // 5. Configurazione Nodemailer
    console.log("Configurazione trasportatore email...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alexpaolantonio@gmail.com",
        pass: "qdeihcivkyojwnzj",
      },
    });

    // 6. Invio email
    console.log("Preparazione email...");
    const mailOptions = {
      from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
      to: 'apaolan02@gmail.com',
      subject: 'Nuova richiesta di vendita auto',
      text: `
        Nome: ${fields.nome}
        Cognome: ${fields.cognome}
        Email: ${fields.email}
        Telefono: ${fields.telefono}
        Targa: ${fields.targa}
        Descrizione: ${fields.descrizione}
      `,
      attachments,
    };

    console.log("Invio email in corso...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email inviata con successo:", info.messageId);

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