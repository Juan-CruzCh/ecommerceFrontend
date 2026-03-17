import React, { useState } from 'react'
import { Menu } from './Menu'
import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { useAutenticacionStore } from '../context/Autenticacion'

export const MainLayout = () => {
  const {isAutenticacion} = useAutenticacionStore()

    return (
        <>
            {
                isAutenticacion ? (
                  
                    <div className="flex">
                       
                        <Sidebar />

                        
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