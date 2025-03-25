import dynamic from 'next/dynamic';

import CarScene from '@/components/3D-car';

const Cars = () => {
    return (
        <>
            <main className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/sfondo-car-removed-v2-topazAI.jpg')" }}>
                {/* Testo sopra */}
                <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-white text-6xl font-bold">
                    FIND YOUR DREAM
                </h1>

                {/* Modello 3D sopra */}
                <CarScene />

                {/* Contenuto in basso */}
                <section className="relative z-10 mt-40 p-10 bg-white">
                    <h2>Altre informazioni...</h2>
                    <p>Qui possiamo caricare contenuti SSR senza problemi.</p>
                </section>
            </main>
            <div>
                <h1>ciao</h1>
                <p className="cursor-pointer">pointer</p>
            </div>
        </>
    );
};

export default Cars;

