---
name: mywebsite-patterns
description: Coding patterns extracted from mywebsite portfolio repository
version: 1.0.0
source: local-git-analysis
analyzed_commits: 5
---

# MyWebsite Portfolio Patterns

## Commit Conventions

This project uses **conventional commits** with `feat:` prefix (80% of commits):
- `feat:` - New features and enhancements
- Initial commit used a descriptive sentence without prefix

When writing commit messages:
- Use `feat:` for new components, pages, and features
- Use `fix:` for bug fixes
- Use `chore:` for dependency updates and config changes
- Use `docs:` for documentation updates
- Keep messages descriptive but concise

## Code Architecture

```
app/                    # Next.js App Router (RSC by default)
├── actions.ts          # Server actions (form handling, email)
├── api/chat/route.ts   # API routes (AI chatbot endpoint)
├── globals.css         # Global styles + Tailwind
├── layout.tsx          # Root layout
└── page.tsx            # Main portfolio page (single-page app)

components/             # React components (kebab-case filenames)
├── ui/                 # shadcn/ui primitives (auto-generated)
├── animated-*.tsx      # Animation components (framer-motion)
├── contact-form.tsx    # Feature components
├── portfolio-chatbot.tsx
├── project-card.tsx
├── project-card-multi.tsx
└── projects-section.tsx

hooks/                  # Custom React hooks
├── use-mobile.tsx
└── use-toast.ts

lib/                    # Utility functions and data
├── animation-variants.ts
├── portfolio-context.ts  # Central project/portfolio data
├── rate-limiter.ts
└── utils.ts            # cn() helper (tailwind-merge + clsx)

public/
├── images/
│   ├── profile*.png
│   └── projects/       # Project screenshots
└── *.pdf               # Resume files

styles/
└── globals.css         # Additional global styles
```

## Tech Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Styling:** Tailwind CSS + CSS variables for theming
- **UI Library:** shadcn/ui (Radix primitives + CVA)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **AI:** Google Generative AI (@google/generative-ai)
- **Email:** Resend
- **Icons:** Lucide React
- **TypeScript:** Strict mode enabled

## Key Patterns

### Path Aliases
Always use `@/` path aliases for imports:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Component Structure
- shadcn/ui components live in `components/ui/` (do not modify directly)
- Custom components use kebab-case filenames: `project-card.tsx`
- Components are PascalCase exports: `export function ProjectCard()`
- Feature components are at `components/` root level

### Portfolio Data
All project data and portfolio context is centralized in `lib/portfolio-context.ts`. When adding projects:
1. Update `lib/portfolio-context.ts` with project details
2. Add project screenshot to `public/images/projects/`
3. Update the projects section component

### Styling Conventions
- Use Tailwind utility classes inline
- Use `cn()` from `@/lib/utils` for conditional classes
- CSS variables for theme colors (dark/light mode via next-themes)
- Typography plugin enabled for markdown content

### File Co-Change Patterns
Files that frequently change together:
- `app/page.tsx` + `lib/portfolio-context.ts` (adding/updating projects)
- `app/page.tsx` + `components/projects-section.tsx` (UI changes)
- `package.json` + `package-lock.json` (dependency changes)
- `package.json` + `tailwind.config.ts` (plugin additions)

### Server Components (RSC)
- Default to server components (`rsc: true` in shadcn config)
- Use `"use client"` directive only when needed (interactivity, hooks)
- Server actions in `app/actions.ts` for form submissions

### API Routes
- API routes use Route Handlers in `app/api/` directory
- Rate limiting implemented in `lib/rate-limiter.ts`
- AI chatbot endpoint at `app/api/chat/route.ts`

## Workflows

### Adding a New Project
1. Add project image to `public/images/projects/`
2. Update project data in `lib/portfolio-context.ts`
3. Component will auto-render via `projects-section.tsx`
4. Update `app/page.tsx` if layout changes needed

### Adding a New Component
1. Create `components/component-name.tsx` (kebab-case)
2. Export PascalCase function component
3. Import in `app/page.tsx` using `@/components/component-name`
4. Use Tailwind + cn() for styling

### Adding a shadcn/ui Component
1. Run: `npx shadcn@latest add <component-name>`
2. Component appears in `components/ui/`
3. Import from `@/components/ui/<component-name>`

### Adding Dependencies
1. Update `package.json`
2. Run `npm install` (uses npm, not pnpm — though pnpm-lock.yaml exists from init)
3. Both `package.json` and `package-lock.json` should be committed together
