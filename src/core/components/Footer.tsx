import { Facebook, Instagram, MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import lgoFooter from "./../../assets/img/logoFoter.svg"

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { Icon: Facebook, href: "#", label: "Facebook" },
        { Icon: Instagram, href: "#", label: "Instagram" },
        { Icon: MessageCircle, href: "#", label: "WhatsApp" },
    ];

    const footerLinks = [
        { name: "Métodos de pago", href: "#" },
        { name: "Contactos", href: "#" },
        { name: "Sobre Nosotros", href: "#" },
        { name: "Preguntas Frecuentes", href: "#" },
    ];

    return (
        <footer className="bg-zinc-950 text-zinc-300 mt-20 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                    {/* Información de Contacto */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg mb-4">Encuéntranos</h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-pink-500 shrink-0" size={20} />
                            <p className="text-sm leading-relaxed">
                                Sucre, Hernando Siles #17,<br />
                                Zona del Parque Bolívar
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-pink-500 shrink-0" size={20} />
                            <p className="text-sm">(591) 74215184</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="text-pink-500 shrink-0" size={20} />
                            <p className="text-sm">Lun-Sáb 10:00 a 20:00</p>
                        </div>
                    </div>

                    {/* Navegación Rápida */}
                    <nav aria-label="Footer Navigation" className="md:justify-self-center">
                        <h3 className="text-white font-semibold text-lg mb-4">Enlaces</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-pink-400"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Branding y Redes */}
                    <div className="flex flex-col items-start md:items-end gap-6">
                        <img
                            src={lgoFooter}
                            alt="MarIsa Logo"
                            className="w-44 brightness-110"
                        />
                        <div className="flex gap-5">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="p-2 bg-zinc-900 rounded-full transition-all hover:bg-pink-500 hover:text-white group"
                                >
                                    <Icon size={22} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>© {currentYear} MarIsa - Todos los derechos reservados.</p>
                    <p className="flex gap-4">
                        <a href="#" className="hover:underline">Privacidad</a>
                        <a href="#" className="hover:underline">Términos</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};