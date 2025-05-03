'use client'

import { useState } from 'react'
import MultiRangeSlider from 'multi-range-slider-react'

const tipiAuto = ['Berlina', 'Coupè', 'Station wagon', 'Hatchback', 'SUV', 'Crossover', 'Sportiva', 'Cabrio', 'Pick-up', 'Utilitaria']
const alimentazioni = ['Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Mild Hybrid', 'Full Hybrid', 'Ibrida plug in']

export default function WizardRichiestaAuto() {
    const [step, setStep] = useState(0)
    const [isUsed, setIsUsed] = useState(false)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [annoDa, setAnnoDa] = useState(2015)
    const [annoA, setAnnoA] = useState(2024)
    const [kmDa, setKmDa] = useState(0)
    const [kmA, setKmA] = useState(150000)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleCondizione = (value: string) => {
        setIsUsed(value === 'Usata')
        setFormData((prev: any) => ({ ...prev, condizione: value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        setSuccess(false)
        const res = await fetch('/api/richiesta-auto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        setLoading(false)
        if (res.ok) {
            setSuccess(true)
        } else {
            alert("Errore durante l'invio del modulo")
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto mt-10 px-6 sm:px-12 md:px-20 text-white space-y-8 transition-all duration-500 ease-in-out">
            {step > 0 && (
                <div className="flex justify-between text-sm text-gray-400">
                    {['Inizio', 'Dettagli auto', 'Dati personali', 'Riepilogo'].map((label, index) => (
                        <div key={index} className={`flex-1 text-center font-semibold ${step === index ? 'text-violet-400' : ''}`}>
                            {label}
                        </div>
                    ))}
                </div>
            )}

            {step === 0 && (
                <div className="text-center space-y-6 animate-fade-in">
                    <h2 className="text-4xl font-bold">Richiedi la tua auto</h2>
                    <p className="text-gray-300">Compila il modulo in pochi passaggi per ricevere un preventivo personalizzato.</p>
                    <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded transition">
                        Inizia
                    </button>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-violet-400">Dettagli Auto</h3>

                    <div>
                        <label className="block mb-1">Tipo di auto</label>
                        <select name="tipoAuto" onChange={handleChange} required className="w-full bg-zinc-800 p-2 rounded">
                            {tipiAuto.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="marca" onChange={handleChange} required placeholder="Marca" className="bg-zinc-800 p-2 rounded w-full" />
                        <input name="modello" onChange={handleChange} required placeholder="Modello" className="bg-zinc-800 p-2 rounded w-full" />
                    </div>

                    <div>
                        <label className="block mb-1">Alimentazione</label>
                        <select name="alimentazione" onChange={handleChange} required className="w-full bg-zinc-800 p-2 rounded">
                            {alimentazioni.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Anno</label>
                        <MultiRangeSlider
                            min={1990}
                            max={2025}
                            step={1}
                            minValue={annoDa}
                            maxValue={annoA}
                            onInput={(e) => {
                                setAnnoDa(e.minValue);
                                setAnnoA(e.maxValue);
                            }}
                            label={false}
                            ruler={false}
                            canMinMaxValueSame={true}
                            style={{ border: "none", boxShadow: "none" }}
                            barInnerColor="#7c3aed"
                            thumbLeftColor="#7c3aed"
                            thumbRightColor="#7c3aed"
                        />
                    </div>

                    <div className="flex gap-6 mt-4">
                        <div className="inline-flex rounded-full bg-gray-100 p-1">
                            <label className="relative cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-600 hover:bg-gray-200 peer-checked:bg-white peer-checked:shadow peer-checked:text-black flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="condizione"
                                    value="Nuova"
                                    onChange={() => handleCondizione('Nuova')}
                                    className="sr-only peer"
                                />
                                <span className="w-2 h-2 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
                                Nuova
                            </label>
                            <label className="relative cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all text-gray-600 hover:bg-gray-200 peer-checked:bg-white peer-checked:shadow peer-checked:text-black flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="condizione"
                                    value="Usata"
                                    onChange={() => handleCondizione('Usata')}
                                    className="sr-only peer"
                                />
                                <span className="w-2 h-2 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
                                Usata
                            </label>
                        </div>
                    </div>

                    {isUsed && (
                        <div>
                            <label className="block mb-1">Seleziona il range di chilometraggio:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: '0 - 20.000 km', value: '0-20000' },
                                    { label: '20.000 - 60.000 km', value: '20000-60000' },
                                    { label: '60.000 - 100.000 km', value: '60000-100000' },
                                    { label: '100.000 - 200.000 km', value: '100000-200000' },
                                ].map(({ label, value }) => {
                                    const isSelected = kmDa === Number(value.split('-')[0]) && kmA === Number(value.split('-')[1]);
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`px-3 py-2 rounded cursor-pointer transition-colors duration-200 ${isSelected
                                                ? 'bg-violet-900 text-white'
                                                : 'bg-zinc-800 hover:bg-zinc-700'
                                                }`}
                                            onClick={() => {
                                                const [min, max] = value.split('-').map(Number);
                                                setKmDa(min);
                                                setKmA(max);
                                            }}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button onClick={prevStep} className="text-sm underline">Indietro</button>
                        <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded">Avanti</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-violet-400">Dati personali</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="nome" onChange={handleChange} placeholder="Nome" required className="bg-zinc-800 p-2 rounded w-full" />
                        <input name="cognome" onChange={handleChange} placeholder="Cognome" required className="bg-zinc-800 p-2 rounded w-full" />
                        <input name="telefono" onChange={handleChange} placeholder="Telefono" required className="bg-zinc-800 p-2 rounded w-full" />
                        <input name="email" type="email" onChange={handleChange} placeholder="Email" required className="bg-zinc-800 p-2 rounded w-full" />
                    </div>

                    <textarea name="descrizione" onChange={handleChange} placeholder="Descrizione aggiuntiva" rows={4} className="w-full bg-zinc-800 p-2 rounded"></textarea>

                    <div className="flex justify-between">
                        <button onClick={prevStep} className="text-sm underline">Indietro</button>
                        <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded">Avanti</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-violet-400">Conferma i tuoi dati</h3>

                    <div className="text-sm space-y-1 text-gray-300">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}><strong>{key}</strong>: {value}</div>
                        ))}
                        <div><strong>Anno:</strong> {annoDa} - {annoA}</div>
                        {isUsed && <div><strong>Km:</strong> {kmDa} - {kmA}</div>}
                    </div>

                    <div className="flex justify-between items-center">
                        <button onClick={prevStep} className="text-sm underline">Indietro</button>
                        <button onClick={handleSubmit} disabled={loading} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded">
                            {loading ? 'Invio in corso...' : 'Invia richiesta'}
                        </button>
                    </div>

                    {success && (
                        <p className="text-green-400 mt-4 font-semibold">
                            ✅ La tua richiesta è stata inviata con successo!
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}