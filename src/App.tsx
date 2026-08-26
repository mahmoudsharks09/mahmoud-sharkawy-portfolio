import { useEffect, useState } from 'react'
import { useTypewriter } from './hooks/useTypewriter'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const PILL_LABELS = [
  'Frontend developer',
  'Seeking internships',
  'Software engineering student',
  'React & Flutter',
]

const EMAIL = 'mahmoud12bn5@gmail.com'

const CONTACT_INFO = [
  { label: 'Full name', value: 'Mahmoud Sharkawy' },
  { label: 'Phone number', value: '01095098055' },
  { label: 'Professional email', value: 'mahmoud12bn5@gmail.com' },
  { label: 'City', value: 'Cairo, Egypt' },
  { label: 'LinkedIn', value: 'linkedin.com/in/mahmoud-sharkawy-bb1561249' },
]

const EDUCATION_INFO = [
  { label: 'University', value: 'Arab Academy for Science, Technology & Maritime Transport (AASTMT)' },
  { label: 'Major', value: 'Software Engineering' },
  { label: 'Expected graduation year', value: '2028' },
  { label: 'Current year / level', value: '3rd year student' },
  { label: 'Course', value: 'Full stack course in AMIT for 6 months' },
]

const SKILLS = {
  languages: ['Java', 'Python', 'C/C++', 'JavaScript', 'HTML/CSS'],
  frameworks: ['Flutter', 'Spring / Spring Boot', 'React', 'Node.js'],
  tools: ['Git / GitHub', 'VS Code', 'IntelliJ', 'Figma'],
  databases: ['MySQL'],
}

const EXPERIENCE_ITEMS = [
  'Internship in GASCO',
  'Freelancing: Yes',
  'Software development work: No',
  'Family/business project where I worked: Yes',
  'Volunteer technical work: Ashering',
  'Part-time job: No',
]

const CERTIFICATIONS = [
  { name: 'GASCO internship certificate', organization: 'Gasco', year: '2025' },
]

const ACTIVITIES = ['Google Developer Student Club (GDSC): Yes', 'Other clubs / organizations: Yes']

const LANGUAGES = ['Arabic: Native', 'English: B2']

const CAREER_TARGETS = [
  'Software Engineering Internship',
  'Flutter Developer Internship',
  'Backend Developer Internship',
  'Full-Stack Internship',
  'Junior Software Engineer',
]

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function Navbar({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean
  onToggleMenu: () => void
}) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 backdrop-blur-sm">
        <div className="flex flex-row items-center gap-3">
          <span
            className="text-white tracking-tight text-[21px] sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            MAHMOUD SHARKAWY
          </span>
          <span
            aria-hidden="true"
            className="text-white select-none text-[25px] sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            {/* ✳︎ */}
          </span>
        </div>

        <div className="hidden md:flex flex-row items-center text-white text-[18px] gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:opacity-60 transition-opacity">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="hidden md:inline text-white text-[18px] underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
        >
          <span
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translate(4px, 7px)' : 'none',
            }}
          />
          <span
            className="w-6 h-[2px] bg-white transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -7px)' : 'none',
            }}
          />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-[20] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onToggleMenu}
            className="text-white text-[30px] font-medium hover:opacity-60 transition-opacity"
          >
            {link.label}
          </a>
        ))}
        <a
          href={`mailto:${EMAIL}`}
          onClick={onToggleMenu}
          className="text-white text-[30px] font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}

function IntroLabel({ visible }: { visible: boolean }) {
  return (
    <p
      aria-hidden="true"
      className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
      style={{
        fontSize: 'clamp(18px, 4vw, 26px)',
        lineHeight: 1.3,
        fontWeight: 400,
        filter: visible ? 'blur(0px)' : 'blur(4px)',
        opacity: visible ? 1 : 0.9,
        transition: 'filter 0.25s ease, opacity 0.25s ease',
      }}
    >
      Software engineering student,
      <br />
      frontend-focused and eager to build.
    </p>
  )
}

function TypewriterText() {
  const { displayed, done } = useTypewriter(
    'Frontend developer seeking internships and part-time opportunities in web and app development.',
    { speed: 34, startDelay: 600 },
  )

  return (
    <p
      className="text-white mb-5 sm:mb-6"
      style={{
        fontSize: 'clamp(18px, 4vw, 26px)',
        lineHeight: 1.35,
        fontWeight: 400,
        minHeight: '54px',
      }}
    >
      {displayed}
      {!done && (
        <span
          aria-hidden="true"
          className="typewriter-cursor inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]"
        />
      )}
    </p>
  )
}

