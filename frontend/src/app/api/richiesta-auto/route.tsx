import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
        service: 'gmail', // SMTP personalizzato
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Nuova richiesta auto dal sito',
        text: `
Nuova richiesta auto ricevuta:

Tipo: ${data.tipoAuto}
Marca: ${data.marca}
Modello: ${data.modello}
Alimentazione: ${data.alimentazione}
Anno: da ${data.annoDa || '-'} a ${data.annoA || '-'}
Condizione: ${data.condizione}
Chilometraggio max: ${data.kmMax || '-'}

Nome: ${data.nome} ${data.cognome}
Telefono: ${data.telefono}
Email: ${data.email}

Descrizione:
${data.descrizione || 'Nessuna'}
`
    }

    try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Errore invio email:', error)
        return new NextResponse('Errore invio email', { status: 500 })
    }
}