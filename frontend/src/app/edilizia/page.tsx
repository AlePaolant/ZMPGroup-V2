import EdiliziaForm from '@/components/EdiliziaForm';
import Navbar from '@/components/Navbar-edilizia';
import Image from 'next/image';
import Gallery from "@/components/Gallery";
import Footer from '@/components/Footer';
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";

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
            <div className="bg-[#1e1e1e] flex flex-col items-center bg">
                <h1 className="text-3xl font-bold py-2 mt-16 text-white">I nostri cantieri</h1>
                <p className="text-lg text-gray-200 mt-3 mb-6">Quì troverai una serie di cantieri di cui ci siamo occupati negli scorsi anni.</p>
                <Gallery collectionName="edilizia-galleries" />
            </div>
            <div>
                {/* Componente interattivo client-side */}
                <EdiliziaForm />
            </div>



            <Footer
                bgColor="bg-[#111111]"
                textColor="text-white/90"
                fontClass="--font-poppins"
                logo={<Image src="/images/logo-zmp-group-w-V2.png" alt="Logo ZMP GROUP" width={170} height={50} />}
                copyrightText="© 2025 ZMP Group. Tutti i diritti riservati."
                navigationLinks={[
                    { name: 'Chi siamo', href: '#chisiamo' },
                    { name: 'Servizi', href: '#servizi' },
                    { name: 'Certificazioni', href: '#certificazioni' },
                    { name: 'Contatti', href: '#contatti' },
                ]}
                contactInfo={{
                    email: 'edilizia@zmpgroup.it',
                    phone: '+39 123 456789',
                    address: 'Via Roma 1, Roma',
                }}
                socialLinks={[
                    {
                        name: 'Facebook',
                        href: 'https://facebook.com/miosito',
                        icon: <FaFacebook className="w-5 h-5" />
                    },
                    {
                        name: 'Instagram',
                        href: 'https://instagram.com/miosito',
                        icon: <FaInstagram className="w-5 h-5" />
                    },
                    {
                        name: 'WhatsApp',
                        href: 'https://wa.me/123456789',
                        icon: <FaWhatsapp className="w-5 h-5" />
                    }
                ]}
            />
        </>
    );
};

export default Edilizia;