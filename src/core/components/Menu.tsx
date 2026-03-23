import {
    Facebook,
    Instagram,
    MessageCircle,
    Menu as MenuIcon,
    X,
    ChevronDown,
    ShoppingBag // Importamos el icono del carrito
} from "lucide-react";
import { useEffect, useState } from "react";

import newIcon from "./../../assets/img/newIcon.svg"
import { useEstadoModal, useEstadoReload } from "../utils/appUtil";
import { CarritoModal } from "./CarritoModal";
import type { CarritoI } from "../../module/producto/interface/producto";

export function Menu() {
    const [productoSeleccionados, setProductoSeleccionados]=useState<number>(0)
    const {isReloading}=useEstadoReload()
      const datosLocal = localStorage.getItem("carrito");
      const productos:CarritoI[] = datosLocal ? JSON.parse(datosLocal) : [];
    const [open, setOpen] = useState(false);
    const {isOpen, openModal } = useEstadoModal()
    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Catálogo", href: "/catalogo" },
        { name: "Nosotros", href: "/nosotros" },
        { name: "Contactos", href: "/contactos" },
    ];

    const btnAbrirCarrito = () => {
        openModal()
    }
    useEffect(()=>{
        setProductoSeleccionados(productos.length)
    },[isReloading])
    return (
        <>
        <header className="sticky top-0 w-full z-50 shadow-md">

            {/* Barra superior (Negra) */}
            <div className="w-full bg-zinc-950 text-white flex justify-between items-center px-6 py-2.5">
                <p className="font-bold tracking-[0.25em] text-[9px] md:text-[10px] uppercase">
                    Viste con originalidad • Envíos a todo el país
                </p>

                <div className="flex gap-5">
                    {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                        <a key={i} href="#" className="transition-all hover:text-pink-300">
                            <Icon size={16} strokeWidth={1.5} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Navbar Principal - ROSA (#D68B8F) */}
            <nav className="bg-[#D68B8F] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <div className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105">
                            <img
                                src={newIcon}
                                alt="logo"
                                className="h-14 w-auto object-contain" // Quitamos los filtros para probar
                            />
                        </div>

                        {/* Menu desktop */}
                        <div className="hidden md:flex gap-10 items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-zinc-900 transition-colors group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}


                        </div>

                        {/* Iconos de Acción (Carrito y Menu Móvil) */}
                        <div className="flex items-center gap-4">
                            {/* Carrito de Compras */}
                            <button onClick={btnAbrirCarrito} className="relative p-2 hover:bg-white/10 rounded-full transition-colors group">
                                <ShoppingBag size={22} strokeWidth={2} className="group-hover:text-zinc-900 transition-colors" />
                                {/* Burbuja de cantidad */}
                                <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-[#D68B8F]">
                                {productoSeleccionados}
                                </span>
                            </button>

                            {/* Botón menú móvil */}
                            <button
                                className="md:hidden p-2 text-white hover:text-zinc-900 transition-colors"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <X size={28} /> : <MenuIcon size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu móvil */}
                <div className={`md:hidden bg-[#D68B8F] overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-screen border-t border-white/20' : 'max-h-0'}`}>
                    <div className="px-8 py-10 flex flex-col gap-6 text-sm font-bold uppercase tracking-[0.2em]">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-zinc-900 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                    </div>
                </div>
            </nav>
        </header>
        { isOpen && <CarritoModal/>}
        </>
    );
}