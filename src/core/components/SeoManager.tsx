import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  titulo: string;
  descripcion: string;
  ruta?: string;
  imagen?: string;
  tipo?: "website" | "product" | "article";
}

export const SeoManager = ({ 
  titulo, 
  descripcion, 
  ruta = "", 
  imagen = "https://ropamarisa.com/logo-social.jpg", 
  tipo = "website" 
}: SeoProps) => {
  
  const nombreTienda = "Ropa Marisa";
  const urlBase = "https://ropamarisa.com";
  const urlCompleta = `${urlBase}/${ruta}`;
  const tituloCompleto = `${titulo} | ${nombreTienda}`;

  return (
    <Helmet>
      {/* SEO Estándar */}
      <title>{tituloCompleto}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={urlCompleta} />

      {/* Redes Sociales (Facebook, WhatsApp) */}
      <meta property="og:type" content={tipo} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:image" content={imagen} />
      <meta property="og:url" content={urlCompleta} />
      <meta property="og:site_name" content={nombreTienda} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image" content={imagen} />
    </Helmet>
  );
};

