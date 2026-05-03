# monoguitari.github.io

Personal portfolio site for Jesus Rodriguez.

## Stack

- **[Astro](https://astro.build)** — static site framework. Pages are built at deploy time and served as plain HTML with no JavaScript overhead.
- **MDX** — used for blog posts (write markdown with components).
- **TypeScript** — project data (`src/data/projects.ts`) is typed so adding a new project is just appending an object.
- **Plain CSS** — all styling lives in `src/styles/global.css`, no CSS framework.

## Adding a project

Open `src/data/projects.ts` and add an entry to the array:

```ts
{
  id: 'MGT-XXX',
  title: 'Project Name',
  description: 'One sentence shown on hover.',
  tech: ['Python', 'React'],
  year: '2026',
  href: 'https://github.com/...',  // optional — link on click
  image: '/my-cover.png',          // optional — auto-generates cover art if omitted
  color: '#1a2a2a',                // optional — auto-assigns color if omitted
  featured: true,                  // optional — shows on homepage
}
```

## Running locally

```bash
npm install
npm run dev
```

## Deploying

Push to `main` — GitHub Actions builds and deploys automatically.
