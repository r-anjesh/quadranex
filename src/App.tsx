import { Suspense, lazy, useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bold,
  Check,
  ChevronDown,
  Code2,
  Database,
  Gauge,
  Globe2,
  Italic,
  Layers3,
  Menu,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './App.css'

const bookingPath = '/contact/book-consultation'
const bookingFormPath = `${bookingPath}#booking-form`
const whatsappNumber = '918700259557'
const currentYear = new Date().getFullYear()
const BookingServiceSelect = lazy(() =>
  import('./BookingControls').then((module) => ({
    default: module.BookingServiceSelect,
  })),
)
const BookingDatePicker = lazy(() =>
  import('./BookingControls').then((module) => ({
    default: module.BookingDatePicker,
  })),
)
const BookingTimeSelect = lazy(() =>
  import('./BookingControls').then((module) => ({
    default: module.BookingTimeSelect,
  })),
)

function localDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const minimumBookingDate = localDateString(new Date())
const bookingServiceOptions = [
  { value: 'Web Design & Development', label: 'Web Design & Development' },
  { value: 'Website Maintenance', label: 'Website Maintenance' },
  { value: 'SEO & Online Presence', label: 'SEO & Online Presence' },
  { value: 'E-commerce Solutions', label: 'E-commerce Solutions' },
  { value: 'IT Support Services', label: 'IT Support Services' },
]
const bookingTimeOptions = [
  { value: 'ASAP (within 30 minutes)', label: 'ASAP (within 30 minutes)' },
  { value: 'Morning (9AM – 12PM)', label: 'Morning (9AM – 12PM)' },
  { value: 'Afternoon (1PM – 4PM)', label: 'Afternoon (1PM – 4PM)' },
  { value: 'Evening (5PM – 7PM)', label: 'Evening (5PM – 7PM)' },
]

const services = [
  {
    title: 'Website Design',
    description:
      'Custom, responsive web experiences that turn your brand into your hardest-working growth channel.',
    icon: MonitorSmartphone,
    to: '/services/website-design',
  },
  {
    title: 'Digital Presence',
    description:
      'Build a consistent, confident brand across the places your customers discover and evaluate you.',
    icon: Globe2,
    to: '/services/advanced',
  },
  {
    title: 'SEO & Visibility',
    description:
      'Get found by the right people with a strong technical foundation and a clear organic strategy.',
    icon: Search,
    to: '/services/website-design',
  },
  {
    title: 'Web Performance',
    description:
      'Fast-loading, resilient experiences designed to keep visitors engaged and moving forward.',
    icon: Gauge,
    to: '/services/advanced',
  },
  {
    title: 'Web Maintenance',
    description:
      'Keep your digital foundation current with proactive care, updates, and ongoing optimization.',
    icon: Wrench,
    to: '/services/advanced',
  },
  {
    title: 'Ongoing Support',
    description:
      'Get thoughtful technical support from a team ready to help you adapt and scale.',
    icon: ShieldCheck,
    to: bookingPath,
  },
]

const caseStudies = [
  {
    id: 'lumina-case',
    name: 'Lumina Luxury Retails',
    category: 'E-commerce · Luxury retail',
    description:
      'A legacy brick-and-mortar retailer moved to a high-converting Shopify Plus experience built for global growth.',
    metrics: [
      ['+140%', 'Engagement'],
      ['+45%', 'Conversion'],
      ['$2.4M', 'New revenue'],
    ],
    icon: ShoppingBag,
    tone: 'case-lavender',
  },
  {
    id: 'syncpath-case',
    name: 'SyncPath Systems',
    category: 'B2B SaaS · Search',
    description:
      'A strategic SEO overhaul and performance optimization helped a B2B platform build a stronger path to discovery.',
    metrics: [
      ['3.2s', 'Load speed'],
      ['+300%', 'Organic leads'],
      ['−22%', 'Operating costs'],
    ],
    icon: BarChart3,
    tone: 'case-blue',
  },
  {
    id: 'vault-case',
    name: 'VaultSecure Bank',
    category: 'Financial services · Security',
    description:
      'Modernized legacy banking interfaces with a focus on cyber resilience and customer-first security design.',
    metrics: [
      ['99.9%', 'Reliability'],
      ['Zero', 'Breaches'],
      ['+80%', 'Mobile users'],
    ],
    icon: ShieldCheck,
    tone: 'case-navy',
  },
  {
    id: 'apex-case',
    name: 'Apex Global Logistics',
    category: 'Logistics · Custom software',
    description:
      'A custom fleet dashboard brought real-time tracking and automated reporting into one operational view.',
    metrics: [
      ['−15%', 'Fuel waste'],
      ['100%', 'Visibility'],
      ['+500', 'Assets tracked'],
    ],
    icon: Layers3,
    tone: 'case-peach',
  },
]

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Quadranex IT Solutions | Digital Growth',
    description:
      'High-performance websites, digital solutions, and ongoing support for businesses ready to grow.',
  },
  '/services/website-design': {
    title: 'Website Design Services | Quadranex',
    description:
      'Strategic, high-performance website design engineered for business growth.',
  },
  '/case-studies': {
    title: 'Case Studies & Portfolio | Quadranex',
    description:
      'Explore Quadranex digital transformation projects and their reported business outcomes.',
  },
  [bookingPath]: {
    title: 'Book a Consultation | Quadranex',
    description:
      'Tell us about your goals and request a complimentary digital strategy consultation.',
  },
  '/services/advanced': {
    title: 'Advanced Digital Solutions | Quadranex',
    description:
      'E-commerce, continuous support, and digital growth solutions from Quadranex.',
  },
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services/website-design' },
    { label: 'Case studies', to: '/case-studies' },
    { label: 'Contact', to: bookingPath },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Quadranex home">
          <img className="brand-logo" src="/quadranex-logo.png" alt="Quadranex IT Solutions" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (
                isActive || (item.label === 'Services' && location.pathname.startsWith('/services/'))
                  ? 'active'
                  : undefined
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="button button-small" to={bookingPath} onClick={() => setMenuOpen(false)}>
            Book strategy call <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  const location = useLocation()

  function handleBookingLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (location.pathname !== bookingPath) return

    event.preventDefault()
    window.requestAnimationFrame(() => {
      document.getElementById('booking-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark wordmark-inverse" to="/">
            <img className="brand-logo" src="/quadranex-logo.png" alt="Quadranex IT Solutions" />
          </Link>
          <p>
            Thoughtful technology and digital experiences, built around your
            next stage of growth.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">Explore</span>
            <Link to="/">Home</Link>
            <Link to="/services/website-design">Website design</Link>
            <Link to="/services/advanced">Advanced solutions</Link>
          </div>
          <div>
            <span className="footer-label">Discover</span>
            <Link to="/case-studies">Case studies</Link>
            <Link to={bookingFormPath} onClick={handleBookingLinkClick}>Contact</Link>
            <Link to={bookingFormPath} onClick={handleBookingLinkClick}>Book a consultation</Link>
          </div>
        </div>
        <div className="footer-cta">
          <span className="footer-label">Have a project in mind?</span>
          <h2>Let’s make the next move count.</h2>
          <Link className="button button-light" to={bookingFormPath} onClick={handleBookingLinkClick}>
            Talk with our team <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} Quadranex IT Solutions</span>
        <span>Digital work, designed to move business forward.</span>
      </div>
    </footer>
  )
}

function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string
  children: ReactNode
  secondary?: boolean
}) {
  return (
    <Link className={`button${secondary ? ' button-outline' : ''}`} to={to}>
      {children} <ArrowUpRight size={16} />
    </Link>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </span>
  )
}

