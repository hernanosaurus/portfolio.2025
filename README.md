# Nani's Portfolio 2025 ☕💻

Hey there! Welcome to my personal portfolio. This is where I showcase my work as a frontend developer — projects, skills, and a bit about who I am. Built with love, coffee, and some good vibes.

## What's This About?

This portfolio is a single-page app that tells my story as a developer. It's built with modern tools and follows best practices, because that's how I roll in my projects too.

### Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - For that sweet type safety
- **Tailwind CSS v4** - Utility-first styling (with dark mode!)
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Beautiful, consistent icons
- **Geist Font** - Clean typography

## Getting Started

Want to run this locally? Here's how:

### Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd portfolio.2025

# Install dependencies
npm install

# Fire up the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and you're good to go!

The page will auto-reload when you make changes. Hot module replacement is your friend here.

## Project Structure

Here's how things are organized (because clean code matters):

```
app/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Card.tsx     # Project card component
│   │   ├── Flame.tsx    # Flame text animation component
│   │   ├── Link.tsx     # External link wrapper
│   │   └── Tag.tsx      # Skill/tech tag
│   └── sections/        # Page sections
│       ├── Hero.tsx     # Intro section
│       ├── Projects.tsx # Projects showcase
│       └── Skills.tsx   # Skills display
├── data/
│   ├── projects.ts      # All project data
│   └── skills.ts        # Skills categorized
├── page.tsx             # Main page
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

## Customizing for Your Own Use

Want to use this as a template? Go for it! Feel free to fork this repo and make it your own. Just please give credit where it's due — link back to this repo and don't claim the original work as yours. Here's what you'll want to update:

### 1. Update Your Info

Edit `app/components/sections/Hero.tsx`:

- Change the name, title, and bio
- Update social links (GitHub, LinkedIn, email)

### 2. Add Your Projects

Edit `app/data/projects.ts`:

- Add/remove projects
- Include project names, descriptions, tech stacks, and links
- Projects with links appear in "Featured Projects"
- Projects without links show up in "Other Projects"

### 3. Update Your Skills

Edit `app/data/skills.ts`:

- Organize skills by category
- Add or remove technologies you work with

### 4. Personalize Metadata

Edit `app/layout.tsx`:

- Update the title and description
- Add your own favicon and OG image
- Customize social media preview cards

### 5. Tweak the Styles

The color scheme uses a warm orange gradient with white backgrounds. To change it:

- Check out `tailwind.config.ts` for custom colors
- Update component class names as needed
- Main page uses `from-white to-orange-50` gradient
- Dark mode works out of the box!

### 6. Customize Animations

Framer Motion animations add personality throughout:

- **Hero section** - Fade-in animations with wiggling coffee & laptop emojis
- **Flame component** - Interactive flame animation effect on hover/tap with seeded randomness for consistency
- **Project cards** - Staggered fade-in on scroll with spring hover effect
- **Footer** - Playful animated emojis (coffee, shaka, music notes)
- Adjust timing/stiffness in component files to match your style

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Code Quality Features

- **TypeScript** - Full type coverage
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting (configured)
- **Responsive Design** - Mobile-first approach
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **SEO Optimized** - Meta tags, OG images, proper structure

## Design Philosophy

This portfolio follows these principles:

- **Clean & Minimal** - Let the work speak for itself with subtle orange accents
- **Fast & Performant** - Optimized builds, static generation
- **Smooth Animations** - Framer Motion for delightful micro-interactions
- **Accessible** - Usable by everyone with proper ARIA labels
- **Responsive** - Looks great on any device
- **Dark Mode** - Easy on the eyes

## Deployment

This app is ready to deploy on:

### Vercel (Recommended)

The easiest way since Next.js is built by Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Other Platforms

Works great on:

- **Netlify** - Add a `netlify.toml` file
- **GitHub Pages** - Export as static site
- **Any Node.js hosting** - Just run `npm start`

## Learning Resources

New to these technologies? Check these out:

- [Next.js Docs](https://nextjs.org/docs) - Learn about Next.js features
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Master TypeScript

## Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a PR!

## License

Feel free to fork and use this as a template for your own portfolio! Just remember to give proper attribution — link back to this repository and don't pass off the design/code as your original work. Make it yours, but be cool about it 🤙

---

Built with Next.js, Tailwind, Framer Motion, and loose TypeScript 😉 — Designed and coded with good coffee ☕, good vibes 🤙, and good music 🎶.

_(Dabbled with Framer Motion — just exploring the basics and having fun with simple motion effects.)_

**Available for remote work!** Let's connect 🚀

---

**Note:** Some projects do not include client names, links, or detailed descriptions due to confidentiality agreements. I am committed to respecting client privacy and NDAs. For the latest version and updates, see this repository.
