import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import axios from 'axios'

export async function POST(req: Request) {
    const data = await req.json()
    const {
        token, nome, cognome, telefono, email,
        tipoAuto, marca, modello, alimentazione,
        annoDa, annoA, condizione, kmMax, descrizione
    } = data

    if (!token) {
        return new NextResponse("reCAPTCHA non valido", { status: 400 })
    }

    // ✅ Verifica del token reCAPTCHA con Google
    try {
        const { data: googleRes } = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token
                }
            }
        )

        if (!googleRes.success || googleRes.score < 0.5) {
            return new NextResponse("Verifica reCAPTCHA fallita", { status: 400 })
        }
    } catch (err) {
        console.error("Errore durante verifica reCAPTCHA", err)
        return new NextResponse("Errore verifica reCAPTCHA", { status: 500 })
    }

    // ✅ Setup mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailToAdmin = {
        from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: 'Nuova richiesta auto dal sito',
        html: `
            <h3>Hai ricevuto una <strong>richiesta di auto!</strong></h3>
            <p>dal modulo <strong> "Richiedi la tua nuova auto" </strong> del tuo sito.</p>
            <p><strong>📌 Dati inviati:</strong></p>
            <ul>
                <li><strong>Tipologia di auto:</strong> ${tipoAuto}</li>
                <li><strong>Marca:</strong> ${marca}</li>
                <li><strong>Modello:</strong> ${modello}</li>
                <li><strong>Alimentazione:</strong> ${alimentazione}</li>
                <li><strong>Anno:</strong> da ${annoDa || '-'} a ${annoA || '-'}</li>
                <li><strong>Condizione:</strong> ${condizione}</li>
                <li><strong>Km max:</strong> ${kmMax || '-'}</li>
            </ul>
            <p><strong>📝 Descrizione:</strong><br>${descrizione || 'Nessuna'}</p>
            <div style="height: 12px; line-height: 12px; font-size: 12px;">&nbsp;</div>
            <ul>
                <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
                <li><strong>📞 Telefono:</strong> ${telefono}</li>
                <li><strong>✉️ Email:</strong> ${email}</li>
            </ul>
            <p>Ricordati di rispondere 😃</p>
            <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `
    }

    const mailToUser = {
        from: `"ZMPCars" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Conferma della tua richiesta auto',
        html: `
            <h2>Ciao ${nome},</h2>
            <p>📌 Grazie di aver compilato il modulo sul sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a>! Ti inviamo un riepilogo della tua richiesta:</p>
            <ul>
                <li><strong>Tipologia di auto:</strong> ${tipoAuto}</li>
                <li><strong>Marca:</strong> ${marca}</li>
                <li><strong>Modello:</strong> ${modello}</li>
                <li><strong>Alimentazione:</strong> ${alimentazione}</li>
                <li><strong>Anno:</strong> da ${annoDa || '-'} a ${annoA || '-'}</li>
                <li><strong>Condizione:</strong> ${condizione}</li>
                <li><strong>Km max:</strong> ${kmMax || '-'}</li>
            </ul>
            <p><strong>📝 Descrizione:</strong><br>${descrizione || 'Nessuna'}</p>
            <div style="height: 12px; line-height: 12px; font-size: 12px;">&nbsp;</div>
            <ul>
                <li><strong>👤 Nome:</strong> ${nome} ${cognome}</li>
                <li><strong>📞 Telefono:</strong> ${telefono}</li>
                <li><strong>✉️ Email:</strong> ${email}</li>
            </ul>
            <p>Ti contatteremo il prima possibile.</p>
            <p>Il team di ZMPCars</p>
            <div style="height: 24px; line-height: 24px; font-size: 24px;">&nbsp;</div>
            <p>Questa email è stata inviata automaticamente dal sito <a href="www.zmpgroup.it/cars">www.zmpgroup.it/cars</a></p>
            <p><img src="https://www.soulvolks.it/img/logo-footer.png" alt="Logo Soul Volks prova" width="100" /></p>
        `
    }

    try {
        await transporter.sendMail(mailToAdmin)
        await transporter.sendMail(mailToUser)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Errore invio email:', error)
        return new NextResponse('Errore invio email', { status: 500 })
    }
}