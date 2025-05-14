'use client';

import { useState, ChangeEvent, FormEvent, DragEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { X, Upload, ArrowRight } from 'lucide-react';

export default function VendiForm() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        targa: '',
        descrizione: '',
    });

    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [fileError, setFileError] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateFiles = (fileList: File[]) => {
        if (files.length + fileList.length > 6) {
            setFileError('Puoi caricare massimo 6 immagini');
            return false;
        }

        for (const file of fileList) {
            if (file.type !== "image/jpeg") {
                setFileError('Solo file JPG/JPEG sono accettati');
                return false;
            }
            if (file.size > 2 * 1024 * 1024) {
                setFileError('Ogni file deve essere minore di 2MB');
                return false;
            }
        }

        setFileError('');
        return true;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        if (validateFiles(selected)) {
            setFiles(prev => [...prev, ...selected]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setFileError('');
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (validateFiles(droppedFiles)) {
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (files.length === 0) {
            setFileError('Devi caricare almeno una foto');
            return;
        }

        if (files.length > 6) {
            setFileError('Puoi caricare massimo 6 immagini');
            return;
        }

        if (!recaptchaToken) {
            alert("Per favore completa il reCAPTCHA!");
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        files.forEach(file => data.append('immagini', file));
        data.append('recaptchaToken', recaptchaToken);

        try {
            const res = await fetch('/api/send-vendita', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Errore dal backend:", result);
                throw new Error(result.error || "Errore nell'invio");
            }

            alert("Richiesta inviata con successo!");
            setFiles([]);
            setRecaptchaToken('');
            setFormData({
                nome: '',
                cognome: '',
                email: '',
                telefono: '',
                targa: '',
                descrizione: '',
            });
        } catch (error) {
            console.error("Errore catchato:", error);
            alert("Si è verificato un errore. Per favore riprova più tardi.");
        }
    };

    return (
        <div id='vendi' className="h-auto bg-gray-300 text-black">
            {/* Sezione iniziale */}
            <div className={`bg-gray-300 text-black py-40 px-4 text-center transition-all duration-500 ease-in-out ${showForm ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Vendi la tua auto con noi</h1>
                    <p className="text-xl mb-8">
                        Ottieni una valutazione immediata e un&apos;offerta competitiva per la tua auto usata.
                        Il processo è veloce, trasparente e senza impegno.
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        Inizia la valutazione
                    </button>
                </div>
            </div>

            {/* Sezione con form e card */}
            <div className={`transition-all duration-700 ease-in-out ${showForm ? 'opacity-100 -translate-y-60' : 'opacity-0 -translate-y-10 h-0 overflow-hidden'}`}>
                <div className="max-w-7xl mx-auto px-4 py-12">

                    {/* Mobile - Impilato */}
                    <div className="lg:hidden flex flex-col gap-6">
                        <div className="bg-transparent">
                            <button
                                onClick={() => setShowForm(false)}
                                className="mb-4 flex items-center text-violet-800 hover:text-violet-900 transition-colors"
                            >
                                <ArrowRight className="rotate-180 mr-1" size={18} />
                                Torna indietro
                            </button>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-red-900/90 border border-red-500/30 text-red-100 shadow-lg shadow-gray-500">
                                    <h3 className="font-semibold text-sm mb-1">REQUISITI FOTO</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Max 6 foto (2MB l&apos;una, solo JPG)</li>
                                    </ul>
                                </div>

                                <div className="p-4 rounded-lg bg-yellow-700/90 border border-yellow-500/20 text-yellow-100 shadow-lg shadow-gray-500">
                                    <h3 className="font-semibold text-sm mb-1">PROCESSO</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Valutazione veloce via email entro 48h</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl shadow-lg bg-gray-900 text-white rounded-xl shadow-gray-700">
                            <FormContent
                                {...{ formData, handleInputChange, files, handleRemoveFile, dragActive, handleDragOver, handleDragLeave, handleDrop, handleFileChange, fileError, recaptchaToken, setRecaptchaToken, handleSubmit }}
                            />
                        </div>
                    </div>

                    {/* Desktop - Affiancato */}
                    <div className="hidden lg:flex gap-8">
                        {/* Card sinistra - trasparente */}
                        <div className="w-[45%] bg-transparent text-white">
                            <button
                                onClick={() => setShowForm(false)}
                                className="mb-6 flex items-center text-violet-600 hover:text-violet-900 transition-colors cursor-pointer"
                            >
                                <ArrowRight className="rotate-180 mr-1" size={18} />
                                Torna indietro
                            </button>

                            <div className="space-y-6">
                                <div className="p-4 rounded-lg bg-red-900/90 border border-red-500/30 text-red-100 shadow-lg shadow-gray-500">
                                    <h3 className="font-semibold text-sm mb-1">REQUISITI FOTO</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• Massimo 6 foto</li>
                                        <li>• 2MB per foto</li>
                                        <li>• Solo JPG</li>
                                    </ul>
                                </div>

                                <div className="p-4 rounded-lg bg-yellow-700/90 border border-yellow-500/20 text-yellow-100 shadow-lg shadow-gray-500">
                                    <h3 className="font-semibold text-sm mb-1">PROCESSO</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• Valutazione veloce via email</li>
                                        <li>• Entro 48 ore</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Form - con card bianca */}
                        <div className="w-[55%] bg-gray-900 text-white p-8 rounded-xl shadow-2xl shadow-gray-700">
                            <FormContent
                                {...{ formData, handleInputChange, files, handleRemoveFile, dragActive, handleDragOver, handleDragLeave, handleDrop, handleFileChange, fileError, recaptchaToken, setRecaptchaToken, handleSubmit }}
                            />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

// Componente separato per il contenuto del form
interface FormContentProps {
    formData: {
      nome: string;
      cognome: string;
      email: string;
      telefono: string;
      targa: string;
      descrizione: string;
    };
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    files: File[];
    handleRemoveFile: (index: number) => void;
    dragActive: boolean;
    handleDragOver: (e: DragEvent<HTMLLabelElement>) => void;
    handleDragLeave: () => void;
    handleDrop: (e: DragEvent<HTMLLabelElement>) => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    fileError: string;
    recaptchaToken: string | null;
    setRecaptchaToken: (token: string | null) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  }

function FormContent({
    formData,
    handleInputChange,
    files,
    handleRemoveFile,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    fileError,
    recaptchaToken,
    setRecaptchaToken,
    handleSubmit
}: FormContentProps) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-violet-300 mb-1">Nome*</label>
                    <input
                        name="nome"
                        required
                        className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder:text-gray-400"
                        onChange={handleInputChange}
                        value={formData.nome}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-violet-300 mb-1">Cognome*</label>
                    <input
                        name="cognome"
                        required
                        className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder:text-gray-400"
                        onChange={handleInputChange}
                        value={formData.cognome}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-violet-300 mb-1">Email*</label>
                <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder:text-gray-400"
                    onChange={handleInputChange}
                    value={formData.email}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-violet-300 mb-1">Telefono*</label>
                <input
                    name="telefono"
                    required
                    className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder:text-gray-400"
                    onChange={handleInputChange}
                    value={formData.telefono}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-violet-300 mb-1">Targa*</label>
                <input
                    name="targa"
                    required
                    className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 uppercase placeholder:text-gray-400"
                    onChange={handleInputChange}
                    value={formData.targa}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-violet-300 mb-1">Descrizione*</label>
                <textarea
                    name="descrizione"
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-[#11131a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder:text-gray-400"
                    onChange={handleInputChange}
                    value={formData.descrizione}
                    placeholder="Descrivi la tua auto (modello, anno, chilometraggio, condizioni, optional, ecc.)"
                ></textarea>
            </div>

            <div>
                <label
                    className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 ${dragActive ? 'bg-violet-800 border-violet-400' : 'border-violet-600 hover:border-violet-400 bg-[#11131a]'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Upload className="w-10 h-10 mb-3 text-violet-400" />
                    <p className="text-sm text-violet-200 mb-1 text-center">
                        <span className="font-semibold text-violet-300">Clicca per caricare</span> o trascina le foto qui
                    </p>
                    <p className="text-xs text-violet-400 text-center">
                        Massimo 6 foto (2MB ciascuna, solo JPG)
                    </p>
                    <input
                        type="file"
                        accept="image/jpeg"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
                {fileError && (
                    <p className="mt-1 text-sm text-red-500">{fileError}</p>
                )}
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-violet-300">Foto caricate ({files.length}/6):</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {files.map((file: File, idx: number) => (
                            <div key={idx} className="relative group">
                                <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                                    <span className="text-xs text-violet-200 truncate px-2">{file.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(idx)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="pt-2">
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token: string | null) => setRecaptchaToken(token)}
                />
            </div>

            <button
                type="submit"
                disabled={!recaptchaToken || files.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${(!recaptchaToken || files.length === 0)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-violet-600 hover:bg-violet-700 hover:scale-[1.01] cursor-pointer'
                    }`}
            >
                Invia richiesta di valutazione
            </button>
        </form>
    );
}