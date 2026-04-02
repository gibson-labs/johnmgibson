---
description: Add, edit, or remove project cards on the johnmgibson site
---

All project card data lives in one file:

**`frontend/src/lib/portfolioData.ts`** — the `PROJECTS` array is the single source of truth. Every entry here automatically appears on the home highlight cards (first 3) and the full Projects page.

Read that file now so you have the current project list in context before making any changes.

---

## Adding a new project

Add a new object to the `PROJECTS` array. Use the next available `id`. All fields:

```ts
{
  id: 4,                          // next integer after the last project
  title: "Project Name",
  description: "One or two sentences shown on the card.",
  thumbnail: MyImage,             // imported at top of file, or undefined if no image
  gallery: [],                    // array of image paths shown in the modal, can be empty
  category: "Full-Stack",         // shown as the colored pill — use an existing CATEGORIES value or add a new one
  technologies: ["React", "TypeScript"], // tech pills in the modal
  date: "2025-01-01",             // ISO date, used for sort order (newest first)
  goal: "What problem this solved.",
  results: "What the outcome was.",
  githubUrl: "https://github.com/...",   // optional
  liveUrl: "https://...",                // optional
  role: "Full-Stack Developer",          // optional
  timeline: "3 months",                  // optional
  teamSize: 4,                           // optional
}
```

If the project has a thumbnail image, add the file to `frontend/src/assets/images/` and import it at the top of `portfolioData.ts`:

```ts
import MyImage from "@/assets/images/MyImage.png";
```

---

## Controlling which projects appear as highlights on the home page

The home page (`Projects.tsx`) shows **the first 3 projects** in the array via `PROJECTS.slice(0, 3)`.

- To **feature** a project on the home page: move it into the first 3 positions in the array.
- To **remove** a project from the home page highlights: move it below position 3 (it still appears on the full Projects page).
- The order of the array controls the order of the cards.

The full `/projects` page always shows **all** projects, sorted newest-first by `date`.

---

## Removing a project

Delete its object from the `PROJECTS` array and remove its image import if it had one.

---

## After making changes

Run a build check to confirm no TypeScript errors:

```
cd frontend && npm run build
```

Then commit and push to dev:

```
git add frontend/src/lib/portfolioData.ts
git commit -m "..."
git push origin dev
```
