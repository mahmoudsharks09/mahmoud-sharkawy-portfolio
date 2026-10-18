export const EMAIL = 'mahmoud12bn5@gmail.com'
export const PHONE = '01095098055'
export const PHONE_INTL = '+201095098055'
export const LINKEDIN = 'https://www.linkedin.com/in/mahmoud-sharkawy-bb1561249'
export const GITHUB = 'https://github.com/mahmoudsharks09'
// Drop the PDF in public/ and set this to its path (e.g. '/mahmoud-sharkawy-cv.pdf') to show the CV buttons.
export const CV_URL: string | null = null

export type Project = {
  id: string
  name: string
  year: string
  kind: string
  summary: string
  description: string
  highlights: string[]
  stack: string[]
  live: string
  repo: string
  image: string
  note?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'ahwa',
    name: 'Ahwa',
    year: '2026',
    kind: 'Web app',
    summary: 'Find a café to study in Cairo.',
    description:
      'A map of real Cairo cafés pulled from OpenStreetMap, built for students looking for somewhere to sit and work. It tells you which places are open right now in Cairo time and lets you narrow the list down to what you need.',
    highlights: [
      '341 cafés on an interactive map',
      'Open-now status calculated in Cairo time',
      'Filters for Wi-Fi, outdoor seating, air-con, no smoking, area and more',
      'Saved cafés and personal notes',
      'Full English and Arabic, with right-to-left layout',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Leaflet', 'React Router', 'OpenStreetMap'],
    live: 'https://ahwa-cairo.vercel.app',
    repo: 'https://github.com/mahmoudsharks09/ahwa',
    image: '/work/ahwa.jpg',
  },
  {
    id: 'gomart',
    name: 'GoMart',
    year: '2026',
    kind: 'E-commerce',
    summary: 'A full storefront with an admin dashboard.',
    description:
      'A React e-commerce store backed by product data from the DummyJSON API. Shoppers can browse by category, search and filter, and manage a cart; signed-in staff get a dashboard for managing products and users.',
    highlights: [
      'Product catalog with categories, search and filters',
      'Product detail pages and a cart with live totals',
      'Login with role-based access: Admin, Moderator, Tester',
      'Admin dashboard with create, edit and delete for products',
      'Light and dark theme',
    ],
    stack: ['React 19', 'Vite', 'React Router', 'Bootstrap', 'React Bootstrap', 'DummyJSON API'],
    live: 'https://gomart-amit.vercel.app',
    repo: 'https://github.com/mahmoudsharks09/GoMart',
    image: '/work/gomart.jpg',
  },
  {
    id: 'serenite',
    name: 'Serenite',
    year: '2026',
    kind: 'Landing page',
    summary: 'A one-page shop for Taif rose and oud oils.',
    description:
      'A storefront concept for a perfume-oil brand: collection, scent notes, delivery and FAQ on a single page, with a working bag. Written by hand in plain HTML, CSS and JavaScript with no framework and no build step.',
    highlights: [
      'Single index.html, no dependencies',
      'Product collection with an add-to-bag flow',
      'Responsive, photo-led editorial layout',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://serenite-website-seven.vercel.app',
    repo: 'https://github.com/mahmoudsharks09/serenite-website',
    image: '/work/serenite.jpg',
    note: 'Concept site: products and prices are sample content and checkout is not connected.',
  },
]

export const SKILLS: [string, string[]][] = [
  ['Languages', ['Java', 'Python', 'C / C++', 'JavaScript', 'TypeScript', 'HTML / CSS']],
  ['Frameworks', ['React', 'Node.js']],
  ['Tools', ['Git / GitHub', 'VS Code', 'IntelliJ', 'Figma', 'Vite', 'Vercel']],
  ['Data', ['MySQL']],
]

export const EXPERIENCE: [string, string, string][] = [
  ['Internship · 2025', 'GASCO', 'Professional internship, completed with a certificate.'],
  ['Training', 'AMIT', 'Six-month Full Stack course.'],
  ['Freelance', 'Freelancing', 'Built and shipped work for real-world requirements.'],
  ['Project', 'Business / family project', 'Applied software and problem-solving outside the classroom.'],
  ['Community', 'GDSC & volunteering', 'Active in Google Developer Student Club, technical clubs and student activities.'],
]
