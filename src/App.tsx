import { useEffect, useState, type CSSProperties } from 'react'
import { CV_URL, EMAIL, EXPERIENCE, GITHUB, LINKEDIN, PHONE, PHONE_INTL, PROJECTS, SKILLS, type Project } from './data'

// Stagger index for the hero entrance (see .intro in index.css)
const order = (i: number) => ({ '--i': i }) as CSSProperties

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={`header ${open ? 'is-open' : ''}`}>
      <a href="#top" className="wordmark" onClick={close}>Mahmoud Sharkawy</a>
      <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="site-nav" className={`nav ${open ? 'is-open' : ''}`}>
        <a href="#work" onClick={close}>Work</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#experience" onClick={close}>Experience</a>
        <a href="#contact" onClick={close}>Contact</a>
        {CV_URL && <a className="nav-cv" href={CV_URL} target="_blank" rel="noreferrer" onClick={close}>CV</a>}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <p className="label hero-label intro" style={order(0)}>
        <span className="dot" /> Open to internships and part-time roles
      </p>
      <h1 className="hero-title intro" style={order(1)}>
        Software engineer in the making, <span className="muted intro-fade">building web apps from Cairo.</span>
      </h1>
      <div className="hero-foot">
        <div className="intro" style={order(3)}>
          <p className="hero-intro">
            I'm Mahmoud, a Software Engineering student at AASTMT (class of 2028). I build with React and TypeScript
            on the front and Node.js on the back, and I want things to feel intentional, not just work.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">See the work</a>
            <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
            {CV_URL && <a className="btn" href={CV_URL} target="_blank" rel="noreferrer">Download CV</a>}
          </div>
        </div>
        <ol className="hero-index" aria-label="Selected work">
          {PROJECTS.map((p, i) => (
            <li key={p.id} className="intro" style={order(4 + i)}>
              <a href={`#${p.id}`}>
                <span className="num">0{i + 1}</span>
                <span className="name">{p.name}</span>
                <span className="kind">{p.kind}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const host = new URL(project.live).host
  return (
    <article className="project reveal" id={project.id}>
      <a className="shot" href={project.live} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} live site`}>
        <span className="shot-bar" aria-hidden="true">
          <i /><i /><i />
          <span className="shot-url">{host}</span>
        </span>
        <img src={project.image} alt={`${project.name} landing page`} width={1440} height={900} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
      </a>

      <div className="project-body">
        <p className="label">
          <span className="num">0{index + 1}</span> {project.kind} · {project.year}
        </p>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-desc">{project.description}</p>
        <ul className="highlights">
          {project.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <ul className="stack" aria-label="Built with">
          {project.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        {project.note && <p className="project-note">{project.note}</p>}
        <div className="project-links">
          <a className="btn btn-solid" href={project.live} target="_blank" rel="noreferrer">Live site <Arrow /></a>
          {project.repo && <a className="btn" href={project.repo} target="_blank" rel="noreferrer">Code <Arrow /></a>}
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="section-head reveal">
        <h2>Selected work</h2>
        <p>Deployed projects, each with its live site and source code.</p>
      </div>
      <div className="projects">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="section-head reveal">
        <h2>About</h2>
      </div>
      <div className="about">
        <div className="about-text reveal">
          <p>
            I'm a <strong>Software Engineering student</strong> who enjoys moving between interface, logic and product
            thinking. Curious by default, serious about the details.
          </p>
          <p>
            I'm looking for a <strong>software engineering internship</strong> or a part-time role in frontend,
            backend or full-stack work.
          </p>
        </div>
        <dl className="facts reveal">
          <div><dt>University</dt><dd>AASTMT</dd></div>
          <div><dt>Major</dt><dd>Software Engineering, 3rd year</dd></div>
          <div><dt>Graduation</dt><dd>2028</dd></div>
          <div><dt>Training</dt><dd>Full Stack course, AMIT (6 months)</dd></div>
          <div><dt>Languages</dt><dd>Arabic (native), English (B2)</dd></div>
          <div><dt>Based in</dt><dd>Cairo, Egypt</dd></div>
        </dl>
      </div>
      <div className="skills reveal">
        {SKILLS.map(([group, items]) => (
          <div className="skill-group" key={group}>
            <h3 className="label">{group}</h3>
            <p>{items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-head reveal">
        <h2>Experience</h2>
      </div>
      <ol className="timeline">
        {EXPERIENCE.map(([year, title, text]) => (
          <li className="reveal" key={title}>
            <span className="label">{year}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section className="contact" id="contact">
      <p className="label">Contact</p>
      <h2 className="contact-title reveal">Have an internship, project or idea? Let's talk.</h2>
      <a className="contact-email reveal" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <div className="contact-actions">
        <button className="btn btn-light" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy email'}</button>
        <a className="btn btn-light" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        <a className="btn btn-light" href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        <a className="btn btn-light" href={`tel:${PHONE_INTL}`}>{PHONE}</a>
        {CV_URL && <a className="btn btn-light" href={CV_URL} target="_blank" rel="noreferrer">CV <Arrow /></a>}
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Mahmoud Sharkawy</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' })
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
