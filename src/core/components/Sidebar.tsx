import React, { useState } from 'react';
import {
    LayoutDashboard, Package, Users, ChevronDown,
    PlusCircle, List, ShoppingCart, X, Menu, LogOut
} from 'lucide-react';

// --- INTERFACES ---
interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
    isActive?: boolean;
    href: string;
    onClick?: () => void;
}

// --- COMPONENTE PRINCIPAL ---
export const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);

    // Puedes cambiar esto por la lógica de tu Router para detectar la página actual
    const currentPath = window.location.pathname;

    return (
        <>
            {/* BOTÓN HAMBURGUESA: Aparece solo cuando el sidebar está cerrado */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed top-6 left-6 z-[60] p-2 text-gray-400 hover:text-pink-600 transition-colors bg-white rounded-md border border-gray-100 shadow-sm"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* SIDEBAR: min-h-screen para que siempre ocupe todo el alto disponible */}
            <aside
                className={`relative flex flex-col min-h-screen z-50 transition-all duration-300 border-r border-gray-100 bg-white ${isOpen ? 'w-64' : 'w-0 -translate-x-full overflow-hidden'
                    }`}
            >
                {/* HEADER: Logo y botón de cerrar */}
                {isOpen && (
                    <div className="flex items-center justify-between px-6 h-20">
                        <span className="text-xl font-bold text-gray-800 tracking-tight">
                            MARISA
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* CUERPO: Navegación principal */}
                {isOpen && (
                    <div className="flex-1 px-3 mt-2">
                        <nav className="space-y-1">

                            {/* Dashboard */}
                            <NavItem
                                icon={<LayoutDashboard size={20} />}
                                label="Dashboard"
                                isOpen={isOpen}
                                href="/inicio"
                                isActive={currentPath === '/dashboard'}
                            />

                            {/* Ventas */}
                            <NavItem
                                icon={<ShoppingCart size={20} />}
                                label="Ventas"
                                isOpen={isOpen}
                                href="/ventas"
                                isActive={currentPath === '/ventas'}
                            />

                            {/* Grupo de Inventario con Submenú */}
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setIsInventoryOpen(!isInventoryOpen)}
                                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isInventoryOpen ? 'text-pink-600 bg-pink-50/50' : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Package size={20} />
                                        <span>Inventario</span>
                                    </div>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isInventoryOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isInventoryOpen && (
                                    <div className="mt-1 ml-11 flex flex-col space-y-1 animate-in slide-in-from-top-1 duration-200">
                                        <a href="/registrarStock" className="text-sm py-2 text-gray-400 hover:text-pink-600 transition-colors">
                                            Registrar Stock
                                        </a>
                                        <a href="/listarStock" className="text-sm py-2 text-gray-400 hover:text-pink-600 transition-colors">
                                            Listar Stock
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Usuarios */}
                            <NavItem
                                icon={<Users size={20} />}
                                label="Usuarios"
                                isOpen={isOpen}
                                href="/usuarios"
                                isActive={currentPath === '/usuarios'}
                            />
                        </nav>
                    </div>
                )}

                {/* FOOTER: Información de Usuario */}
                {isOpen && (
                    <div className="p-4 border-t border-gray-50">
                        <div className="flex items-center justify-between gap-3 px-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold border border-gray-200">
                                    M
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs font-bold text-gray-700 leading-none">Admin Marisa</p>
                                    <p className="text-[10px] text-gray-400 mt-1">En línea</p>
                                </div>
                            </div>
                            <button title="Cerrar Sesión" className="text-gray-300 hover:text-rose-500 transition-colors">
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
};

// --- COMPONENTE AUXILIAR NavItem ---
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, href, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
            ? 'bg-pink-50 text-pink-600'
            : 'text-gray-500 hover:bg-pink-50/50 hover:text-pink-600'
            }`}
    >
        <div className="shrink-0 mr-3">
            {icon}
        </div>
        <span>{label}</span>
    </a>
);