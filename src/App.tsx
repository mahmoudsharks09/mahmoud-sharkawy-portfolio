import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTypewriter } from './hooks/useTypewriter'
import './index.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const PILL_LABELS = ['Frontend', 'React', 'Flutter', 'Spring Boot']

const EMAIL = 'mahmoud12bn5@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/mahmoud-sharkawy-bb1561249'

const CONTACT_INFO = [
  { label: 'Full name', value: 'Mahmoud Sharkawy' },
  { label: 'Phone', value: '01095098055' },
  { label: 'Email', value: EMAIL },
  { label: 'Based in', value: 'Cairo, Egypt' },
]

const EDUCATION_INFO = [
  { label: 'University', value: 'AASTMT' },
  { label: 'Major', value: 'Software Engineering' },
  { label: 'Graduation', value: '2028' },
  { label: 'Current level', value: '3rd year' },
  { label: 'Extra training', value: '6-month Full Stack course — AMIT' },
]

const SKILLS = {
  languages: ['Java', 'Python', 'C / C++', 'JavaScript', 'HTML / CSS'],
  frameworks: ['React', 'Node.js'],
  tools: ['Git / GitHub', 'VS Code', 'IntelliJ', 'Figma'],
  databases: ['MySQL'],
}

const EXPERIENCE_ITEMS = [
  ['01', 'GASCO Internship', 'Professional internship experience — 2025'],
  ['02', 'Freelancing', 'Built and shipped work for real-world requirements'],
  ['03', 'Business / Family Project', 'Applied software and problem-solving outside the classroom'],
  ['04', 'GDSC & Volunteering', 'Active in technical communities and student activities'],
]

const CERTIFICATIONS = [
  { name: 'GASCO Internship Certificate', organization: 'GASCO', year: '2025' },
]

const ACTIVITIES = ['Google Developer Student Club (GDSC)', 'Technical clubs & student activities']
const LANGUAGES = ['Arabic — Native', 'English — B2']

const CAREER_TARGETS = [
  'Software Engineering Internship',
  'Flutter Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'Junior Software Engineer',
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="4" width="8.5" height="8.5" rx="1.5" stroke="currentColor" />
      <rect x="4" y="1.5" width="8.5" height="8.5" rx="1.5" stroke="currentColor" />
    </svg>
  )
}

