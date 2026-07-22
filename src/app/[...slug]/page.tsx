import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'

interface Section {
  readonly title: string
  readonly body: string
}

interface RouteContent {
  readonly eyebrow: string
  readonly title: string
  readonly intro: string
  readonly sections: ReadonlyArray<Section>
  readonly cta?: {
    readonly label: string
    readonly href: string
  }
}

const ROUTES: Record<string, RouteContent> = {
  products: {
    eyebrow: 'Products',
    title: 'Wellness, refined for modern life.',
    intro:
      'Explore the ZeedBeez product collection through a science-led, premium lens. Product availability varies by market.',
    sections: [
      {
        title: 'ZeedBeez Pro',
        body: 'A ZeedBeez wellness product designed for the demands of modern life.',
      },
      {
        title: 'Sleep Better',
        body: 'A ZeedBeez wellness product presented with a calm, research-forward point of view.',
      },
      {
        title: 'HyperMoon & Herbze',
        body: 'Products planned for the UAE market within the shared ZeedBeez design system.',
      },
    ],
    cta: { label: 'Explore the science', href: '/research' },
  },
  'products/zeedbeez-pro': {
    eyebrow: 'ZeedBeez Pro',
    title: 'A premium wellness experience.',
    intro:
      'ZeedBeez Pro is part of the current India product horizon. Product information is presented with clarity, restraint, and no unsupported claims.',
    sections: [
      {
        title: 'Product-first presentation',
        body: 'The experience puts the product, its context, and its supporting information before promotional noise.',
      },
      {
        title: 'Research-forward approach',
        body: 'Educational material is kept separate from product claims so visitors can evaluate information clearly.',
      },
    ],
    cta: { label: 'Read our research approach', href: '/research' },
  },
  'products/sleep-better': {
    eyebrow: 'Sleep Better',
    title: 'Calm, considered wellness.',
    intro:
      'Sleep Better is part of the current India product horizon, designed within the shared ZeedBeez premium biotechnology wellness system.',
    sections: [
      {
        title: 'Clear information',
        body: 'Product communication is designed to remain readable, calm, and responsible.',
      },
      {
        title: 'Responsible language',
        body: 'ZeedBeez does not use unsupported health claims in public product storytelling.',
      },
    ],
    cta: { label: 'Discover ZeedBeez Pro', href: '/products/zeedbeez-pro' },
  },
  'products/hypermoon': {
    eyebrow: 'HyperMoon',
    title: 'A distinct product, one shared system.',
    intro:
      'HyperMoon is included in the UAE product horizon and follows the same premium, research-forward ZeedBeez visual language.',
    sections: [
      {
        title: 'Market-aware presentation',
        body: 'Regional product pages can adapt their context while preserving the core ZeedBeez brand system.',
      },
    ],
    cta: { label: 'View all products', href: '/products' },
  },
  'products/herbze': {
    eyebrow: 'Herbze',
    title: 'A distinct product, one shared system.',
    intro:
      'Herbze is included in the UAE product horizon and follows the same premium, research-forward ZeedBeez visual language.',
    sections: [
      {
        title: 'Market-aware presentation',
        body: 'Regional product pages can adapt their context while preserving the core ZeedBeez brand system.',
      },
    ],
    cta: { label: 'View all products', href: '/products' },
  },
  research: {
    eyebrow: 'Research',
    title: 'Nature, examined with care.',
    intro:
      'ZeedBeez research content is designed to educate clearly, keep evidence traceable, and separate ongoing research from published material.',
    sections: [
      {
        title: 'Ingredient research',
        body: 'Ingredient education is presented as context, not as a substitute for responsible product information.',
      },
      {
        title: 'Product research',
        body: 'Product research is handled with a focus on accuracy, traceability, and compliant communication.',
      },
      {
        title: 'A clear standard',
        body: 'Scientific credibility means avoiding unsupported claims and keeping language proportionate to available evidence.',
      },
    ],
    cta: { label: 'Explore ingredients', href: '/ingredients' },
  },
  ingredients: {
    eyebrow: 'Ingredients',
    title: 'Information before interpretation.',
    intro:
      'The ingredient experience is designed to make complex research easier to approach without overstating what the evidence supports.',
    sections: [
      {
        title: 'Traceable education',
        body: 'Ingredient material is reviewed for accuracy and connected to product context only when it is appropriate to do so.',
      },
      {
        title: 'Responsible communication',
        body: 'ZeedBeez separates educational material from claims, allowing visitors to understand context with confidence.',
      },
    ],
    cta: { label: 'Our research approach', href: '/research' },
  },
  story: {
    eyebrow: 'Our Story',
    title: 'Nature. Research. Trust.',
    intro:
      'ZeedBeez brings nature-inspired warmth, scientific credibility, and modern editorial clarity into one premium wellness experience.',
    sections: [
      {
        title: 'Nature',
        body: 'A grounding source of warmth, texture, and curiosity in the brand story.',
      },
      {
        title: 'Research',
        body: 'A disciplined approach to education, accuracy, and thoughtful product communication.',
      },
      {
        title: 'Trust',
        body: 'Built through clear language, considered design, and a refusal to overstate what products can do.',
      },
    ],
    cta: { label: 'Explore products', href: '/products' },
  },
  manufacturing: {
    eyebrow: 'Our Process',
    title: 'Quality is part of the story.',
    intro:
      'ZeedBeez treats quality and process as part of product trust, communicated with the same clarity as the rest of the brand.',
    sections: [
      {
        title: 'Considered standards',
        body: 'The public experience is designed to make quality information easy to find and easy to understand.',
      },
      {
        title: 'Responsible detail',
        body: 'Specific manufacturing information is published only when it can be presented accurately and responsibly.',
      },
    ],
    cta: { label: 'Learn about our approach', href: '/story' },
  },
  sustainability: {
    eyebrow: 'Sustainability',
    title: 'Claims deserve evidence.',
    intro:
      'ZeedBeez approaches sustainability communication with the same care applied to product and research language.',
    sections: [
      {
        title: 'Clear over broad',
        body: 'The brand avoids broad environmental claims that cannot be substantiated clearly.',
      },
      {
        title: 'Evidence-led updates',
        body: 'Future sustainability information will be published when it can be supported with meaningful detail.',
      },
    ],
    cta: { label: 'Our story', href: '/story' },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Stay close to the work.',
    intro:
      'ZeedBeez is building a public wellness experience around clear information, premium design, and responsible product storytelling.',
    sections: [
      {
        title: 'Product availability',
        body: 'Availability and market-specific information are communicated through approved product channels.',
      },
      {
        title: 'Research and media',
        body: 'Research material and brand updates are published through the public ZeedBeez website as they are approved.',
      },
    ],
    cta: { label: 'Return home', href: '/' },
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'A privacy-first public website.',
    intro:
      'This initial ZeedBeez website is a public information experience. It does not include customer accounts, ecommerce, or a customer portal.',
    sections: [
      {
        title: 'Data minimisation',
        body: 'The site is designed to avoid collecting personal information unless and until a clearly disclosed interaction requires it.',
      },
      {
        title: 'Future updates',
        body: 'Any future data-collecting feature will be accompanied by an updated privacy notice before it is made available.',
      },
    ],
    cta: { label: 'Return home', href: '/' },
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Use of this website.',
    intro:
      'The ZeedBeez website provides public brand, product, and research information for general informational purposes.',
    sections: [
      {
        title: 'Responsible use',
        body: 'Visitors should not treat website information as medical advice or as a substitute for professional guidance.',
      },
      {
        title: 'Product information',
        body: 'Product availability and supporting information may vary by market and are subject to approved updates.',
      },
    ],
    cta: { label: 'Return home', href: '/' },
  },
}

