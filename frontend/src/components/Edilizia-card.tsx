interface CardProps {
    titolo: string;
    descrizione: string;
    luogo: string;
    data: string;
    immagine: string;
  }
  
  export default function Card({ titolo, descrizione, luogo, data, immagine }: CardProps) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
        <img
          src={immagine}
          alt={titolo}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-xl font-semibold">{titolo}</h2>
        <p className="text-gray-600">{descrizione}</p>
        <p className="text-sm text-gray-500 mt-2">
          📍 {luogo} | 📅 {data}
        </p>
      </div>
    );
  }