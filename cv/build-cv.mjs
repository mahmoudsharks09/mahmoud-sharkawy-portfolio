// Builds an ATS-friendly CV as DOCX and HTML (HTML is printed to PDF with Chrome).
// Single column, standard section names, real text, no tables, icons or images.
import fs from 'node:fs'
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, LevelFormat,
  BorderStyle, TabStopType,
} from 'docx'

const CV = {
  name: 'Mahmoud Sharkawy',
  title: 'Software Engineering Student | Frontend & Full-Stack Developer',
  contact: [
    { text: 'Cairo, Egypt' },
    { text: '+20 109 509 8055', url: 'tel:+201095098055' },
    { text: 'mahmoud12bn5@gmail.com', url: 'mailto:mahmoud12bn5@gmail.com' },
    { text: 'mahmoud-sharkawy-portfolio.vercel.app', url: 'https://mahmoud-sharkawy-portfolio.vercel.app' },
  ],
  links: [
    { text: 'linkedin.com/in/mahmoud-sharkawy-bb1561249', url: 'https://www.linkedin.com/in/mahmoud-sharkawy-bb1561249' },
    { text: 'github.com/mahmoudsharks09', url: 'https://github.com/mahmoudsharks09' },
  ],
  summary:
    'Software Engineering student at AASTMT (expected 2028) who builds and deploys web applications with React, TypeScript and JavaScript. Completed a six-month Full Stack course at AMIT and a professional internship at GASCO. Seeking a software engineering internship or part-time role in frontend, backend or full-stack development.',
  education: [
    {
      head: 'Bachelor of Science in Software Engineering',
      org: 'Arab Academy for Science, Technology and Maritime Transport (AASTMT)',
      date: 'Expected 2028',
      bullets: ['Currently in third year.'],
    },
  ],
  experience: [
    {
      head: 'Intern',
      org: 'GASCO (Egyptian Natural Gas Company)',
      date: '2025',
      bullets: ['Completed a professional internship and received a certificate of completion.'],
    },
    {
      head: 'Freelance Web Developer',
      org: 'Self-employed',
      date: '',
      bullets: ['Built and shipped work for real-world requirements.'],
    },
    {
      head: 'Full Stack Web Development Course',
      org: 'AMIT',
      date: '6 months',
      bullets: ['Completed a six-month full-stack development training program.'],
    },
  ],
  projects: [
    {
      head: 'Ahwa: café finder for students in Cairo',
      stack: 'React 19, TypeScript, Vite, Leaflet, React Router, OpenStreetMap',
      live: 'https://ahwa-cairo.vercel.app',
      repo: 'https://github.com/mahmoudsharks09/ahwa',
      bullets: [
        'Built a bilingual English/Arabic web app with full right-to-left (RTL) support that maps 341 real Cairo cafés from OpenStreetMap data.',
        'Calculated live open-now status in Cairo time and added filters for Wi-Fi, outdoor seating, air conditioning, no smoking and area.',
        'Implemented saved cafés and personal notes, and deployed the app on Vercel.',
      ],
    },
    {
      head: 'GoMart: e-commerce storefront with admin dashboard',
      stack: 'React 19, Vite, React Router, Bootstrap, React Bootstrap, REST API (DummyJSON)',
      live: 'https://gomart-amit.vercel.app',
      repo: 'https://github.com/mahmoudsharks09/GoMart',
      bullets: [
        'Developed a storefront with a product catalog, category browsing, search, filters, product detail pages and a cart with live totals.',
        'Implemented login with role-based access control (Admin, Moderator, Tester) and an admin dashboard with create, read, update and delete (CRUD) for products.',
        'Integrated product data from the DummyJSON REST API and deployed on Vercel.',
      ],
    },
    {
      head: 'Serenite: one-page storefront concept',
      stack: 'HTML, CSS, JavaScript',
      live: 'https://serenite-website-seven.vercel.app',
      repo: 'https://github.com/mahmoudsharks09/serenite-website',
      bullets: [
        'Hand-coded a responsive single-page shop with a product collection and add-to-bag flow in plain HTML, CSS and JavaScript, with no framework or build step.',
      ],
    },
  ],
  skills: [
    ['Languages', 'Java, Python, C, C++, JavaScript, TypeScript, HTML, CSS, SQL'],
    ['Frameworks & Libraries', 'React, Node.js, React Router, Bootstrap, Leaflet'],
    ['Tools', 'Git, GitHub, Vite, Vercel, VS Code, IntelliJ IDEA, Figma'],
    ['Databases', 'MySQL'],
    ['Concepts', 'REST APIs, responsive web design, internationalization (RTL), role-based access control'],
  ],
  extra: [
    ['Certifications', 'GASCO Internship Certificate (2025)'],
    ['Activities', 'Google Developer Student Club (GDSC); technical clubs and volunteering'],
    ['Languages', 'Arabic (native), English (B2)'],
  ],
}

const short = (u) => u.replace(/^https?:\/\/(www\.)?/, '')

