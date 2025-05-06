import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: "ZMP Group",
    description: "Scopri i servizi di ZMP Group: edilizia, concessionario auto e soluzioni integrate. Professionalità e innovazione al tuo servizio.",
    keywords: ["zmp group", "edilizia", "concessionario auto", "concessionario campobasso", "impresa edile", "impresa edile campobasso", "molise", "zampino", "zmp"],
    openGraph: {
        title: "ZMP Group",
        description: "Professionalità e innovazione in edilizia e autoveicoli",
        url: "https://www.zmpgroup.it",
        images: [
            {
                url: "/images/home-og.jpg",
                width: 800,
                height: 600,
            },
        ],
        siteName: "ZMP Group",
    },
    twitter: {
        card: "summary_large_image",
        title: "ZMP Group",
        description: "Professionalità e innovazione in edilizia e autoveicoli",
        images: ["/images/home-og.jpg"],
    },
}

interface HomeProps {
    sections: Record<string, any>;
}

export default function Home({ sections }: HomeProps) {
    return (
        <div className="h-screen w-full flex flex-col lg:flex-row overflow-x-hidden relative" style={{ backgroundColor: "var(--background-dark)" }}>
            {/* --- VERSIONE DESKTOP --- */}
            <div className="hidden lg:flex h-full w-full">

                <div className="fixed left-1/2 transform -translate-x-1/2 top-[91%] z-50 opacity-60">
                    <p className="text-white text-lg font-bold" style={{
                        fontFamily: "var(--font-raleway), serif",
                        fontWeight: "500"
                    }}>
                        Passa con il mouse sulla sezione che ti interessa per procedere
                    </p>
                </div>

                <div className="absolute top-[-3%] left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold z-50 w-60 h-16">
                    <Image
                        src="/images/logo-zmp-group-w.png"
                        alt="ZMP Group logo"
                        width={260}
                        height={164}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Lato Sinistro - Edilizia */}
                <div className="relative w-1/2 h-full flex items-center justify-center overflow-hidden group">
                    <Image
                        src="/images/construction-background.jpg"
                        alt="ZMP Group edilizia foto cantiere"
                        fill={true}
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-700 group-hover:brightness-0"
                    />
                    <Image
                        src="/images/construction-item.png"
                        alt="ZMP Group edilizia foto trasporti"
                        width={1920}
                        height={1080}
                        className="absolute transition-all duration-700 group-hover:scale-110 group-hover:-translate-x-8"
                    />
                    <div className="absolute w-130 top-[20%] text-white text-start opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <h1 className="text-9xl mb-8"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontWeight: "500"
                            }}>
                            EDILIZIA</h1>
                        <p className="text-white opacity-90 text-lg mb-4" style={{
                            fontFamily: "var(--font-poppins), serif",
                            fontWeight: "300"
                        }}>
                            Che sia per un preventivo, una <br /> collaborazione o per trovare lavoro, abbiamo <br /> quello che fa per te nel settore edile.</p>
                        <Link href="/edilizia">
                            <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-lg cursor-pointer">Scopri di più</button>
                        </Link>
                    </div>
                </div>

                {/* Lato Destro - Cars */}
                <div className="relative w-1/2 h-full flex items-center justify-center overflow-hidden group">
                    <Image
                        src="/images/cars-background.jpg"
                        alt="Cars Background"
                        fill={true}
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-700 group-hover:brightness-0"
                    />
                    <Image
                        src="/images/cars-item.png"
                        alt="ZMP Group Cars showroom"
                        width={1920}
                        height={1080}
                        className="absolute transition-all duration-700 group-hover:scale-120 group-hover:translate-x-16"
                    />
                    <div className="absolute w-130 top-[20%] text-white text-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 ">
                        <h1 className="text-9xl mb-8"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontWeight: "500"
                            }}>
                            CARS</h1>
                        <p className="text-white opacity-90 text-lg mb-4" style={{
                            fontFamily: "var(--font-poppins), serif",
                            fontWeight: "300"
                        }}>
                            Scegli l'auto che ti accompagna <br /> ogni giorno: tante opzioni per <br /> trovare quella che ti calza a pennello.</p>
                        <Link href="/cars">
                            <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-lg cursor-pointer">Scopri di più</button>
                        </Link>
                    </div>
                </div>
            </div>





            {/* --- VERSIONE MOBILE --- */}
            <div className="lg:hidden flex flex-col min-h-screen pb-20 w-full" style={{ backgroundColor: "var(--background-dark)" }}>

                {/* Testo di sfondo */}
                <div className="absolute inset-0 flex justify-center items-start transform -translate-x-1/2 -top-[5%] left-[50%] opacity-25 pointer-events-none aria-hidden">
                    <h1 className="text-[50vw] font-bold text-black uppercase" style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: "600"
                    }} >ZMP</h1>
                </div>


                <div className="absolute top-0 left-0 w-full text-center py-4">
                    {/* Logo */}
                    <div className="flex justify-center w-full py-0">
                        <Image
                            src="/images/logo-zmp-group-w.png"
                            alt="ZMP Group logo"
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </div>

                    {/* Titolo e sottotitolo */}
                    <div className="text-center px-8">
                        <p className="text-lg text-white mb-4"> Ci occupiamo di tutto ciò che riguarda l’edilizia e le auto </p>
                    </div>

                    {/* Sezioni */}
                    <div className="flex flex-col gap-8 px-5 w-full">
                        {/* Sezione 1 */}
                        <Link href="/edilizia">
                            <div
                                className="relative w-full h-auto aspect-[16/9] bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: "url('/images/edilizia-mobile.png')" }}>
                                {/* Overlay scuro per leggibilità */}
                                <div className="absolute inset-0"></div>

                                {/* Contenuto sopra l'immagine */}
                                <div className="absolute inset-0 flex flex-col justify-center items-end text-white p-6">
                                    <h2 className="text-3xl font-semibold mr-5 mt-10">EDILIZIA</h2>
                                    <button className="mt-2 bg-yellow-500 text-white py-2 px-5 mr-5 rounded-full">
                                        <span className="ml-2">→</span>
                                    </button>
                                </div>
                            </div>
                        </Link>

                        {/* Sezione 2 */}
                        <Link href="/cars">
                            <div
                                className="relative w-full h-auto aspect-[16/9] bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: "url('/images/cars-mobile.png')" }}>
                                {/* Overlay scuro per leggibilità */}
                                <div className="absolute inset-0"></div>

                                {/* Contenuto sopra l'immagine */}
                                <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6">
                                    <h2 className="text-3xl font-semibold ml-5">CARS</h2>
                                    <button className="mt-2 bg-blue-500 text-white py-2 px-5 ml-5 rounded-full">
                                        <span className="ml-2">→</span>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center px-8 pb-10 mt-2 opacity-70">
                        <p className="text-md text-white">Scegli la sezione che ti interessa.</p>
                    </div>
                </div>
            </div>


        </div>
    );
}