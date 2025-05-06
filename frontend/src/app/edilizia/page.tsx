import EdiliziaForm from '@/components/EdiliziaForm';
import Navbar from '@/components/Navbar-edilizia';
import Image from 'next/image';
import Gallery from "@/components/Gallery";
import Footer from '@/components/Footer';
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaHardHat,
    FaAward,
} from "react-icons/fa";

// ISR configuration: page is regenerated every 60 seconds
export const revalidate = 60;

export const metadata = {
    title: "ZMP Group | Edilizia",
    description: "Servizi completi di edilizia civile e industriale. Richiedi un preventivo. Lavora con noi.",
    keywords: ["zmp edilizia", "costruzioni", "ristrutturazioni", "edilizia civile", "zmp group", "lavora con noi", "collaborazione professionale", "preventivo", "campobasso", "molise", "italia"],
    alternates: {
        canonical: "https://www.zmpgroup.it/edilizia",
    },
    openGraph: {
        title: "ZMP Group Edilizia",
        description: "Servizi completi di edilizia civile e industriale. Richiedi un preventivo. Lavora con noi.",
        url: "https://www.zmpgroup.it/edilizia",
        images: [
            {
                url: "/images/edilizia-og.jpg",
                width: 800,
                height: 600,
            },
        ],
        siteName: "ZMP Group | Edilizia",
    },
    twitter: {
        card: "summary_large_image",
        title: "ZMP Group Edilizia",
        description: "Servizi completi di edilizia civile e industriale. Richiedi un preventivo. Lavora con noi.",
        images: ["/images/edilizia-og.jpg"],
    },
}


