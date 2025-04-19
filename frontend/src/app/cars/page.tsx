import Navbar from '@/components/Navbar-cars';
import Image from 'next/image';
import ScrollArrow from '@/components/ScrollArrow';
import Footer from '@/components/Footer';
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaExchangeAlt,
    FaCarSide,
    FaMobileAlt,
    FaTools,
} from "react-icons/fa";
import VendiForm from '@/components/VendiForm';
import CarsRichiesta from '@/components/Cars-richiesta';

const Cars = () => {
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
                                <span className="block font-bold mb-4
                                            text-md
                                            md:text-lg
                                            lg:text-xl
                                            xl:text-2xl
                                            2xl:text-4xl">
                                    Cerchi la tua prossima auto? Oppure vuoi vendere la tua?
                                </span>
                                Siamo qui per questo. Un concessionario giovane, online e trasparente: <br /> ti seguiamo passo dopo passo, senza stress, anche da smartphone.
                            </p>
                        </div>
                    </div>
                </div>
                <ScrollArrow />
            </main>
            
            <CarsRichiesta />
            <section id='compra' className='w-full min-h-screen bg-red-500 flex items-start justify-center'>
                <div>
                    <h1 className='--font-poppins'>ciao</h1>
                    <h1
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                        className="text-4xl"
                    >
                        COMPRA scritto con playfair
                    </h1>
                    <p className="cursor-pointer">pointer</p>
                </div>
            </section>

            <VendiForm />

            <section id='perchenoi' className="w-full h-auto py-16 px-4 bg-gray-100">
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

            <Footer
                bgColor="bg-[#070A11]"
                textColor="text-white/90"
                fontClass="--font-poppins"
                logo={<Image src="/images/cars/ZMPCARS-logo.png" alt="Logo ZMP CARS" width={170} height={50} />}
                copyrightText="© 2025 ZMP Group. Tutti i diritti riservati."
                navigationLinks={[
                    { name: 'About', href: '#about' },
                    { name: 'Compra', href: '#compra' },
                    { name: 'Vendi', href: '#vendi' },
                    { name: 'Gallery', href: '#gallery' },
                ]}
                contactInfo={{
                    email: 'cars@zmpgroup.it',
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

export default Cars;