function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string
  title: string
  accent?: string
  description: string
}) {
  return (
    <section className="page-intro section-pad">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>
          {title}
          {accent && <> <span className="text-blue">{accent}</span></>}
        </h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function HomePage() {
  const metrics = [
    ['12+', 'Years experience'],
    ['250%', 'Avg. revenue growth'],
    ['45+', 'Global partners'],
    ['99.9%', 'Uptime reliability'],
  ]

  const principles = [
    {
      number: '01',
      title: 'Market superiority',
      description:
        'Outpace competitors with digital experiences designed for speed, clarity, and conversion.',
    },
    {
      number: '02',
      title: 'Operational efficiency',
      description:
        'Connect the right systems and simplify complex workflows as your business grows.',
    },
    {
      number: '03',
      title: 'Future-proofing',
      description:
        'Build on a flexible foundation that can grow with your next opportunity.',
    },
  ]

  return (
    <>
      <main>
        <section className="home-hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <Eyebrow>Digital transformation partner</Eyebrow>
              <h1>
                Build your
                <br />
                <span className="text-blue">online presence</span>
                <br />
                to scale fast.
              </h1>
              <p className="hero-description">
                We craft high-performance websites that serve as your 24/7
                growth engine. Professional web design and maintenance to help
                your business move forward.
              </p>
              <div className="button-row">
                <ButtonLink to={bookingPath}>Start growing now</ButtonLink>
                <ButtonLink to="/case-studies" secondary>
                  Our portfolio
                </ButtonLink>
              </div>
              <div className="hero-note">
                <span className="note-line" />
                Strategy, design, and technology — working as one.
              </div>
            </div>
            <div className="hero-art" aria-label="Featured digital transformation">
              <div className="art-grid" />
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-window">
                <div className="window-top">
                  <span /><span /><span />
                  <div className="window-address" />
                </div>
                <div className="window-content">
                  <div className="window-kicker">DIGITAL COMMERCE</div>
                  <div className="window-title">A better way<br />to do business.</div>
                  <div className="window-copy" />
                  <div className="window-cta" />
                  <div className="window-image"><ShoppingBag size={42} strokeWidth={1.2} /></div>
                </div>
              </div>
              <div className="art-project-card">
                <div className="project-card-top">
                  <span className="project-indicator" />
                  Featured transformation
                  <ArrowUpRight size={15} />
                </div>
                <strong>Commerce, reimagined.</strong>
                <span>Digital experiences built for growth</span>
              </div>
              <div className="art-index">01 — 05</div>
              <div className="art-cross" aria-hidden="true">+</div>
            </div>
          </div>
          <div className="container hero-scroll">
            <span>Built for your next chapter</span>
            <ArrowDownRight size={17} />
          </div>
        </section>

        <section className="metrics-strip">
          <div className="container metrics-grid">
            {metrics.map(([value, label]) => (
              <div className="metric" key={label}>
                <span>{value}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section-pad services-section">
          <div className="container">
            <div className="section-heading section-heading-split">
              <div>
                <Eyebrow>What we do</Eyebrow>
                <h2>Complete digital presence for <span className="text-blue">growing businesses.</span></h2>
              </div>
              <p>
                The right digital foundation changes what your business can
                do. We bring the strategy and craft to make it happen.
              </p>
            </div>
            <div className="services-grid">
              {services.map(({ title, description, icon: Icon, to }, index) => (
                <Link className="service-card" to={to} key={title}>
                  <div className="service-card-top">
                    <span className="service-icon"><Icon size={22} strokeWidth={1.7} /></span>
                    <span className="service-index">0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="card-link">Explore service <ArrowUpRight size={15} /></span>
                </Link>
              ))}
            </div>
            <div className="service-bottom-link">
              <Link to="/services/advanced">Explore our advanced solutions <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="growth-section section-pad">
          <div className="container growth-grid">
            <div className="growth-heading">
              <Eyebrow>Beyond the build</Eyebrow>
              <h2>We don’t just build tech.<br /><span className="text-blue">We engineer growth.</span></h2>
              <p>
                Great technology creates room for better business. We connect
                ambitious ideas to practical digital systems.
              </p>
              <Link className="text-link" to="/services/advanced">How we help you grow <ArrowRight size={16} /></Link>
            </div>
            <div className="principles-list">
              {principles.map((item) => (
                <article className="principle" key={item.number}>
                  <span className="principle-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ArrowUpRight className="principle-arrow" size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonial-section section-pad">
          <div className="container testimonial-card">
            <div className="quote-mark" aria-hidden="true">“</div>
            <div className="testimonial-content">
              <Eyebrow>Partnership in practice</Eyebrow>
              <blockquote>
                Quadranex transformed our outdated site into a streamlined
                growth engine. Within 6 months of the overhaul, our online
                engagement increased by 140% and our operational costs dropped
                by 22%.
              </blockquote>
              <div className="testimonial-author">
                <span className="author-avatar">SM</span>
                <span><strong>Sarah Montgomery</strong><small>CTO, Global Logistics Corp</small></span>
              </div>
            </div>
            <span className="testimonial-side-label">CLIENT PERSPECTIVE — 01</span>
          </div>
        </section>

        <Callout />
      </main>
    </>
  )
}

function Callout({
  title = 'Ready to define your digital legacy?',
  description = 'Stop reacting to the market. Start leading it. Let’s audit your digital ecosystem and build a roadmap for what comes next.',
  action = 'Schedule your free consultation',
}: {
  title?: string
  description?: string
  action?: string
}) {
  return (
    <section className="callout-section section-pad">
      <div className="container callout">
        <div className="callout-pattern" aria-hidden="true" />
        <div className="callout-content">
          <Eyebrow>Let’s build what’s next</Eyebrow>
          <h2>{title}</h2>
          <p>{description}</p>
          <ButtonLink to={bookingPath}>{action}</ButtonLink>
        </div>
        <span className="callout-coordinate">QX / 01</span>
      </div>
    </section>
  )
}

function WebsiteDesignPage() {
  const benefits = [
    { title: 'Lightning speed', text: 'Optimized code and asset delivery for a faster experience.', icon: Zap },
    { title: 'Adaptive layouts', text: 'Thoughtful experiences from mobile to ultra-wide screens.', icon: MonitorSmartphone },
    { title: 'SEO foundation', text: 'Semantic structure and metadata built in from day one.', icon: Search },
    { title: 'Ironclad security', text: 'Security-conscious architecture and trusted practices.', icon: ShieldCheck },
    { title: 'UX centricity', text: 'Intuitive journeys that reduce friction at every step.', icon: Sparkles },
    { title: 'Analytics ready', text: 'A clear foundation for measuring meaningful outcomes.', icon: BarChart3 },
  ]

  const faqs = [
    ['How long does a website project take?', 'Timelines depend on the scope, content, and integrations involved. We map out milestones together before work begins.'],
    ['Can you improve an existing website?', 'Yes. We can audit an existing site, identify the highest-impact opportunities, and recommend a practical redesign or optimization plan.'],
    ['Will my website work on mobile?', 'Responsive behavior is part of the design process, with layouts and interactions considered for phone, tablet, and desktop.'],
    ['Do you provide ongoing support?', 'We can discuss ongoing maintenance and support options tailored to your site and team.'],
  ]

  return (
    <main>
      <PageIntro
        eyebrow="Website design services"
        title="Strategic website design"
        accent="engineered for growth."
        description="We don’t just build sites; we architect digital storefronts that act as a 24/7 sales force. High-performance, SEO-ready, and conversion-focused."
      />
      <section className="service-feature section-pad">
        <div className="container feature-grid">
          <div className="feature-copy">
            <Eyebrow>Beyond aesthetics</Eyebrow>
            <h2>High-performance <span className="text-blue">architecture.</span></h2>
            <p>
              A beautiful site matters. So does the performance underneath it.
              We begin with your business goals, audience, and competitive
              landscape, then shape a custom UI/UX strategy around speed,
              accessibility, and intuitive navigation.
            </p>
            <ButtonLink to={bookingPath}>Start your transformation</ButtonLink>
          </div>
          <div className="architecture-visual">
            <div className="architecture-orbit" />
            <div className="architecture-core"><Code2 size={44} strokeWidth={1.2} /></div>
            <span className="architecture-label label-top">DESIGN SYSTEM</span>
            <span className="architecture-label label-right">PERFORMANCE</span>
            <span className="architecture-label label-bottom">ACCESSIBILITY</span>
            <span className="architecture-label label-left">STRATEGY</span>
            <div className="architecture-tag"><span /> Built around your goals</div>
          </div>
        </div>
      </section>
      <section className="section-pad benefits-section">
        <div className="container">
          <div className="section-heading">
            <Eyebrow>Why Quadranex design</Eyebrow>
            <h2>Every detail has a <span className="text-blue">job to do.</span></h2>
          </div>
          <div className="benefits-grid">
            {benefits.map(({ title, text, icon: Icon }) => (
              <article className="benefit-card" key={title}>
                <span className="benefit-icon"><Icon size={21} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad service-cases-section">
        <div className="container">
          <div className="section-heading section-heading-split">
            <div><Eyebrow>Selected work</Eyebrow><h2>Proven <span className="text-blue">transformations.</span></h2></div>
            <p>From digital health to financial services, we build experiences around real business needs.</p>
          </div>
          <div className="mini-case-grid">
            <article className="mini-case mini-case-telehealth">
              <span className="mini-case-index">01 / DIGITAL HEALTH</span>
              <Globe2 size={27} />
              <h3>Global Telehealth Network</h3>
              <p><strong>Challenge</strong> — A slow legacy site created friction during appointment booking.</p>
              <p><strong>Solution</strong> — A custom headless experience designed around clear, accessible patient journeys.</p>
            </article>
            <article className="mini-case mini-case-neobank">
              <span className="mini-case-index">02 / FINANCIAL SERVICES</span>
              <Database size={27} />
              <h3>NeoBank Enterprise</h3>
              <p><strong>Challenge</strong> — Inconsistent branding and low mobile trust scores.</p>
              <p><strong>Solution</strong> — A complete UI overhaul focused on trust indicators and mobile-first UX.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section-pad faq-section">
        <div className="container faq-grid">
          <div><Eyebrow>Good to know</Eyebrow><h2>Service <span className="text-blue">FAQs.</span></h2><p>Have a question we haven’t covered? Start a conversation and we’ll help you find the right next step.</p><Link className="text-link" to={bookingPath}>Talk to our team <ArrowRight size={16} /></Link></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>
      <Callout title="Ready for a digital leap?" description="Our design team can audit your current website and help map a roadmap for your next-generation digital presence." action="Start your transformation" />
    </main>
  )
}

function CaseStudiesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Case studies & portfolio"
        title="Our success stories."
        accent="Real results, real impact."
        description="Explore how Quadranex has helped businesses rebuild their digital foundations, expand their online presence, and pursue measurable growth."
      />
      <section className="section-pad portfolio-section">
        <div className="container">
          <div className="portfolio-toolbar">
            <span><span className="toolbar-dot" /> SELECTED PROJECTS</span>
            <span>01 — 04 <span className="toolbar-divider">/</span> 2026</span>
          </div>
          <div className="portfolio-grid">
            {caseStudies.map(({ id, name, category, description, metrics: items, icon: Icon, tone }, index) => (
              <article className="portfolio-card" id={id} key={id}>
                <div className={`portfolio-art ${tone}`}>
                  <span className="portfolio-art-index">CASE / 0{index + 1}</span>
                  <div className="portfolio-art-symbol"><Icon size={44} strokeWidth={1.2} /></div>
                  <span className="portfolio-art-orbit" />
                  <span className="portfolio-art-cross">+</span>
                  <span className="portfolio-art-label">{category.split(' · ')[0]}</span>
                </div>
                <div className="portfolio-card-content">
                  <div className="portfolio-title-row"><div><span className="case-category">{category}</span><h2>{name}</h2></div><ArrowUpRight size={20} /></div>
                  <p>{description}</p>
                  <div className="case-metrics">{items.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
                  <details className="case-study-details">
                    <summary>View full case study <ArrowRight size={15} /></summary>
                    <p>{description} Reported outcomes: {items.map(([value, label]) => `${value} ${label.toLowerCase()}`).join(' · ')}. These draft results require client verification before publication.</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <p className="draft-content-note">Project names and outcome figures are draft content and should be confirmed with Quadranex before public launch.</p>
        </div>
      </section>
      <section className="section-pad portfolio-testimonial-section">
        <div className="container portfolio-testimonial">
          <span className="quote-mark" aria-hidden="true">“</span>
          <div><Eyebrow>A partner’s perspective</Eyebrow><blockquote>Working with Quadranex wasn’t just about getting a new website; it was about reimagining our entire business for the digital age. The results speak for themselves.</blockquote><p><strong>Marcus Chen</strong><span>Client partner</span></p></div>
        </div>
      </section>
      <Callout title="Ready to see your company here?" description="Let’s engineer your digital transformation and make your next chapter a success story." action="Apply for a consultation" />
    </main>
  )
}

type BookingForm = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  details: string
}

function BookingPage() {
  const location = useLocation()
  const queryService = new URLSearchParams(location.search).get('service') ?? ''
  const [form, setForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    service: queryService,
    date: '',
    time: '',
    details: '',
  })
  const [status, setStatus] = useState<'idle' | 'prepared'>('idle')
  const [message, setMessage] = useState('')
  const [shareConsent, setShareConsent] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const detailsRef = useRef<HTMLTextAreaElement>(null)

  function updateField<K extends keyof BookingForm>(field: K, value: BookingForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
      setWhatsappUrl('')
    }
  }

  function updateShareConsent(checked: boolean) {
    setShareConsent(checked)
    setStatus('idle')
    setMessage('')
    setWhatsappUrl('')
  }

  function formatDetails(marker: '*' | '_') {
    const textarea = detailsRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd } = textarea
    const selectedText = form.details.slice(selectionStart, selectionEnd)
    const nextDetails =
      form.details.slice(0, selectionStart) +
      marker +
      selectedText +
      marker +
      form.details.slice(selectionEnd)

    updateField('details', nextDetails)
    window.requestAnimationFrame(() => {
      textarea.focus()
      const selectionOffset = selectionStart + marker.length
      textarea.setSelectionRange(
        selectionOffset,
        selectionOffset + selectedText.length,
      )
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const messageLines = [
      'Hello Quadranex, I would like to request a strategy consultation.',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Interested service: ${form.service || 'Not provided'}`,
      `Preferred date: ${form.date}`,
      `Preferred time: ${form.time} (${timeZone})`,
      `Project details: ${form.details || 'Not provided'}`,
    ]
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`
    setWhatsappUrl(url)
    setStatus('prepared')
    setMessage('Your details are ready in WhatsApp. Review the message and tap Send there to contact Quadranex.')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="booking-page">
      <div className="container booking-layout">
        <aside className="booking-aside">
          <Eyebrow>Let’s talk about your next move</Eyebrow>
          <h1>Design your<br /><span className="text-blue">growth path.</span></h1>
          <p>Schedule a complimentary strategy call with our experts. We’ll explore your digital footprint and outline a clear roadmap for what comes next.</p>
          <div className="booking-benefits">
            <div><span><Search size={19} /></span><div><strong>Digital audit</strong><small>A focused look at your website performance and visibility.</small></div></div>
            <div><span><Layers3 size={19} /></span><div><strong>Custom proposal</strong><small>A practical plan shaped around your goals and needs.</small></div></div>
          </div>
          <div className="booking-quote">
            <span className="booking-quote-mark">“</span>
            <p>The strategy call was the most productive 30 minutes for our marketing team this year. Clear, actionable, and zero fluff.</p>
            <strong>David Chen</strong><small>CEO, CloudScale Systems</small>
          </div>
        </aside>
        <section className="booking-form-panel" id="booking-form">
          <div className="booking-form-heading">
            <div><Eyebrow>Complimentary · 30 minutes</Eyebrow><h2>Book your strategy call</h2></div>
            <span className="booking-step">01 <span>/ 01</span></span>
          </div>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Full name <span className="required-mark">*</span><input name="name" autoComplete="name" placeholder="Jane Smith" required value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label>
              <label>Email address <span className="required-mark">*</span><input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label>
            </div>
            <div className="form-row">
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
              <label htmlFor="booking-service">Interested service <span className="required-mark">*</span><Suspense fallback={<span className="booking-control-loading">Loading options…</span>}><BookingServiceSelect
                value={form.service}
                options={bookingServiceOptions}
                onChange={(value) => updateField('service', value)}
              /></Suspense></label>
            </div>
            <div className="form-row">
              <label htmlFor="booking-date">Preferred date <span className="required-mark">*</span><Suspense fallback={<span className="booking-control-loading">Loading calendar…</span>}><BookingDatePicker
                value={form.date}
                minDate={minimumBookingDate}
                onChange={(value) => updateField('date', value)}
              /></Suspense></label>
              <label htmlFor="booking-time">Preferred time <span className="required-mark">*</span><Suspense fallback={<span className="booking-control-loading">Loading options…</span>}><BookingTimeSelect
                value={form.time}
                options={bookingTimeOptions}
                onChange={(value) => updateField('time', value)}
                placeholder="Choose a time window"
              /></Suspense></label>
            </div>
            <label htmlFor="booking-details">Project details</label>
            <div className="details-editor">
              <div className="details-toolbar" role="toolbar" aria-label="Project details formatting">
                <button type="button" aria-label="Bold selected text" title="Bold for WhatsApp" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDetails('*')}><Bold size={16} /></button>
                <button type="button" aria-label="Italicize selected text" title="Italic for WhatsApp" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDetails('_')}><Italic size={16} /></button>
              </div>
              <textarea id="booking-details" ref={detailsRef} name="details" rows={4} maxLength={1000} placeholder="Tell us a little about your business goals..." value={form.details} onChange={(event) => updateField('details', event.target.value)} />
            </div>
            <span className="form-field-hint">{form.details.length}/1000 characters; included in the WhatsApp message.</span>
            {message && <div className={`form-status form-status-${status}`} role="status"><Check size={18} /><span>{message}{status === 'prepared' && whatsappUrl && <> <a href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp message</a>.</>}</span></div>}
            <label className="consent-label"><input type="checkbox" required checked={shareConsent} onChange={(event) => updateShareConsent(event.target.checked)} /><span>I agree to open WhatsApp with these details prefilled for Quadranex at +91 87002 59557. They will only be sent if I tap Send in WhatsApp.</span></label>
            <button className="button form-submit" type="submit">Continue to WhatsApp <ArrowUpRight size={16} /></button>
            <p className="form-footnote"><ShieldCheck size={15} /> Your information is placed in a WhatsApp message link so you can review it before sending. WhatsApp’s privacy terms apply after you open the link.</p>
          </form>
        </section>
      </div>
    </main>
  )
}

function AdvancedSolutionsPage() {
  const maintenance = [
    { title: 'Security shield', description: 'Proactive patch management and threat monitoring help keep your digital operations resilient.', bullets: ['Scheduled security reviews', 'Reliable backup planning', 'Clear incident response'], icon: ShieldCheck },
    { title: 'Core optimization', description: 'Performance tuning helps your site stay responsive as its content and audience grow.', bullets: ['Asset optimization', 'Performance reviews', 'Caching guidance'], icon: Gauge },
    { title: 'On-demand support', description: 'Practical support for content updates, new features, and technical questions.', bullets: ['A clear support process', 'Prioritized requests', 'Regular check-ins'], icon: Wrench },
  ]
  const acceleration = [
    { title: 'Digital footprint audit', description: 'A considered review of your current online visibility and technical foundations.', icon: Search },
    { title: 'Omnichannel presence', description: 'A consistent web identity across the customer touchpoints that matter to your business.', icon: Globe2 },
    { title: 'Analytics evolution', description: 'Move from basic reporting toward insights that can inform your next decisions.', icon: BarChart3 },
  ]

  return (
    <main>
      <PageIntro
        eyebrow="Beyond traditional web design"
        title="Advanced solutions for"
        accent="digital dominance."
        description="From specialized e-commerce experiences to ongoing maintenance, build the technical foundation your next stage of growth requires."
      />
      <section className="section-pad ecommerce-section" id="ecomxtra-feature">
        <div className="container ecommerce-grid">
          <div className="ecommerce-art">
            <span className="ecommerce-art-label">FEATURED SOLUTION / 01</span>
            <div className="ecommerce-device">
              <div className="ecommerce-device-bar"><span /><span /><span /></div>
              <div className="ecommerce-device-body"><span>YOUR NEXT FAVORITE</span><strong>Objects<br />with purpose.</strong><i /><b /></div>
            </div>
            <div className="ecommerce-badge"><ShoppingBag size={17} /> COMMERCE, CONSIDERED</div>
          </div>
          <div className="ecommerce-copy">
            <Eyebrow>Featured solution · EcomXtra</Eyebrow>
            <h2>E-commerce<br /><span className="text-blue">built to sell.</span></h2>
            <p>We develop bespoke shopping experiences designed to remove friction. EcomXtra is one example of a tailored commerce approach built to help businesses scale beyond the limitations of a template.</p>
            <div className="ecommerce-points"><div><Zap size={18} /><span><strong>Thoughtful checkout</strong><small>Clear, responsive purchase journeys.</small></span></div><div><Database size={18} /><span><strong>Connected operations</strong><small>Plan integrations with inventory and fulfillment systems.</small></span></div></div>
            <Link className="text-link" to={`${bookingPath}?service=E-commerce+Solutions`}>Explore e-commerce solutions <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="section-pad maintenance-section">
        <div className="container">
          <div className="section-heading section-heading-split">
            <div><Eyebrow>Support that keeps you moving</Eyebrow><h2>Never go dark.<br /><span className="text-blue">Continuous support.</span></h2></div>
            <p>Launching is just the beginning. Ongoing care can help your digital asset evolve as your business and the market change.</p>
          </div>
          <div className="maintenance-grid">
            {maintenance.map(({ title, description, bullets, icon: Icon }) => <article className="maintenance-card" key={title}><span className="service-icon"><Icon size={22} /></span><h3>{title}</h3><p>{description}</p><ul>{bullets.map((bullet) => <li key={bullet}><Check size={14} /> {bullet}</li>)}</ul></article>)}
          </div>
        </div>
      </section>
      <section className="section-pad acceleration-section">
        <div className="container acceleration-grid">
          <div><Eyebrow>Make the next move count</Eyebrow><h2>Advanced growth <span className="text-blue">acceleration.</span></h2><p>Build a stronger view of where you are today, then shape an intentional path forward.</p><ButtonLink to={bookingPath}>Schedule a systems audit</ButtonLink></div>
          <div className="acceleration-list">{acceleration.map(({ title, description, icon: Icon }, index) => <article key={title}><span className="acceleration-number">0{index + 1}</span><span className="acceleration-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={17} /></article>)}</div>
        </div>
      </section>
      <section className="section-pad solution-testimonial-section"><div className="container solution-testimonial"><span className="quote-mark" aria-hidden="true">“</span><div><Eyebrow>From the field</Eyebrow><blockquote>Quadranex’s maintenance plan isn’t just an insurance policy; it’s a growth strategy. Our site speed improved by 40% in the first quarter of their oversight.</blockquote><p><strong>Marcus Chen</strong><span>Director of Operations, TechFlow Inc</span></p></div><span className="testimonial-side-label">CLIENT PERSPECTIVE — 02</span></div></section>
      <Callout title="Secure your digital competitive advantage." description="Whether you need a commerce build or reliable ongoing maintenance, let’s find the right technical path forward." action="Schedule a systems audit" />
    </main>
  )
}

function NotFoundPage() {
  return <main className="not-found"><div className="container"><Eyebrow>404 · Not found</Eyebrow><h1>That page isn’t here.</h1><p>The page may have moved. Let’s get you back to the right place.</p><ButtonLink to="/">Back to home</ButtonLink></div></main>
}

function App() {
  const location = useLocation()
  const metadata = pageMetadata[location.pathname] ?? {
    title: 'Page not found | Quadranex',
    description: 'Explore digital solutions from Quadranex IT Solutions.',
  }

  useEffect(() => {
    document.title = metadata.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = metadata.description
    const frame = window.requestAnimationFrame(() => {
      if (location.hash === '#booking-form') {
        document.getElementById('booking-form')?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        })
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, location.pathname, metadata.description, metadata.title])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content">
        <div className="route-transition" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/website-design" element={<WebsiteDesignPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path={bookingPath} element={<BookingPage />} />
            <Route path="/services/advanced" element={<AdvancedSolutionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default App
