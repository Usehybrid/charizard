<div align="center">
  <img src=".github/assets/charizard.png" alt="Charizard" width="180" />

  <h1>Charizard</h1>

  <p><strong>Hybr1d's open-source React component library — 50+ accessible, typed, production-ready components.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/@hybr1d-tech/charizard"><img src="https://img.shields.io/npm/v/%40hybr1d-tech%2Fcharizard?color=EE8130&label=npm" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@hybr1d-tech/charizard"><img src="https://img.shields.io/npm/dm/%40hybr1d-tech%2Fcharizard?color=EE8130" alt="npm downloads" /></a>
    <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  </p>

  <p>
    <a href="#installation">Installation</a> ·
    <a href="#quick-start">Quick start</a> ·
    <a href="#components">Components</a> ·
    <a href="#development">Development</a> ·
    <a href="#releasing">Releasing</a>
  </p>
</div>

---

Charizard powers the product surfaces at [Hybr1d](https://github.com/Usehybrid). Every component ships with its styles, full TypeScript prop types, and accessibility built in.

**Built on a modern stack:**

- ⚛️ **React 19** with named exports and tree-shakeable ESM output
- 🎯 **[Zag.js](https://zagjs.com/) state machines** for accessible interactive components (dialogs, menus, comboboxes, tooltips, and more)
- 📊 **[TanStack Table v8](https://tanstack.com/table)** underneath a batteries-included `Table` (filters, sorting, custom columns, export, empty states)
- 🐻 **[Zustand](https://zustand-demo.pmnd.rs/)** for internal component state stores (table, breadcrumbs)
- 🖐️ **[dnd-kit](https://dndkit.com/)** for drag-and-drop, like reordering custom table columns
- 🧭 **[React Router v8](https://reactrouter.com/)** for navigation-aware components (breadcrumbs, error pages, URL-driven disclosures)
- 📅 **[date-fns](https://date-fns.org/)** + **[react-day-picker](https://daypicker.dev/)** powering the date and time pickers
- 🎨 **CSS Modules** — component styles are injected automatically, no global CSS conflicts
- ⚡ **[Vite Plus](https://www.npmjs.com/package/vite-plus)** (`vp`) — VoidZero's unified toolchain — for the dev server and library build with generated type declarations, plus a **self-hosted showcase site** ([ui.zenadmin.co](https://ui.zenadmin.co/)) rendering every component from source

## Installation

```bash
pnpm add @hybr1d-tech/charizard
```

To bump to the latest version in a consuming app:

```bash
pnpm up @hybr1d-tech/charizard -L
```

The library declares its dependencies (React 19, Zag.js, TanStack Table, etc.) as peer dependencies so your app controls the versions — pnpm auto-installs missing peers by default (v8 and later; this repo itself runs pnpm 11). Check [`package.json`](package.json) for the full list.

### Styles

Component styles are bundled and injected automatically when you import a component. If your setup strips CSS side effects, pull in the stylesheet explicitly:

```ts
import '@hybr1d-tech/charizard/styles.css'
```

## Quick start

```tsx
import {Button, BUTTON_VARIANT, BUTTON_SIZE} from '@hybr1d-tech/charizard'

export function SaveBar() {
  return (
    <Button
      variant={BUTTON_VARIANT.PRIMARY}
      size={BUTTON_SIZE.DEFAULT}
      onClick={() => console.log('saved!')}
    >
      Save changes
    </Button>
  )
}
```

Every component follows the same pattern: named exports for the component, its prop types, and any enums it needs — all from the package root.

## Components

| Category | Components |
| --- | --- |
| **Actions** | `Button`, `SegmentedControl` |
| **Forms & inputs** | `Input`, `InputV2`, `Checkbox`, `CheckboxV2`, `RadioGroup`, `RadioGroupV2`, `Switch`, `SwitchV2`, `Select`, `SelectV2`, `Selectors`, `SelectorsV2`, `Search`, `SearchV2`, `DatePicker`, `TimePicker`, `ColorPicker`, `Upload` |
| **Data display** | `Table`, `TaskCards`, `Badge`, `Pill`, `Tag`, `Status`, `Avatar`, `UserChip`, `UsersChip`, `Accordion`, `Progress`, `AsyncImage`, `SVG` |
| **Overlays & feedback** | `Modal`, `ModalV2`, `Drawer`, `DrawerV2`, `Popover`, `Tooltip`, `TooltipV2`, `Alert`, `Toasts`, `Loader`, `Skeleton` |
| **Navigation & layout** | `Tabs`, `LayoutTabs`, `Breadcrumbs`, `EmptyState`, `Error`, `Helmet` |

> `V2` components are the newer generation of an existing component. Prefer `V2` where one exists; the originals remain exported for backwards compatibility.

Browse them all interactively on the showcase site — [ui.zenadmin.co](https://ui.zenadmin.co/) — or run it locally:

```bash
vp run dev
```

The site renders the components straight from `src`, so it always reflects the current branch. It also publishes a machine-readable component index at [`llms.txt`](https://ui.zenadmin.co/llms.txt) and [`components.json`](https://ui.zenadmin.co/components.json) for AI agents consuming the design system.

### Hooks & utilities

The package also exports a set of hooks — `useDisclosure`, `useDisclosureUrl`, `useDebounce`, `useMediaQuery`, `useLockBodyScroll`, `useDateRangePicker`, `useColorsFromWord` — plus date, text, and table utilities from [`src/utils`](src/utils).

## Development

Requires **Node ≥ 24**. The repo is driven by **Vite Plus** (`vp`) rather than pnpm directly — the same commands CI runs ([`setup-vp`](https://github.com/voidzero-dev/setup-vp) provisions it there).

```bash
git clone https://github.com/Usehybrid/charizard.git
cd charizard
vp install

vp run dev            # showcase site / playground on a local dev server (src/site)
vp run build          # typecheck + build the library to dist/
vp run watch          # rebuild on change (useful when linking into an app)
vp run site:build     # build the static showcase site to dist-site/
vp run site:preview   # preview the built showcase site
vp run test           # run tests (includes a mount-smoke test of every showcase page)
```

Note: the showcase pages live inside the main `tsconfig.app.json` project, so a type
error in a page fails `vp run build` too — intentional, it keeps the showcase honest.

### Adding a new component

1. Create a folder under [`src/components`](src/components) with the component, a `types.ts`, a `styles.module.css`, and an `index.ts`.
2. Use **named exports** for the component and **export its prop types**.
3. Re-export it from [`src/components/index.ts`](src/components/index.ts).
4. Add a showcase page at `src/site/pages/<slug>.tsx` (pages auto-register by filename) and add the component's entry to `src/site/manifest.ts` so it appears in the nav and the AI manifest.

## Releasing

Publishing is automated by the [`Publish to npm`](.github/workflows/release.yml) GitHub Action. The actual flow:

1. Get your changes merged to `main` (PR builds run the same workflow as CI, build-only).
2. Bump the version following **semver** — this creates a commit and a `v*` tag:

   ```bash
   pnpm version patch   # or minor / major
   ```

   Which bump to pick:

   | Bump | When to use | Example |
   | --- | --- | --- |
   | `patch` | Bug fixes, style tweaks, docs — no API changes | `2.7.1 → 2.7.2` |
   | `minor` | New components, new props, backwards-compatible additions | `2.7.1 → 2.8.0` |
   | `major` | Breaking changes — removed/renamed components or props, behavior changes consumers must adapt to | `2.7.1 → 3.0.0` |

3. Push the commit **with the tag**:

   ```bash
   git push origin main --follow-tags
   ```

4. The tag push triggers the workflow, which builds the library and runs `npm publish` with [provenance](https://docs.npmjs.com/generating-provenance-statements). A success or failure notification lands in the `#alerts-deploys` Slack channel.

Only `v*` tag pushes publish — pushes and PRs alone never release to npm.

## Contributing

Issues and pull requests are welcome. Keep changes focused, follow the component conventions above, and make sure `pnpm build` passes before opening a PR.

---

<div align="center">
  <sub>Charizard artwork © Nintendo / Creatures Inc. / GAME FREAK inc. Used as a mascot for this fan-named project.</sub>
</div>
