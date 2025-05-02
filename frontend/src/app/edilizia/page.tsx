import EdiliziaForm from '@/components/EdiliziaForm';
import Navbar from '@/components/Navbar-edilizia';
import Image from 'next/image';
import Gallery from "@/components/Gallery";

const Edilizia = () => {
    return (
        <>
            <Navbar
                logo="/images/logo-zmp-group-w-V2.png"
                logoScroll="/images/logo-zmp-group-w-V2.png"
                linksLeft={[
                    { name: "Home", href: "/" },
                    { name: "Chi Siamo", href: "/about" },
                    { name: "Servizi", href: "/services" },
                ]}
                linksRight={[
                    { name: "Certificazioni", href: "/certificazioni" },
                    { name: "Contatti", href: "/contact" },
                ]}
                logoSize='h-13'
                colorsTop={{
                    background: "bg-transparent",
                    text: "text-white",
                    hover: "hover:text-gray-600"
                }}
                colorsScroll={{
                    background: "bg-black opacity-90 backdrop-blur-md",
                    text: "text-white",
                    hover: "hover:text-yellow-600",
                }}
            />
            <main>
                <div className="bg-[#1a1a1a] text-white p-8 md:p-16 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Section */}
                        <div>
                            <h1 className="text-5xl font-bold leading-tight">
                                Il tuo <span className="text-yellow-400">Progetto</span> <br /> la nostra <span className="text-yellow-400">Passione</span>
                            </h1>
                            <p className="mt-4 text-gray-300 text-lg">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-300 transition">
                                    Richiedi un preventivo
                                </button>
                                <button className="text-yellow-400 font-semibold flex items-center gap-2 hover:underline">
                                    I nostri Lavori →
                                </button>
                            </div>
                        </div>
                        {/* Right Section - Interactive Image */}
                        <div className="flex justify-content items-center ml-15">
                            <Image
                                src="/images/edilizia-main-V2.png"
                                alt="Construction site"
                                width={600}
                                height={400}
                                className="rounded-xl transition-transform duration-300 ease-in-out hover:scale-103"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <div>
                <h1>Benvenuto sulla nostra pagina di contatto!</h1>
                <p>Seleziona un modulo per inviare un messaggio:</p>
                <p className='cursor-pointer !important'>pointer</p>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold my-6">I nostri cantieri</h1>
                <Gallery collectionName="edilizia-galleries" />
            </div>
            <div>
                {/* Componente interattivo client-side */}
                <EdiliziaForm />
            </div>
        </>
    );
};

export default Edilizia;