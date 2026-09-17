# Themes

Charizard owns the shared palette and semantic colours. Consumers opt in by setting
`data-theme="dark"` or `data-theme="light"` on the document's `html` element. Without
an attribute, the library remains light. The matching `color-scheme` themes native
controls. Body-mounted portals inherit the same tokens.

`src/components/styles/_theme.css` is the semantic API. Use `--surface-*` for
backgrounds, `--text-*` for foregrounds, `--action-*` for actions, `--stroke-*` for
boundaries, `--feedback-*-text/bg/solid` for status pairs, and `--chart-*` for chart
chrome. `--neutral-white`, `--black`, and numbered palette ramps remain literal
colours; they are for intentional artwork and data series, not themed surfaces.

A white label on a solid button uses `--text-on-primary`; a card uses
`--surface-default`; menus and dialogs use `--surface-raised`. Tinted feedback
backgrounds pair with their matching feedback text. White labels need the darker
`--feedback-*-solid` fill. Necessary control boundaries use `--stroke-control`;
decorative separators use `--stroke-border`.

The dark palette uses neutral charcoal surfaces, retains the existing blue action
fill, and lightens action text and links. The semantic migration also standardizes
some previously inconsistent light greys and status shades. Typography and geometry
are not redesigned.

The `SVG` icon helper maps neutral ink in small viewBox-based SVGs to semantic
colours. White cutouts, gradient artwork and larger illustrations retain their
colours. Pass `preserveColors` for a small logo that must retain original ink.
Colour-picker swatches and chart category colours are intentional literal values.

Use the showcase header's Light mode / Dark mode control to inspect components.
Verify primary/secondary/disabled/focused controls, selects and their portals,
checkboxes/radios/switches, date pickers, tables, empty states, tooltips, drawers,
dialogs, skeletons and toasts in both modes. The charcoal text pairs were checked
against 4.5:1 and control boundaries against 3:1. A token check does not substitute
for rendered component QA.

## Console integration

The coordinated Pikachu branch is `feat/fr-736-dark-mode`. Console imports
Charizard styles before application extensions; it no longer redeclares the shared
palette. Build this library, then run `bash scripts/link-charizard.sh` in Pikachu.
The link changes only `node_modules`, not package manifests or locks. Restart its
Vite server after linking. Rebuild Charizard after further component edits.

Console owns the preference runtime. Appearance lives in the profile menu in
expanded, collapsed and mobile layouts, independently of company Settings access.
Light, Dark and System are user-scoped browser preferences, with a last-used cache
for the initial splash. The default remains Light. Zenex integration is deferred.

These branches are for coordinated local review. Before deployment, publish the
updated Charizard package and update console's dependency to that released version;
the existing published 3.0.0 does not contain these tokens. Do not deploy console
alone against the old package.
