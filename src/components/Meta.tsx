import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  children?: React.ReactNode;
}

export function Meta({
  title,
  description = "SOPFFI (Solidarité pour la Promotion de la Famille et de la Femme Indigente) est une association sans but lucratif engagée pour l’autonomisation des femmes, l'éducation, la santé et le développement agro-pastoral en RDC.",
  keywords = "SOPFFI, Virtssoft, humanitaire, Goma, Nord-Kivu, RDC, association, femme indigente, famille indigente, autonomisation, agro-pastoral, éducation",
  url = "https://sopffi-virtssoft.org",
  image = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
  type = 'website',
  children
}: MetaProps) {
  return (
    <Helmet>
      {/* Standard SEO Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots Indexing */}
      <meta name="robots" content="index, follow" />

      {children}
    </Helmet>
  );
}