/* ---------------- DOCX ---------------- */
const FONT = 'Calibri'
const RIGHT = 10466 // A4 width 11906 minus 720 margins each side
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 19, bold: o.bold, italics: o.italics, color: o.color })
const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: 19, style: 'Hyperlink' })] })
const sep = () => run('  |  ', { color: '666666' })
const joined = (items) => items.flatMap((c, i) => [...(i ? [sep()] : []), c.url ? link(c.text, c.url) : run(c.text)])

const heading = (text) => new Paragraph({
  spacing: { before: 160, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '222222', space: 2 } },
  children: [run(text.toUpperCase(), { bold: true, size: 22 })],
})
const bullet = (text) => new Paragraph({ numbering: { reference: 'dots', level: 0 }, spacing: { after: 10 }, children: [run(text)] })
const entryHead = (left, right) => new Paragraph({
  spacing: { before: 80, after: 10 },
  tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
  children: [run(left, { bold: true }), ...(right ? [run(`\t${right}`)] : [])],
})
const line = (children, after = 20) => new Paragraph({ spacing: { after }, children })

const body = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [run(CV.name, { bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run(CV.title, { size: 22 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: joined(CV.contact) }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: joined(CV.links) }),

  heading('Summary'),
  line([run(CV.summary)]),

  heading('Education'),
  ...CV.education.flatMap((e) => [entryHead(e.head, e.date), line([run(e.org, { italics: true })]), ...e.bullets.map(bullet)]),

  heading('Projects'),
  ...CV.projects.flatMap((p) => [
    entryHead(p.head),
    line([run('Live: '), link(short(p.live), p.live), sep(), run('Code: '), link(short(p.repo), p.repo)]),
    line([run('Technologies: ', { bold: true }), run(p.stack)]),
    ...p.bullets.map(bullet),
  ]),

  heading('Experience'),
  ...CV.experience.flatMap((e) => [entryHead(`${e.head}, ${e.org}`, e.date), ...e.bullets.map(bullet)]),

  heading('Skills'),
  ...CV.skills.map(([k, v]) => line([run(`${k}: `, { bold: true }), run(v)], 30)),

  heading('Additional Information'),
  ...CV.extra.map(([k, v]) => line([run(`${k}: `, { bold: true }), run(v)], 30)),
]

const doc = new Document({
  creator: CV.name,
  title: `${CV.name} CV`,
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering: {
    config: [{
      reference: 'dots',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }],
    }],
  },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 620, bottom: 620, left: 720, right: 720 } } }, children: body }],
})
fs.writeFileSync(new URL('./Mahmoud-Sharkawy-CV.docx', import.meta.url), await Packer.toBuffer(doc))

/* ---------------- HTML (for PDF) ---------------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const a = (c) => (c.url ? `<a href="${c.url}">${esc(c.text)}</a>` : esc(c.text))
const ul = (b) => `<ul>${b.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
const head = (l, r = '') => `<p class="eh"><b>${esc(l)}</b><span>${esc(r)}</span></p>`
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${CV.name} CV</title>
<style>
@page { size: A4; margin: 11mm 12.7mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Calibri, Carlito, Arial, Helvetica, sans-serif; font-size: 9.7pt; line-height: 1.24; color: #111; }
h1 { margin: 0; text-align: center; font-size: 18pt; }
.title { margin: 1pt 0 3pt; text-align: center; font-size: 11pt; }
.contact { margin: 0 0 1pt; text-align: center; }
a { color: #0b4fa8; text-decoration: none; }
h2 { margin: 7pt 0 3pt; padding-bottom: 1pt; border-bottom: 0.75pt solid #222; font-size: 11pt; text-transform: uppercase; letter-spacing: .02em; }
p { margin: 0 0 1pt; }
.eh { display: flex; justify-content: space-between; margin-top: 4pt; }
ul { margin: 1pt 0 0; padding-left: 14pt; }
li { margin-bottom: 0; }
.sep { color: #666; }
</style></head><body>
<h1>${CV.name}</h1>
<p class="title">${esc(CV.title)}</p>
<p class="contact">${CV.contact.map(a).join(' <span class="sep">|</span> ')}</p>
<p class="contact">${CV.links.map(a).join(' <span class="sep">|</span> ')}</p>
<h2>Summary</h2><p>${esc(CV.summary)}</p>
<h2>Education</h2>${CV.education.map((e) => head(e.head, e.date) + `<p><i>${esc(e.org)}</i></p>` + ul(e.bullets)).join('')}
<h2>Projects</h2>${CV.projects.map((p) => head(p.head) + `<p>Live: <a href="${p.live}">${short(p.live)}</a> <span class="sep">|</span> Code: <a href="${p.repo}">${short(p.repo)}</a></p><p><b>Technologies:</b> ${esc(p.stack)}</p>` + ul(p.bullets)).join('')}
<h2>Experience</h2>${CV.experience.map((e) => head(`${e.head}, ${e.org}`, e.date) + ul(e.bullets)).join('')}
<h2>Skills</h2>${CV.skills.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}
<h2>Additional Information</h2>${CV.extra.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}
</body></html>`
fs.writeFileSync(new URL('./cv.html', import.meta.url), html)
console.log('wrote Mahmoud-Sharkawy-CV.docx and cv.html')
