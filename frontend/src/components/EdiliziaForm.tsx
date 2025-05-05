"use client";

import { useState, FormEvent } from "react";
import { FaRegClipboard, FaRegHandshake, FaToolbox, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { JSX } from "react";

// Oggetti per placeholder e regex
const fieldPlaceholders: { [key: string]: string } = {
  nome: "Nome",
  cognome: "Cognome",
  email: "Email",
  telefono: "Telefono",
  indirizzo: "Indirizzo",
  comune: "Comune",
  provincia: "Provincia (es. MI)",
  descrizione: "Descrizione",
  data_nascita: "Data di nascita (gg/mm/aaaa)",
  comune_nascita: "Comune di nascita",
  professione: "Professione",
  mansione: "Mansione",
};

const fieldPatterns: { [key: string]: string } = {
  email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  telefono: "^\\+?[1-9]\\d{1,14}$",
  data_nascita: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d{2}$",
  provincia: "^[A-Z]{2}$",
  nome: "^[a-zA-ZÀ-ÿ ]+$",
  cognome: "^[a-zA-ZÀ-ÿ ]+$",
};

interface ClickableDivProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: JSX.Element;
  active: boolean;
}

const ClickableDiv = ({ onClick, title, description, icon, active }: ClickableDivProps) => (
  <div
    onClick={onClick}
    className={`w-70 h-65 flex flex-col items-center justify-center rounded-3xl cursor-pointer ${active ? "bg-black text-yellow-300 shadow-none" : "bg-gray-200 shadow-xl"
      }`}
  >
    <div className="text-3xl">{icon}</div>
    <span className="font-bold text-center p-4">{title}</span>
    <span className="text-sm text-center">{description}</span>
  </div>
);

interface ModuloGenericoProps {
  moduloType: string;
  titolo: string;
  campi: string[];
}

const ModuloGenerico = ({ moduloType, titolo, campi }: ModuloGenericoProps) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      // Castiamo i valori a stringa, in modo da evitare conflitti di tipo
      data[key] = value.toString();
    });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Email inviata con successo!");
      } else {
        alert("Errore nell'invio dell'email: " + result.error);
      }
    } catch (error) {
      alert("Errore di connessione.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //MODULO GENERICO
    <div className="p-6 mr-4 bg-[#444444] rounded-3xl space-y-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-white">{titolo}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="moduloType" value={moduloType} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campi.map((campo: string) => (
            <div key={campo} className="flex flex-col">
              {campo === "descrizione" ? (
                <textarea
                  name={campo}
                  className="p-3 w-full bg-[#1a1a1a] text-white rounded-md placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder={fieldPlaceholders[campo]}
                  required
                />
              ) : (
                <input
                  type={campo === "email" ? "email" : "text"}
                  name={campo}
                  className="p-3 w-full bg-[#1a1a1a] text-white rounded-md placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder={fieldPlaceholders[campo]}
                  pattern={fieldPatterns[campo] || undefined}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consenso"
            required
            className="mt-1 accent-yellow-400"
          />
          <label className="text-white text-sm">
            Acconsento al trattamento dei miei dati personali, come indicato nell'informativa sulla privacy.
          </label>
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token: string | null) => setRecaptchaToken(token)}
        />
        <input type="hidden" name="recaptchaToken" value={recaptchaToken || ""} />

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-400 text-[#1a1a1a] font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            {isLoading ? "Invio in corso..." : "Invia"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Contatti = () => (
  <div className="mt-[-15%] text-center">
    <h2 className="text-white text-2xl font-bold mb-6">Preferisci parlare a voce?</h2>
    <p className="text-gray-200 text-lg">Chiama dal Lunedì al Venerdì</p>
    <p className="text-gray-300 text-lg">9:00-13:00 | 14:00-17:00</p>
    <div className="flex items-center mt-8">
      <FaPhoneAlt className="mr-2 text-yellow-400" />
      <a href="tel:+393277444827" className="text-gray-200 text-gray-200 hover:text-yellow-400">+39 327 7444827</a>
    </div>
    <div className="flex items-center mt-3">
      <FaPhoneAlt className="mr-2 text-yellow-400" />
      <a href="tel:+393356456524" className="text-gray-200 text-gray-200 hover:text-yellow-400">+39 335 6456524</a>
    </div>
    <div className="flex items-center mt-3">
      <FaEnvelope className="mr-2 text-yellow-400" />
      <a href="mailto:edilizia@zmpgroup.it" className="text-gray-200 hover:text-yellow-400">edilizia@zmpgroup.it</a>
    </div>
  </div>
);

const EdiliziaForm = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1a1a1a]">
      {/* Left - Buttons */}
      <div className="w-full md:w-1/2 p-4 flex flex-col gap-6 justify-center items-center">
        <div className="w-full flex flex-row gap-6 justify-center items-center">
          <ClickableDiv
            onClick={() => setSelectedButton(1)}
            title="Hai bisogno di un preventivo?"
            description="Compila il form per un preventivo su misura."
            icon={<FaRegClipboard />}
            active={selectedButton === 1}
          />
          <ClickableDiv
            onClick={() => setSelectedButton(2)}
            title="Sei un professionista e vuoi collaborare con noi?"
            description="Sei un architetto, ingegnere o altro? Contattaci."
            icon={<FaRegHandshake />}
            active={selectedButton === 2}
          />
        </div>
        <div className="w-full flex flex-row gap-6 justify-center items-center">
          <ClickableDiv
            onClick={() => setSelectedButton(3)}
            title="Cerchi lavoro nel settore edile?"
            description="Scopri le opportunità di lavoro nel nostro team!"
            icon={<FaToolbox />}
            active={selectedButton === 3}
          />
          <ClickableDiv
            onClick={() => setSelectedButton(4)}
            title="Preferisci una conversazione informale?"
            description="Siamo a tua disposizione per una chiacchierata."
            icon={<FaPhoneAlt />}
            active={selectedButton === 4}
          />
        </div>
      </div>

      {/* Right - Forms */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        {selectedButton === 1 && (
          <ModuloGenerico
            moduloType="preventivo"
            titolo="Preventivo"
            campi={[
              "nome",
              "cognome",
              "email",
              "telefono",
              "indirizzo",
              "comune",
              "provincia",
              "descrizione",
            ]}
          />
        )}
        {selectedButton === 2 && (
          <ModuloGenerico
            moduloType="collaborazione"
            titolo="Collaborazione professionale"
            campi={[
              "nome",
              "cognome",
              "email",
              "telefono",
              "data_nascita",
              "comune_nascita",
              "professione",
              "descrizione",
            ]}
          />
        )}
        {selectedButton === 3 && (
          <ModuloGenerico
            moduloType="settoreEdile"
            titolo="Lavoro nel settore edile"
            campi={[
              "nome",
              "cognome",
              "email",
              "telefono",
              "data_nascita",
              "comune_nascita",
              "mansione",
              "descrizione",
            ]}
          />
        )}
        {selectedButton === 4 && <Contatti />}
      </div>
    </div>
  );
};

export default EdiliziaForm;