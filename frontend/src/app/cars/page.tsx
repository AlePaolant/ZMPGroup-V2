import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar-cars';
import ScrollArrow from '@/components/ScrollArrow';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import VendiForm from '@/components/VendiForm';
import CarsRichiesta from '@/components/Cars-richiesta';
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaExchangeAlt,
    FaCarSide,
    FaMobileAlt,
    FaTools,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

// ISR configuration: page is regenerated every 60 seconds
export const revalidate = 60;

const Cars = async () => {
    const reasons = [
        {
            icon: <FaCarSide className="w-8 h-8 text-violet-600" />,
            title: "Ampia Scelta di Veicoli",
            text: "Disponiamo di un’ampia gamma di auto, dalle citycar ai SUV, selezionate con cura per offrire qualità e varietà a ogni cliente.",
        },
        {
            icon: <FaExchangeAlt className="w-8 h-8 text-violet-600" />,
            title: "Acquistiamo la Tua Auto Usata",
            text: "Valutiamo e acquistiamo la tua auto usata con pagamento rapido e senza obbligo di acquisto. Servizio semplice, trasparente e veloce.",
        },
        {
            icon: <FaTools className="w-8 h-8 text-violet-600" />,
            title: "Assistenza Post-Vendita",
            text: "Offriamo assistenza continua anche dopo l’acquisto: tagliandi, manutenzioni e supporto tecnico, sempre al tuo fianco.",
        },
        {
            icon: <FaMobileAlt className="w-8 h-8 text-violet-600" />,
            title: "Approccio Giovane e Digitale",
            text: "Siamo una realtà giovane e dinamica: rispondiamo velocemente online, curiamo l’esperienza digitale e ti seguiamo passo dopo passo.",
        },
    ];


    return (
        <>
            <Navbar />

            {/* Sezione MAIN */}
            <main className="w-full h-screen md:h-auto bg-black flex items-start justify-center overflow-hidden">
                <div className="relative w-full h-full md:aspect-[16/9]">
                    {/* Sfondo */}
                    <Image
                        src="/images/cars/background-main.jpg"
                        alt="Sfondo"
                        fill
                        className="object-cover transition-transform duration-500
                                    object-[47%_20%]
                                    sm:object-center 
                                    scale-100
                                    sm:scale-150
                                    md:scale-100"
                        priority
                    />

                    {/* PNG sopra */}
                    <Image
                        src="/images/cars/auto-persona.png"
                        alt="Auto e Persona"
                        fill
                        className="object-cover z-20 transition-transform duration-500
                                    object-[47%_20%]
                                    sm:object-center 
                                    scale-100
                                    sm:scale-150
                                    md:scale-100"
                        priority
                    />

                    {/* Testo */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center
                                    mb-55
                                    sm:mb-15
                                    md:mb-30
                                    lg:mb-35
                                    xl:mb-45
                                    2xl:mb-75">
                        <h1 style={{ fontFamily: "var(--font-playfair), serif" }}
                            className="text-white font-bold text-center drop-shadow-lg leading-none
                                        text-[1.5rem]
                                        sm:text-[1.4rem]
                                        md:text-[2rem]
                                        lg:text-[2.8rem]
                                        xl:text-[3rem]
                                        2xl:text-[5rem]"
                        >Find Your</h1>
                        <h1 style={{ fontFamily: "var(--font-playfair), serif" }}
                            className="text-white font-bold text-center drop-shadow-lg leading-none
                                        text-[3rem]
                                        sm:text-[4rem]
                                        md:text-[6rem]
                                        lg:text-[8rem]
                                        xl:text-[10rem]
                                        2xl:text-[13rem]"
                        >FOREVER</h1>
                        <div className="absolute  w-full bg-transparent py-2 text-center mx-auto
                                        -bottom-38      px-4
                                        sm:-bottom-15   sm:px-2
                                        md:-bottom-25   md:px-10
                                        lg:-bottom-20   lg:px-10
                                        xl:-bottom-20   xl:px-20
                                        2xl:-bottom-15  2xl:px-20">
                            <p className="text-white/80 font-medium leading-relaxed
                                            text-md 
                                            md:text-sm
                                            lg:text-lg
                                            xl:text-xl
                                            2xl:text-3xl">
                                <span className="block font-bold mb-24 md:mb-4
                                            text-md
                                            md:text-lg
                                            lg:text-xl
                                            xl:text-2xl
                                            2xl:text-4xl">
                                    Cerchi la tua prossima auto? <br className="block md:hidden" /> Oppure vuoi vendere la tua?
                                </span>
                                <span className="hidden md:block">Siamo qui per questo. Un concessionario giovane, online e trasparente: <br /> ti seguiamo passo dopo passo, senza stress, anche da smartphone.</span>
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-30 z-30 bg-gradient-to-b from-transparent to-[#0b0a1a] pointer-events-none" />
                </div>
                <ScrollArrow />
            </main>

            {/* Sezione About */}
            <section id="about" className="py-16 bg-[#0b0a1a]">
                <div className="container mx-auto px-2">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Auto su misura per te</h2>

                        <div className="space-y-6 text-gray-300 mb-10 text-lg px-4">
                            <p>
                                Nati nel 2024 come realtà innovativa nel mondo dell'auto, combiniamo la tradizione del buon usato con tecnologie
                                avanzate di selezione veicoli, per proporti solo auto che corrispondono davvero alle tue esigenze.
                            </p>
                            <p>
                                Se cerchi un'auto nuova di zecca o un usato premium con garanzia, abbiamo creato un processo semplice e trasparente:
                                inserisci l'auto dei tuoi sogni nel nostro modulo di ricerca e lascia fare a noi il lavoro pesante.
                            </p>
                            <p>
                                <strong>Acquistiamo anche la tua auto!</strong> Valutazioni rapide e competitive, senza sorprese.
                            </p>
                        </div>

                        <div className="hidden md:blockgrid md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-[#1a1933] p-6 rounded-lg border border-[#1a1933]">
                                <h3 className="font-bold text-lg mb-3 text-violet-300">Selezione Smart</h3>
                                <p className="text-gray-300">
                                    Usiamo sistemi informatizzati per analizzare storia, manutenzione e condizioni di ogni veicolo,
                                    eliminando il rischio di sorprese.
                                </p>
                            </div>
                            <div className="bg-[#1a1933] p-6 rounded-lg border border-[#1a1933]">
                                <h3 className="font-bold text-lg mb-3 text-violet-300">Prezzo Giusto</h3>
                                <p className="text-gray-300">
                                    Analisi di mercato in tempo reale per offrirti sempre il miglior rapporto qualità-prezzo,
                                    sia in acquisto che in vendita.
                                </p>
                            </div>
                            <div className="bg-[#1a1933] p-6 rounded-lg border border-[#1a1933]">
                                <h3 className="font-bold text-lg mb-3 text-violet-300">Garanzia Reale</h3>
                                <p className="text-gray-300">
                                    Coperture estese su tutti i veicoli, con interventi rapidi presso la nostra rete di officine certificate.
                                </p>
                            </div>
                            <div className="bg-[#1a1933] p-6 rounded-lg border border-[#1a1933]">
                                <h3 className="font-bold text-lg mb-3 text-violet-300">Trade-in Digitale</h3>
                                <p className="text-gray-300">
                                    Valutazione online della tua auto in 15 minuti, con ritiro a domicilio e pagamento immediato.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#compra" className="bg-violet-600 hover:bg-violet-900 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                                Compra la tua nuova auto
                            </Link>
                            <Link href="#vendi" className="bg-[#1a1933] hover:bg-violet-900 text-white font-bold py-3 px-6 rounded-lg border-2 border-violet-600 text-center transition-all duration-300 hover:scale-105 cursor-pointer">
                                Vendi la tua auto usata
                            </Link>
                            <Link
                                href="https://maps.app.goo.gl/D1t158fmXMTSKcbd7"
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-violet-300 font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Vieni a trovarci !
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sezione COMPRA */}
            <section id="compra" className="w-full min-h-[50vh] h-auto pt-16 pb-30 bg-[#0b0a1a] items-start justify-center overflow-hidden">
                <CarsRichiesta />
            </section>

            {/* Sezione VENDI */}
            <VendiForm />

            {/* Sezione PERCHÈ NOI*/}
            <section id="perchenoi" className="w-full h-auto py-12 px-4 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Perché scegliere noi
                    </h2>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
                        {reasons.map((reason, index) => (
                            <div
                                key={index}
                                className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col"
                            >
                                <div className="flex items-center mb-4">
                                    {reason.icon}
                                    <h4 className="text-lg font-semibold ml-3">{reason.title}</h4>
                                </div>
                                <p className="text-gray-600 text-sm">{reason.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sezione GALLERY - STRAPI PLURALIZZA, occhio alla collectionName */}
            <section id="gallery" className="w-full h-auto py-4 px-4 bg-gray-100 text-center">
                <h1 className="text-3xl font-bold py-2 mt-2 mb-4 text-black">Gallery</h1>
                <p className="text-gray-800 px-8 mb-6 text-md pb-2">
                    Esplora le nostre gallery: seleziona una copertina per accedere a tutte le immagini.</p>
                <Gallery collectionName="cars-galleries" />
            </section>

            {/* Sezione Contatti */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">


                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-2">Dove trovarci</h2>
                    </div>

                    <div className="mb-16 rounded-xl overflow-hidden shadow-xl">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2402.989664258596!2d14.667907750962264!3d41.58717807510492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sit!2sit!4v1746392949148!5m2!1sit!2sit" 
                            width="100%" 
                            height="250" 
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy" 
                        ></iframe>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                            <div className="space-y-4">
                                <div className="flex justify-center md:justify-start items-center">
                                    <FaMapMarkerAlt className="h-6 w-6 text-gray-700 mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">Indirizzo</h3>
                                        <a href="https://maps.app.goo.gl/D1t158fmXMTSKcbd7" target="_blank" className="text-gray-700 hover:text-violet-800">Contrada Colle delle Api 108 D<br />86100 Campobasso, Italia</a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-center md:justify-start items-center">
                                    <FaPhone className="h-6 w-6 text-gray-700 mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">Telefono</h3>
                                        <a href="tel:+393277444827" className="text-gray-700 hover:text-violet-800">+39 327 7444827</a>
                                    </div>
                                </div>

                                <div className="flex justify-center md:justify-start items-center">
                                    <FaPhone className="h-6 w-6 text-gray-700 mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">Telefono</h3>
                                        <a href="tel:+393356456524" className="text-gray-700 hover:text-violet-800">+39 335 6456524</a>
                                    </div>
                                </div>

                                <div className="flex justify-center md:justify-start items-center">
                                    <FaEnvelope className="h-6 w-6 text-gray-700 mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <a href="mailto:cars@zmpgroup.it" className="text-gray-700 hover:text-violet-800">cars@zmpgroup.it</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer
                bgColor="bg-[#0b0a1a]"
                textColor="text-white/90"
                fontClass="--font-poppins"
                logo={<Image src="/images/cars/ZMPCARS-logo.png" alt="Logo ZMP CARS" width={170} height={50} />}
                copyrightText="© 2025 ZMP Cars Group. Tutti i diritti riservati."
                navigationLinks={[
                    { name: 'About', href: '#about' },
                    { name: 'Compra', href: '#compra' },
                    { name: 'Vendi', href: '#vendi' },
                    { name: 'Gallery', href: '#gallery' },
                ]}
                contactInfo={{
                    email: 'cars@zmpgroup.it',
                    phone: ['+39 327 7444827', '+39 335 6456524'],
                    address: 'Contrada Colle delle Api 108 D, Campobasso',
                    addressLink: 'https://maps.app.goo.gl/D1t158fmXMTSKcbd7',
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

export default Cars;