function ActionPills() {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timeout)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard access denied; fail silently
    }
  }

  return (
    <div
      className="flex flex-wrap gap-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {PILL_LABELS.map((label) => (
        <button
          key={label}
          type="button"
          className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
        >
          {label}
        </button>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
      >
        <span>
          Email:{' '}
          <span className="underline underline-offset-1">{copied ? 'Copied!' : EMAIL}</span>
        </span>
        <CopyIcon />
      </button>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6 tracking-tight">{title}</h2>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [textActive, setTextActive] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setScrollProgress(nextProgress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const bgGlowX = 18 + scrollProgress * 54
  const bgGlowY = 12 + scrollProgress * 48

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        background: `linear-gradient(135deg, #120303 0%, #2b0505 14%, #050505 38%, #1d0202 68%, #050505 100%)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-[-10%] transition-transform duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at ${bgGlowX}% ${bgGlowY}%, rgba(255, 60, 60, 0.42), rgba(255, 60, 60, 0.18) 18%, rgba(0,0,0,0.12) 32%, transparent 60%)`,
            transform: `translateY(${scrollProgress * -30}px) scale(1.2)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_55%)]" />
      </div>

      <Navbar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />

      <main className="relative z-[1]">
        <section className="relative min-h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
          <div
            className="max-w-xl relative z-10"
            onMouseEnter={() => setTextActive(true)}
            onMouseLeave={() => setTextActive(false)}
          >
            <IntroLabel visible={textActive} />
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.06em] text-white mb-4">
              MAHMOUD SHARKAWY
            </h1>
            <TypewriterText />
            <ActionPills />
          </div>
        </section>

        <section id="about" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="About me" />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-medium mb-4 text-white">Contact</h3>
                <ul className="space-y-3 text-[15px] text-white/80">
                  {CONTACT_INFO.map((item) => (
                    <li key={item.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/10 pb-2 last:border-none last:pb-0">
                      <span className="text-white/60">{item.label}</span>
                      {item.label === 'LinkedIn' ? (
                        <a
                          href="https://www.linkedin.com/in/mahmoud-sharkawy-bb1561249"
                          target="_blank"
                          rel="noreferrer"
                          className="text-white underline underline-offset-2 break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-right sm:text-left break-all">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-medium mb-4 text-white">Education</h3>
                <ul className="space-y-3 text-[15px] text-white/80">
                  {EDUCATION_INFO.map((item) => (
                    <li key={item.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/10 pb-2 last:border-none last:pb-0">
                      <span className="text-white/60">{item.label}</span>
                      <span className="text-right sm:text-left">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Programming & technical skills" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium mb-4 text-white">Languages</h3>
                <ul className="space-y-2 text-white/80">
                  {SKILLS.languages.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium mb-4 text-white">Frameworks / Technologies</h3>
                <ul className="space-y-2 text-white/80">
                  {SKILLS.frameworks.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium mb-4 text-white">Tools</h3>
                <ul className="space-y-2 text-white/80">
                  {SKILLS.tools.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium mb-4 text-white">Databases</h3>
                <ul className="space-y-2 text-white/80">
                  {SKILLS.databases.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Experience" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <ul className="space-y-3 text-[16px] text-white/80">
                {EXPERIENCE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="certifications" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Certifications" />
            <div className="grid gap-6 md:grid-cols-2">
              {CERTIFICATIONS.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-2xl text-white font-medium mb-2">{item.name}</p>
                  <p className="text-white/70">Organization: {item.organization}</p>
                  <p className="text-white/70">Year: {item.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="activities" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Activities" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <ul className="space-y-3 text-white/80">
                {ACTIVITIES.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="languages" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Languages" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <ul className="space-y-3 text-white/80">
                {LANGUAGES.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="career" className="px-5 sm:px-8 md:px-10 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Career target" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap gap-3">
                {CAREER_TARGETS.map((item) => (
                  <span key={item} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 sm:px-8 md:px-10 pb-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Contact" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-2xl font-medium text-white">Mahmoud Sharkawy</p>
                <p className="text-white/70">Frontend developer • software engineering student</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-full border border-white/20 bg-white px-5 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors"
                >
                  Email me
                </a>
                <a
                  href="https://www.linkedin.com/in/mahmoud-sharkawy-bb1561249"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
