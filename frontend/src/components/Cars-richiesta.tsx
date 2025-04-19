'use client'

import { useState } from 'react'

const tipiAuto = [
  'Berlina', 'Coupè', 'Station wagon', 'Hatchback', 'SUV',
  'Crossover', 'Sportiva', 'Cabrio', 'Pick-up', 'Utilitaria'
]

const alimentazioni = [
  'Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica',
  'Mild Hybrid', 'Full Hybrid', 'Ibrida plug in'
]

export default function CarsRichiesta() {
  const [isUsed, setIsUsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    const res = await fetch('/api/richiesta-auto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      form.reset()
    } else {
      alert('Errore durante l\'invio del modulo')
    }
  }

  return (
    <form id='compra' onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-zinc-900 p-6 rounded-2xl shadow-md text-white">
      <h2 className="text-2xl font-bold">Richiesta auto</h2>

      <div>
        <label className="block mb-1">Tipo di auto</label>
        <select name="tipoAuto" required className="w-full bg-zinc-800 p-2 rounded">
          {tipiAuto.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Marca</label>
          <input type="text" name="marca" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Modello</label>
          <input type="text" name="modello" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
      </div>

      <div>
        <label className="block mb-1">Alimentazione</label>
        <select name="alimentazione" required className="w-full bg-zinc-800 p-2 rounded">
          {alimentazioni.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Anno da</label>
          <input type="number" name="annoDa" min={1990} max={new Date().getFullYear()} className="w-full bg-zinc-800 p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Anno a</label>
          <input type="number" name="annoA" min={1990} max={new Date().getFullYear()} className="w-full bg-zinc-800 p-2 rounded" />
        </div>
      </div>

      <div>
        <label className="block mb-2">Tipo veicolo</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="condizione" value="Nuova" onChange={() => setIsUsed(false)} required />
            Nuova
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="condizione" value="Usata" onChange={() => setIsUsed(true)} />
            Usata
          </label>
        </div>
      </div>

      {isUsed && (
        <div>
          <label className="block mb-1">Chilometraggio massimo</label>
          <input type="number" name="kmMax" className="w-full bg-zinc-800 p-2 rounded" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input type="text" name="nome" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Cognome</label>
          <input type="text" name="cognome" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Telefono</label>
          <input type="tel" name="telefono" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" required className="w-full bg-zinc-800 p-2 rounded" />
        </div>
      </div>

      <div>
        <label className="block mb-1">Descrizione aggiuntiva</label>
        <textarea name="descrizione" rows={4} className="w-full bg-zinc-800 p-2 rounded"></textarea>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">
        {loading ? 'Invio in corso...' : 'Invia richiesta'}
      </button>

      {success && <p className="text-green-400">Richiesta inviata con successo!</p>}
    </form>
  )
}