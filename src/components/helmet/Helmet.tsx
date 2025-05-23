import * as React from 'react'

interface HelmetProps {
  title?: string
  description?: string
  canonicalUrl?: string
  keywords?: string
  ogImage?: string
  site?: string
  children?: React.ReactNode
}

export function Helmet({
  title,
  description,
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : '',
  keywords,
  ogImage = 'assets/logo-full.svg',
  site = typeof window !== 'undefined' ? window.location.href : '',
  children,
}: HelmetProps) {
  return (
    <>
      {/* Document Metadata */}
      {title && <title key="page-title">{title}</title>}
      {description && <meta name="description" content={description} key="meta-description" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} key="canonical-link" />}
      {keywords && <meta name="keywords" content={keywords} key="meta-keywords" />}
      <meta name="Author" content="Canvas" key="meta-author" />

      {/* Open Graph (OG) Metadata - Primary Set */}
      {title && <meta property="og:title" content={title} key="og-title" />}
      {description && <meta property="og:description" content={description} key="og-description" />}
      {ogImage && <meta property="og:image" content={ogImage} key="og-image" />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} key="og-url" />}
      <meta property="og:type" content="website" key="og-type" />

      {/* Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
      {site && (
        <meta property="twitter:domain" content={new URL(site).hostname} key="twitter-domain" />
      )}
      {site && <meta property="twitter:url" content={site} key="twitter-url" />}
      {title && <meta name="twitter:title" content={title} key="twitter-title" />}
      {description && (
        <meta name="twitter:description" content={description} key="twitter-description" />
      )}
      {ogImage && <meta name="twitter:image" content={ogImage} key="twitter-image" />}

      {children}
    </>
  )
}
