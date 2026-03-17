import React, { useState } from 'react'
import { Menu } from './Menu'
import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'

export const MainLayout = () => {
    // Nota: Corregí el nombre de la variable para que sea más legible (isAutenticado)
    const [isAutenticacion, setIsAutenticacion] = useState<boolean>(true)

    return (
        <>
            {
                isAutenticacion ? (
                    /* Contenedor Flex para alinear Sidebar y Contenido */
                    <div className="flex">
                        {/* El Sidebar tiene un ancho fijo (w-64) */}
                        <Sidebar />

                        {/* El contenido principal crece para ocupar el resto (flex-1) */}
                        <main className="flex-1 p-6">
                            <Outlet />
                        </main>
                    </div>
                ) : (
                    <>
                        <Menu />
                        <main className="min-h-screen">
                            <Outlet />
                        </main>
                        <Footer />
                    </>
                )
            }
        </>
    )
}