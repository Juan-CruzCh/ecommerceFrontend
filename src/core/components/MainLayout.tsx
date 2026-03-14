import React from 'react'
import { Menu } from './Menu'
import { Outlet } from 'react-router'
import { Footer } from './Footer'

export const MainLayout = () => {
    return (

        <>
            <Menu />

            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </>

    )
}
