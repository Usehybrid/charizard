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
  canonicalUrl = window.location.href,
  keywords,
  ogImage = 'assets/logo-full.svg',
  site = window.location.href,
  children,
}: HelmetProps) {
  return (
    <>
      {title && <title key="title">{title}</title>}
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:image" content={ogImage} key="image" />
      <meta property="og:description" content={description} key="description" />
      <meta property="og:url" content={canonicalUrl} key="url" />
      <meta property="og:type" content="website" key="type" />
      <meta name="Author" content="Canvas" key="author" />
      <meta name="keywords" content={`${keywords}`} key="keywords" />
      {/* twitter og */}
      <meta name="twitter:card" content="summary_large_image" key="cardImage" />
      <meta property="twitter:domain" content={site} key="twitter:domain" />
      <meta property="twitter:url" content={site} key="twitter:url" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={ogImage} key="twitter:image" />
      {/* fb og */}
      <meta property="og:url" content={site} key="og:url" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={ogImage} key="og:image" />
      {children}
    </>
  )
}
