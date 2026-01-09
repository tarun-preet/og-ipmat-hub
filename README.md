# OG IPMAT Hub

A focused study hub for IPMAT preparation built with Vite, React and TypeScript. Includes study utilities, progress tracking, and curated resources to help you prepare effectively.

---

## Badges

- Build: ![build-status](https://img.shields.io/badge/build-dev-green)
- License: ![license](https://img.shields.io/badge/license-MIT-blue)

---

## Features

- Dashboard with daily goals and activity log
- Pomodoro timer for focused study
- Quant vault and formula flashcards
- Mock score tracker and progress analytics
- Vocabulary hub and curated resources
- Auth-ready pages: Login and Signup
- Reusable UI primitives (shadcn-ui + Tailwind)

---

## Tech stack

- Vite + TypeScript
- React 18
- Tailwind CSS
- shadcn-ui (Radix + Tailwind primitives)

---

## Quickstart

Clone the repo and install dependencies:

```bash
git clone <YOUR_GIT_URL>
cd og-ipmat-hub
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

If you prefer pnpm or bun, replace `npm install` / `npm run` with `pnpm` or `bun` equivalents.

---

## Project structure (high level)

- `src/` — application source
  - `components/` — UI components and feature modules
  - `contexts/` — `AuthContext`, `ThemeContext`
  - `pages/` — route views (Dashboard, Login, Signup, etc.)
  - `lib/` — small utilities and helpers
  - `components/ui/` — design system primitives
- `public/` — static assets
- `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`

---

## Development tips

- Use `src/components/ui` for shared primitives and follow existing patterns for styling.
- Add new routes under `src/pages` and wire them into the router in `src/main.tsx`.
- Keep stateful logic in `contexts` or scoped hooks under `src/hooks`.

---

## Contributing

1. Fork the repository and create a branch: `feature/your-feature`.
2. Implement your changes and add tests where appropriate.
3. Open a pull request with a clear description and screenshots if relevant.

---

## License

This project is licensed under the MIT License (SPDX: MIT). See the `LICENSE` file in the repository for the full text and copyright information.

---
