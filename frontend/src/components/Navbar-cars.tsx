'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Blocca lo scroll quando il menu mobile è aperto
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [menuOpen])

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur' : 'bg-transparent'
                    }`}
            >
                {/* Container: 80% su desktop, 100% su mobile */}
                <div className={`relative mx-auto px-4 py-4 flex items-center justify-between ${menuOpen ? 'w-[90%] max-w-screen-3xl' : 'w-[90%] max-w-screen-3xl'
                    }`}>

                    {/* Linea bianca SOLO su desktop e solo quando non scrollato */}
                    {!scrolled && (
                        <div className="absolute bottom-0 left-0 w-full border-b border-white/100 hidden lg:block" />
                    )}

                    {/* Mobile Header (sempre visibile su mobile) */}
                    <div className="flex items-center justify-between w-full lg:hidden">
                        <Link href="/cars" scroll={true}>
                            <Image src="/images/cars/ZMPCARS-logo.png" alt="Logo ZMP CARS" width={130} height={40} />
                        </Link>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white z-50">
                            {menuOpen ? <X size={35} /> : <Menu size={35} />}
                        </button>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between w-full">
                        <Link href="#vendi" scroll={true}>
                            <span style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                className="font-medium hover:font-bold cursor-pointer text-white/80 hover:text-white transition-all duration-200
                                            text-lg
                                            //sm e md non interessano perchè trattati separatamente
                                            lg:text-[1.1rem]
                                            xl:text-[1.3rem]
                                            2xl:text-[1.8rem]"
                            >VENDI
                            </span>
                        </Link>
                        <Link href="/cars" scroll={true}>
                            <Image src="/images/cars/ZMPCARS-logo.png" alt="Logo ZMP CARS" width={170} height={50} />
                        </Link>
                        <Link href="#compra" scroll={true}>
                        <span style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                className="font-medium hover:font-bold cursor-pointer text-white/80 hover:text-white transition-all duration-200
                                            text-lg
                                            //sm e md non interessano perchè trattati separatamente
                                            lg:text-[1.1rem]
                                            xl:text-[1.3rem]
                                            2xl:text-[1.8rem]"
                            >COMPRA
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <>
                    {/* Sfocatura + blocco click */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setMenuOpen(false)}
                    />

                    {/* Link centrati in alto */}
                    <div className="fixed top-[35%] left-0 right-0 z-50 lg:hidden flex flex-col items-center gap-5">
                        <Link href="#vendi" scroll={true} onClick={() => setMenuOpen(false)}>
                            <div style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            className="py-4 text-white font-medium w-full text-center hover:bg-white/10 transition rounded-lg px-8
                                            text-2xl
                                            sm:text-xl
                                            md:text-5xl">
                                VENDI
                            </div>
                            <div className="relative mt-6 w-full border-b border-white/100" />
                        </Link>
                        <Link href="#compra" scroll={true} onClick={() => setMenuOpen(false)}>
                            <div style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            className="py-4 text-white font-medium w-full text-center hover:bg-white/10 transition rounded-lg px-8
                                            text-2xl
                                            sm:text-xl
                                            md:text-5xl">
                                COMPRA
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}