const Edilizia = async () => {
    const certificazioni = [
        {
            icon: <FaShieldAlt className="text-yellow-300 w-6 h-6" />,
            title: "ISO 9001:2015",
            text: "Sistema di gestione qualità certificato, garanzia di processi controllati e miglioramento continuo."
        },
        {
            icon: <FaHardHat className="text-yellow-300 w-6 h-6" />,
            title: "SOA",
            text: "Abilitazione per appalti pubblici in edilizia civile e industriale, riconosciuta a livello nazionale."
        },
        /* 
        {
            icon: <FaAward className="text-yellow-300 w-6 h-6" />,
            title: "Certificazione ambientale ISO 14001",
            text: "Impegno concreto nella sostenibilità e nella riduzione dell’impatto ambientale dei cantieri."
        },
        */
    ];

    return (
        <>
            <Navbar
                logo="/images/logo-zmp-group-w-V2.png"
                logoScroll="/images/logo-zmp-group-w-V2.png"
                linksLeft={[
                    { name: "Home", href: "#" },
                    { name: "Chi Siamo", href: "#chisiamo" },
                    { name: "Servizi", href: "#servizi" },
                ]}
                linksRight={[
                    { name: "Certificazioni", href: "#certificazioni" },
                    { name: "Contatti", href: "#contatti" },
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

            {/* Sezione MAIN */}
            <main>
                <div className="bg-[#1a1a1a] text-white p-8 md:p-16 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Section */}
                        <div>
                            <h1 className=" mt-14 md:mt-30 text-5xl font-bold leading-tight">
                                Il tuo <span className="text-yellow-400">Progetto</span> <br /> la nostra <span className="text-yellow-400">Passione</span>
                            </h1>
                            <p className="mt-4 text-gray-300 text-lg">
                                Realizziamo progetti edili su misura: chiedi un preventivo, collabora con noi o entra nel team. Costruiamo insieme il futuro.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <a href="#servizi" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-300 transition cursor-pointer block w-1/2 md:w-fit text-center md:text-start">
                                    Richiedi un preventivo
                                </a>
                                <a href="#gallery" className="text-yellow-400 font-semibold flex items-center gap-2 hover:underline cursor-pointer">
                                    I nostri Lavori →
                                </a>
                            </div>

                            {/* 👇 Nuova sezione immagini affiancate */}
                            <div className="mt-30 hidden md:flex gap-8">
                                <Image
                                    src="/images/edilizia/edilizia-about-1.jpg"
                                    alt="Cantiere edile ZMP Group Edilizia con gru di un nuovo edificio residenziale"
                                    width={300}
                                    height={150}
                                    className="rounded-lg shadow-lg"
                                />
                                <Image
                                    src="/images/edilizia/edilizia-about-3.jpg"
                                    alt="Progettazione edile ZMP Group Edilizia - Progettazione architettonica"
                                    width={300}
                                    height={150}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Right Section - Interactive Image */}
                        <div className="flex justify-center items-center ml-2 md:ml-15">
                            <Image
                                src="/images/edilizia-main-V2.png"
                                alt="Nuovo edificio ZMP Group Edilizia con struttura in acciaio"
                                width={600}
                                height={400}
                                className="rounded-xl transition-transform duration-300 ease-in-out hover:scale-103"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Sezione CHI SIAMO */}
            <section
                id="chisiamo"
                className="relative bg-[#1e1e1e] py-20 px-6 sm:px-10 lg:px-20"
            >
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Card - Testo */}
                    <div className="bg-[#111111] p-8 rounded-2xl shadow-lg text-center md:text-start">
                        <h2 className="text-4xl font-extrabold text-white mb-6">
                            Costruiamo il Futuro, Insieme
                        </h2>
                        <p className="text-lg text-gray-300 mb-4">
                            La nostra impresa edile nasce dalla passione per il costruire <strong>bene</strong>, trasformando idee in strutture solide e su misura. <br />
                            Da oltre due decenni trasformiamo idee in spazi concreti, funzionali e duraturi.
                        </p>
                        <p className="text-lg text-gray-300 mb-4 hidden md:block">
                            Offriamo soluzioni personalizzate per privati, aziende ed enti pubblici, con attenzione ai dettagli,<br />
                            rispetto dei tempi e materiali di alta qualità.
                        </p>
                        <p className="text-lg text-gray-300 mb-4 hidden md:block">
                            Siamo sempre aperti a nuove sinergie: collaboriamo con architetti, ingegneri, artigiani e fornitori<br />
                            per dare vita a progetti ambiziosi.
                        </p>
                        <p className="text-lg text-gray-300 mb-8">
                            Vuoi lavorare con noi, chiederci un preventivo o proporci una collaborazione? Saremo felici di ascoltarti.
                        </p>
                    </div>

                    {/* Right - Due immagini verticali */}
                    <div className="hidden md:flex flex-col gap-6">
                        <img
                            src="/images/edilizia/edilizia-about-4.jpg"
                            alt="Operai dell'azienda ZMP Group Edilizia a lavoro su un cantiere - muniti di tutti i dispositivi di protezione individuale"
                            className="rounded-2xl w-full max-w-[500px] object-cover shadow-lg"
                        />
                        <img
                            src="/images/edilizia/edilizia-about-2.jpg"
                            alt="Architetto ZMP Group Edilizia mostra dei prospetti e delle piante a dei clienti"
                            className="rounded-2xl w-full max-w-[500px] object-cover shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Sezione MODULI PREVENTIVI */}
            <section id="servizi" className="w-full bg-[#1a1a1a] h-auto">
                <div className="text-center text-white pt-20 mb-0 px-4">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-4">I nostri servizi</h1>
                    <p className="text-lg text-gray-300 mb-6 md:mb-2">
                        Seleziona l'opzione che ti interessa e compila il modulo corrispondente.
                    </p>
                </div>
                <EdiliziaForm />
            </section>

            {/* Sezione Gallery */}
            <section id="gallery" className="bg-[#1e1e1e] flex flex-col items-center bg">
                <h1 className="text-3xl font-bold py-2 mt-16 text-white">I nostri cantieri</h1>
                <p className="text-lg text-gray-200 mt-3 mb-1 px-4 text-center">Quì troverai una serie di lavori di cui ci siamo occupati negli scorsi anni.</p>
                <p className="text-gray-200 px-4 mb-6 text-lg border-b pb-6 border-gray-200 text-center">
                    Esplora i nostri lavori: seleziona una copertina per accedere a tutte le immagini.</p>
                <Gallery collectionName="edilizia-galleries" />
            </section>

            {/* Sezione Contatti */}
            <section id="contatti" className="py-20 bg-[#1a1a1a]">
                <div className="container mx-auto px-4">


                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-3xl font-bold text-white mb-2">Dove trovarci</h2>
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
                                    <FaMapMarkerAlt className="h-6 w-6 text-white mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-200">Indirizzo</h3>
                                        <a href="https://maps.app.goo.gl/D1t158fmXMTSKcbd7" target="_blank" className="text-gray-400 hover:text-yellow-400">Contrada Colle delle Api 108 D<br />86100 Campobasso, Italia</a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-center md:justify-start items-center">
                                    <FaPhone className="h-6 w-6 text-white mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-200">Telefono</h3>
                                        <a href="tel:+393277444827" className="text-gray-400 hover:text-yellow-400">+39 327 7444827</a>
                                    </div>
                                </div>

                                <div className="flex justify-center md:justify-start items-center">
                                    <FaPhone className="h-6 w-6 text-white mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-200">Telefono</h3>
                                        <a href="tel:+393356456524" className="text-gray-400 hover:text-yellow-400">+39 335 6456524</a>
                                    </div>
                                </div>

                                <div className="flex justify-center md:justify-start items-center">
                                    <FaEnvelope className="h-6 w-6 text-white mr-3" />
                                    <div>
                                        <h3 className="font-medium text-gray-200">Email</h3>
                                        <a href="mailto:edilizia@zmpgroup.it" className="text-gray-400 hover:text-yellow-400">edilizia@zmpgroup.it</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sezione CERTIFICAZIONI */}
            <section id="certificazioni" className="w-full h-auto py-12 px-4 bg-[#1a1a1a]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:flex-wrap mt-6 gap-30">
                        {certificazioni.map((cert, index) => (
                            <div
                                key={index}
                                className="flex-1 bg-[#111111] rounded-2xl shadow-md p-6 flex flex-col"
                            >
                                <div className="flex items-center mb-4">
                                    {cert.icon}
                                    <h4 className="text-lg font-semibold ml-3 text-white">{cert.title}</h4>
                                </div>
                                <p className="text-gray-300 text-sm">{cert.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

export default Edilizia;