export function generateStaticParams() {
  return Object.keys(ROUTES).map((route) => ({ slug: route.split('/') }))
}

interface PublicPageProps {
  readonly params: Promise<{ slug: ReadonlyArray<string> }>
}

export async function generateMetadata({ params }: PublicPageProps): Promise<Metadata> {
  const { slug } = await params
  const path = slug.join('/')
  const page = ROUTES[path]

  if (!page) return {}

  return buildMetadata({
    title: page.title,
    description: page.intro,
    path: `/${path}`,
  })
}

export default async function PublicPage({ params }: PublicPageProps) {
  const { slug } = await params
  const path = slug.join('/')
  const page = ROUTES[path]

  if (!page) notFound()

  return (
    <article className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-36 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl">
        <p className="mb-6 text-xs tracking-widest text-gold-400 uppercase">{page.eyebrow}</p>
        <h1 className="font-display text-5xl font-light leading-none tracking-tight text-content-primary md:text-7xl">
          {page.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-content-secondary">{page.intro}</p>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {page.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-glass-border bg-glass-light p-7 shadow-dark-md backdrop-blur-sm"
          >
            <h2 className="font-display text-3xl font-light text-content-primary">{section.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-content-secondary">{section.body}</p>
          </section>
        ))}
      </div>

      {page.cta && (
        <Link
          href={page.cta.href}
          className="mt-14 inline-flex min-h-11 items-center rounded-md bg-gold-500 px-7 py-3.5 text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          {page.cta.label}
        </Link>
      )}
    </article>
  )
}
