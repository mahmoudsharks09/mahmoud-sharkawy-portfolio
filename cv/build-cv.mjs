// Builds an ATS-friendly CV as DOCX and HTML (HTML is printed to PDF with Chrome).
// Single column, standard section names, real text, no tables, icons or images.
import fs from 'node:fs'
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, LevelFormat,
  BorderStyle, TabStopType,
} from 'docx'

// All CV content lives in cv-data.json; edit that file, then run `npm run cv`.
const CV = JSON.parse(fs.readFileSync(new URL('./cv-data.json', import.meta.url), 'utf8'))

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
    line([run('Live: '), link(short(p.live), p.live), ...(p.repo ? [sep(), run('Code: '), link(short(p.repo), p.repo)] : [])]),
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
<h2>Projects</h2>${CV.projects.map((p) => head(p.head) + `<p>Live: <a href="${p.live}">${short(p.live)}</a>${p.repo ? ` <span class="sep">|</span> Code: <a href="${p.repo}">${short(p.repo)}</a>` : ''}</p><p><b>Technologies:</b> ${esc(p.stack)}</p>` + ul(p.bullets)).join('')}
<h2>Experience</h2>${CV.experience.map((e) => head(`${e.head}, ${e.org}`, e.date) + ul(e.bullets)).join('')}
<h2>Skills</h2>${CV.skills.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}
<h2>Additional Information</h2>${CV.extra.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}
</body></html>`
fs.writeFileSync(new URL('./cv.html', import.meta.url), html)
console.log('wrote Mahmoud-Sharkawy-CV.docx and cv.html')
