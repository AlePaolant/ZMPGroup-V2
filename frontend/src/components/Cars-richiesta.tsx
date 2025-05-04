'use client'

import { useState } from 'react'
import MultiRangeSlider from 'multi-range-slider-react'
import ReCAPTCHA from 'react-google-recaptcha'

const tipiAuto = ['Seleziona il tipo di auto ...', 'Berlina', 'Coupè', 'Station wagon', 'Hatchback', 'SUV', 'Crossover', 'Sportiva', 'Cabrio', 'Pick-up', 'Utilitaria']
const alimentazioni = ['Seleziona il tipo di alimentazione ...', 'Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Mild Hybrid', 'Full Hybrid', 'Ibrida plug in']

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
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCondizione = (value: string) => {
        setIsUsed(value === 'Usata')
        setFormData(prev => ({ ...prev, condizione: value }))
    }

    const handleSubmit = async () => {
        if (!captchaToken) {
            alert("Completa il reCAPTCHA prima di inviare")
            return
        }

        if (
            formData.tipoAuto === tipiAuto[0] ||
            formData.alimentazione === alimentazioni[0]
        ) {
            alert("Seleziona un tipo di auto e un'alimentazione validi.")
            return
        }

        setLoading(true)
        setSuccess(false)

        const res = await fetch('/api/richiesta-auto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                token: captchaToken,
                annoDa,
                annoA,
                kmMax: isUsed ? kmA : undefined
            }),
        })

        setLoading(false)

        if (res.ok) {
            setSuccess(true)
        } else {
            alert("Errore durante l'invio della richiesta.")
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-20 px-6 py-8 bg-[#1a1933] text-white rounded-xl shadow-md space-y-8">
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
                <div className="text-center space-y-6">
                    <h2 className="text-4xl font-bold">Richiedi la tua nuova auto</h2>
                    <p className="text-gray-300">Compila il modulo in pochi passaggi per ricevere un preventivo personalizzato.</p>
                    <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded">
                        Inizia
                    </button>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-violet-400">Dettagli Auto</h3>

                    <select name="tipoAuto" onChange={handleChange} className="w-full bg-zinc-800 p-2 rounded">
                        {tipiAuto.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="marca" onChange={handleChange} placeholder="Marca" className="bg-zinc-800 p-2 rounded" />
                        <input name="modello" onChange={handleChange} placeholder="Modello" className="bg-zinc-800 p-2 rounded" />
                    </div>

                    <select name="alimentazione" onChange={handleChange} className="w-full bg-zinc-800 p-2 rounded">
                        {alimentazioni.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>

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
                            {/* Nuova */}
                            <div>
                                <input
                                    type="radio"
                                    name="condizione"
                                    value="Nuova"
                                    defaultChecked
                                    onChange={() => handleCondizione('Nuova')}
                                    id="nuova"
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor="nuova"
                                    className="cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                 text-gray-600 hover:bg-gray-200
                 peer-checked:bg-violet-600 peer-checked:text-white peer-checked:hover:bg-violet-600
                 flex items-center"
                                >
                                    Nuova
                                </label>
                            </div>

                            {/* Usata */}
                            <div>
                                <input
                                    type="radio"
                                    name="condizione"
                                    value="Usata"
                                    onChange={() => handleCondizione('Usata')}
                                    id="usata"
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor="usata"
                                    className="cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                 text-gray-600 hover:bg-gray-200
                 peer-checked:bg-violet-600 peer-checked:text-white peer-checked:hover:bg-violet-600
                 flex items-center"
                                >
                                    Usata
                                </label>
                            </div>
                        </div>
                    </div>

                    {isUsed && (
                        <div>
                            <label className="block mb-1">Chilometraggio</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: '0 - 20.000 km', value: '0-20000' },
                                    { label: '20.000 - 60.000 km', value: '20000-60000' },
                                    { label: '60.000 - 100.000 km', value: '60000-100000' },
                                    { label: '100.000 - 200.000 km', value: '100000-200000' },
                                ].map(({ label, value }) => {
                                    const [min, max] = value.split('-').map(Number);
                                    const isSelected = kmDa === min && kmA === max;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`px-3 py-2 rounded ${isSelected ? 'bg-violet-900 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                                            onClick={() => {
                                                setKmDa(min);
                                                setKmA(max);
                                            }}
                                        >
                                            {label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button onClick={prevStep} className="text-sm underline text-violet-300">Indietro</button>
                        <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded">Avanti</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-violet-400">Dati personali</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="nome" onChange={handleChange} placeholder="Nome" className="bg-zinc-800 p-2 rounded" />
                        <input name="cognome" onChange={handleChange} placeholder="Cognome" className="bg-zinc-800 p-2 rounded" />
                        <input name="telefono" onChange={handleChange} placeholder="Telefono" className="bg-zinc-800 p-2 rounded" />
                        <input name="email" type="email" onChange={handleChange} placeholder="Email" className="bg-zinc-800 p-2 rounded" />
                    </div>

                    <textarea name="descrizione" onChange={handleChange} placeholder="Descrizione aggiuntiva" rows={4} className="w-full bg-zinc-800 p-2 rounded"></textarea>

                    <div className="flex justify-between">
                        <button onClick={prevStep} className="text-sm underline text-violet-300">Indietro</button>
                        <button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded">Avanti</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-violet-400">Conferma i tuoi dati</h3>

                    <div className="text-sm space-y-1 text-gray-300">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}><strong>{key}</strong>: {value}</div>
                        ))}
                        <div><strong>Anno:</strong> {annoDa} - {annoA}</div>
                        {isUsed && <div><strong>Km:</strong> {kmDa} - {kmA}</div>}
                    </div>

                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={token => setCaptchaToken(token)}
                    />

                    <div className="flex justify-between items-center">
                        <button onClick={prevStep} className="text-sm underline text-violet-300">Indietro</button>
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