function Magnetic({ children, className = '', strength = 0.22 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height
    el.style.setProperty('--mx', `${x * 24 * strength}px`)
    el.style.setProperty('--my', `${y * 24 * strength}px`)
    el.style.setProperty('--ms', '1.02')
  }

  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
    el.style.setProperty('--ms', '1')
  }

  return (
    <div ref={ref} className={`magnetic ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  )
}

function Navbar({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <nav className="nav">
      <a href="#top" className="brand" aria-label="Mahmoud Sharkawy home">
        MS<span>.</span>
      </a>

      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </div>

      <Magnetic className="nav-cta">
        <a href={`mailto:${EMAIL}`}>Let's talk <ArrowIcon /></a>
      </Magnetic>

      <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={onToggleMenu} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        <span /><span />
      </button>

      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link, index) => (
            <a key={link.label} href={link.href} onClick={onToggleMenu}>
              <small>0{index + 1}</small>{link.label}
            </a>
          ))}
          <a href={`mailto:${EMAIL}`} onClick={onToggleMenu}><small>05</small>Let's talk</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const { displayed, done } = useTypewriter(
    'I turn ideas into fast, thoughtful digital experiences.',
    { speed: 42, startDelay: 900 },
  )

  return (
    <section className="hero" id="top">
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-grid" />

      <div className="hero-content">
        <p className="eyebrow"><span /> SOFTWARE ENGINEERING STUDENT · CAIRO, EGYPT</p>

        <h1>
          MAHMOUD
          <em>SHARKAWY</em>
        </h1>

        <div className="hero-bottom">
          <div className="hero-copy">
            <p className="type-line">{displayed}{!done && <span className="typewriter-cursor">|</span>}</p>
            <div className="hero-pills">
              {PILL_LABELS.map((label) => <span key={label}>{label}</span>)}
            </div>
          </div>

          <div className="hero-actions">
            <Magnetic>
              <a className="primary-btn" href="#experience">Explore my work <ArrowIcon /></a>
            </Magnetic>
            <a className="text-link" href={`mailto:${EMAIL}`}>Available for opportunities <span>↗</span></a>
          </div>
        </div>
      </div>

      <div className="scroll-hint"><span>SCROLL TO EXPLORE</span><i /></div>
      <div className="hero-index">01 <span>/</span> 07</div>
    </section>
  )
}

function SectionHeading({ index, title, text }: { index: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${-y * 8}deg`)
    el.style.setProperty('--ry', `${x * 10}deg`)
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }

  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--gx', '50%')
    el.style.setProperty('--gy', '50%')
  }

  return <div ref={ref} className={`tilt-card ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index="02" title="A little about me" text="Curious by default. Serious about the details." />
      <div className="about-layout">
        <div className="about-statement reveal">
          <p>I'm a <strong>Software Engineering student</strong> who enjoys moving between interface, logic and product thinking.</p>
          <p>I build with React on the front, and Node.js on the back. My goal isn't just to make things work — it's to make them <strong>feel intentional.</strong></p>
        </div>
        <TiltCard className="info-card reveal">
          <div className="card-glow" />
          <div className="card-label">CURRENTLY</div>
          <div className="status"><span /> Open to internships</div>
          <div className="status"><span /> Open to Part-Time Jobs</div>
          <p>Software Engineering<br />· Frontend · Full Stack · Flutter</p>
          <div className="card-footer"><span>AASTMT</span><span>2028</span></div>
        </TiltCard>
      </div>
    </section>
  )
}

function Skills() {
  const groups = [
    ['01', 'Languages', SKILLS.languages],
    ['02', 'Frameworks', SKILLS.frameworks],
    ['03', 'Tools', SKILLS.tools],
    ['04', 'Data', SKILLS.databases],
  ]

  return (
    <section id="skills" className="section">
      <SectionHeading index="03" title="The stack" text="Tools are just tools. Knowing when to use them is the skill." />
      <div className="skills-grid">
        {groups.map(([index, title, skills]) => (
          <TiltCard className="skill-card reveal" key={title as string}>
            <span className="skill-number">{index}</span>
            <h3>{title}</h3>
            <div className="skill-list">
              {(skills as string[]).map((skill) => <span key={skill}>{skill}</span>)}
            </div>
            <div className="skill-arrow">↗</div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading index="04" title="Experience" text="A growing track record, built one challenge at a time." />
      <div className="experience-list">
        {EXPERIENCE_ITEMS.map(([number, title, description]) => (
          <TiltCard className="experience-row reveal" key={number}>
            <span className="exp-number">{number}</span>
            <div className="exp-title"><h3>{title}</h3><p>{description}</p></div>
            <span className="exp-arrow">↗</span>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section id="credentials" className="section split-section">
      <div>
        <SectionHeading index="05" title="Education & credentials" />
        <TiltCard className="education-card reveal">
          <div className="card-label">EDUCATION</div>
          <h3>{EDUCATION_INFO[0].value}</h3>
          <p>{EDUCATION_INFO[1].value} · {EDUCATION_INFO[3].value}</p>
          <div className="education-meta">
            <span>{EDUCATION_INFO[2].label}</span><strong>{EDUCATION_INFO[2].value}</strong>
          </div>
        </TiltCard>
      </div>

      <div className="credentials-side">
        <div className="mini-block reveal">
          <span className="mini-label">CERTIFICATION</span>
          <h3>{CERTIFICATIONS[0].name}</h3>
          <p>{CERTIFICATIONS[0].organization} · {CERTIFICATIONS[0].year}</p>
        </div>
        <div className="mini-block reveal">
          <span className="mini-label">LANGUAGES</span>
          {LANGUAGES.map((language) => <p key={language}>{language}</p>)}
        </div>
        <div className="mini-block reveal">
          <span className="mini-label">ACTIVITIES</span>
          {ACTIVITIES.map((activity) => <p key={activity}>{activity}</p>)}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-noise" />
      <SectionHeading index="06" title="Let's build something." text="Have an internship, project, or idea? My inbox is open." />
      <div className="contact-main">
        <a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowIcon /></a>
        <div className="contact-actions">
          <button onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy email'} <CopyIcon /></button>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
      <div className="contact-details">
        {CONTACT_INFO.slice(2, 4).map((item) => (
          <div key={item.label}><span>{item.label.toUpperCase()}</span><strong>{item.value}</strong></div>
        ))}
        <div><span>TARGET</span><strong>{CAREER_TARGETS[0]}</strong></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} MAHMOUD SHARKAWY</span>
      <span>DESIGNED & BUILT WITH REACT</span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -50px' })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <Navbar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((value) => !value)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
