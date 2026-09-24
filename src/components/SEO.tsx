import { useEffect } from 'react'
import { getPageMetadata } from '../lib/pageMetadata'

interface SEOProps {
  path: string
  search?: string
}

const PRODUCTION_DOMAIN = 'https://mdj-rdp-website.vercel.app'

export default function SEO({ path, search }: SEOProps) {
  const meta = getPageMetadata(path)

  useEffect(() => {
    document.title = meta.title

    const isArcadeGameRoute = (path === '/arcade' && search?.includes('game=')) || path.startsWith('/arcade/battleship')
    const robotsValue = isArcadeGameRoute ? 'noindex, follow' : (meta.robots || 'index, follow')

    const metaTags = [
      { name: 'description', content: meta.description },
      { name: 'robots', content: robotsValue },
    ]

    metaTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', meta.canonical || `${PRODUCTION_DOMAIN}${path}`)

    // Open Graph
    const ogProps: Record<string, string> = {
      'og:title': meta.title,
      'og:description': meta.description,
      'og:type': meta.ogType || 'website',
      'og:url': meta.canonical || `${PRODUCTION_DOMAIN}${path}`,
    }
    if (meta.ogImage) {
      ogProps['og:image'] = meta.ogImage.startsWith('http') ? meta.ogImage : `${PRODUCTION_DOMAIN}${meta.ogImage}`
    }
    Object.entries(ogProps).forEach(([prop, content]) => {
      let metaEl = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
      if (!metaEl) {
        metaEl = document.createElement('meta')
        metaEl.setAttribute('property', prop)
        document.head.appendChild(metaEl)
      }
      metaEl.setAttribute('content', content)
    })

    // Twitter Card
    const twitterProps: Record<string, string> = {
      'twitter:card': meta.twitterCard || 'summary_large_image',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
    }
    if (meta.ogImage) {
      twitterProps['twitter:image'] = meta.ogImage.startsWith('http') ? meta.ogImage : `${PRODUCTION_DOMAIN}${meta.ogImage}`
    }
    Object.entries(twitterProps).forEach(([prop, content]) => {
      let metaEl = document.querySelector(`meta[name="${prop}"]`) as HTMLMetaElement | null
      if (!metaEl) {
        metaEl = document.createElement('meta')
        metaEl.setAttribute('name', prop)
        document.head.appendChild(metaEl)
      }
      metaEl.setAttribute('content', content)
    })

    return () => {
      // Do not remove meta tags on unmount to avoid flickering; they will be overwritten by next page
    }
  }, [meta.title, meta.description, meta.canonical, meta.ogImage, meta.ogType, meta.twitterCard, meta.robots, path, search])

  return null
}