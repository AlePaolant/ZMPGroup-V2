import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Definizione dei tipi per le props
type FooterProps = {
    logo?: React.ReactNode;
    copyrightText?: string;
    navigationLinks?: { name: string; href: string }[];
    contactInfo?: {
        email?: string;
        phone?: string | string[];
        address?: string;
        addressLink?: string;
    };
    socialLinks?: { name: string; href: string; icon: React.ReactNode }[]; 
    bgColor?: string;
    textColor?: string;
    fontClass?: string;
};

const Footer: React.FC<FooterProps> = ({
    logo = (
        <span className="text-2xl font-bold">LOGO</span>
    ),
    copyrightText = `© ${new Date().getFullYear()} ZMP Group. Tutti i diritti riservati.`,
    navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Chi Siamo', href: '/about' },
        { name: 'Servizi', href: '/services' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contatti', href: '/contact' },
    ],
    contactInfo = {
        email: 'info@esempio.com',
        phone: '+39 123 456789',
        address: 'Via Roma 123, 00100 Roma',
    },
    socialLinks = [
        { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook className="w-5 h-5" /> },
        { name: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram className="w-5 h-5" /> },
        { name: 'WhatsApp', href: 'https://wa.me/123456789', icon: <FaWhatsapp className="w-5 h-5" /> },
    ],
    bgColor = 'bg-gray-900',
    textColor = 'text-gray-300',
    fontClass = 'font-sans', // Valore di default
}) => {
    return (
        <footer className={`${bgColor} ${textColor} w-full py-12`}
            style={{ fontFamily: `var(${fontClass}),serif` }}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Colonna Logo e Copyright */}
                    <div className="md:col-span-4">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                {logo}
                            </div>
                            <p className="text-sm">{copyrightText}</p>
                        </div>
                    </div>

                    {/* Colonna Navigazione */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">NAVIGAZIONE</h3>
                        <ul className="space-y-2">
                            {navigationLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonna Contatti */}
                    <div className="md:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">CONTATTI</h3>
                        <ul className="space-y-2">
                            {contactInfo.email && (
                                <li className="flex items-center">
                                    <span className="mr-2">📧</span>
                                    <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                                        {contactInfo.email}
                                    </a>
                                </li>
                            )}
                            {contactInfo.phone &&
                                (Array.isArray(contactInfo.phone)
                                    ? contactInfo.phone.map((phone, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2">📞</span>
                                            <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                                                {phone}
                                            </a>
                                        </li>
                                    ))
                                    : (
                                        <li className="flex items-center">
                                            <span className="mr-2">📞</span>
                                            <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                                                {contactInfo.phone}
                                            </a>
                                        </li>
                                    )
                                )
                            }
                            {contactInfo.address && (
                                <li className="flex items-center">
                                    <span className="mr-2">📍</span>
                                    {contactInfo.addressLink ? (
                                        <a
                                            href={contactInfo.addressLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            {contactInfo.address}
                                        </a>
                                    ) : (
                                        <span>{contactInfo.address}</span>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Colonna Seguici 
                    <div className="md:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">SEGUICI</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-transparent border border-white border-1 text-white hover:bg-white hover:border-[#070A11] hover:text-[#070A11] rounded-full w-10 h-10 flex items-center justify-center transition-all" aria-label={social.name}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;