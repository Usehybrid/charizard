# FR-736: dark-mode token proposal

Status: historical design proposal. The implemented contract is in [dark-mode.md](dark-mode.md). Scope: Charizard and console
(Pikachu). Zenex (Gengar) is deferred. Direction selected by the user: neutral
charcoal with the existing blue accent.

Ticket: https://hybr1dhq.atlassian.net/browse/FR-736 — In Development, read on
2026-09-17. The ticket requests dark mode for experience and accessibility; it
contains no additional acceptance criteria or comments.

Both existing checkouts were clean. Both `main` branches were updated with
`git pull --ff-only origin main`, then `feat/fr-736-dark-mode` was created in
each checkout. No worktrees were created.

## Current system

- Charizard owns `src/components/styles/_variables.css`; its stylesheet entry is
  `src/components/styles/charizard.css`.
- Console loads Charizard CSS first, then `src/app/styles/_variables.css` and
  `_global.css` in `src/main.tsx`. Its variables redeclare 123 Charizard token
  names. Final values differ for `--text-secondary` (library `#66668d`, console
  `#696e9c`) and `--dark-d90` (library `#1e1e1f`, console `#151516`).
- Existing semantic tokens (`--text-*`, `--fill-*`, `--stroke-*`, `--link-*`)
  are a useful foundation. Keep those public names and extend them.
- `--neutral-white` is overloaded: button foreground AND card/modal/menu
  background. `--p-p50` is both blue fill and blue text. Neither can safely be
  inverted or lightened everywhere. Preserve literal palette tokens and migrate
  consumers to semantic roles.
- A lexical audit found potential literal colours in 55/85 Charizard component
  CSS files and 441/783 console CSS files. This includes intentional artwork,
  shadows, comments, and token definitions; it is a triage measure, not a count
  of defects. It excludes JS colour literals from these counts.
- Additional literals exist in Charizard `select-v2/styles.ts` and toast theme
  CSS. Check legacy and V2 components, React Select portals, tooltips, charts,
  SVGs, and rich text separately.
- Console uses Instrument Sans; Charizard's global styles use Geist. Keep
  existing typography, spacing, and component geometry during theme work.

## Proposed shared semantic tokens

Charizard owns both palettes. Existing primitive scales (`--p-p*`, `--dark-d*`,
status ramps, literal white/black) remain stable. New semantic tokens can refer
to those primitives where appropriate. Values below are a first design pass.

| Token                         | Light                       | Dark               | Role                               |
| ----------------------------- | --------------------------- | ------------------ | ---------------------------------- |
| `--surface-page`              | `#fbfbfe`                   | `#171719`          | Console canvas                     |
| `--surface-default`           | `#ffffff`                   | `#202023`          | Cards, sidebar, header, inputs     |
| `--surface-raised`            | `#ffffff`                   | `#28282c`          | Menus, dialogs, drawers, tooltips  |
| `--surface-hover`             | `#f6f8fe`                   | `#303035`          | Neutral hover                      |
| `--fill-selection` (existing) | `#f6f8fe`                   | `#293453`          | Selected rows/items                |
| `--text-primary` (existing)   | `#000041`                   | `#f2f2f4`          | Main text                          |
| `--text-secondary` (existing) | preserve per-consumer value | `#b9b9c2`          | Labels and secondary text          |
| `--text-tertiary` (existing)  | `#9999b3`                   | `#a1a1aa`          | Supporting text                    |
| `--text-hint` (existing)      | `#a3a3be`                   | `#a1a1aa`          | Placeholder text                   |
| `--text-on-primary`           | `#ffffff`                   | `#ffffff`          | Filled action labels               |
| `--stroke-border` (existing)  | `#e5e9fb`                   | `#39393f`          | Decorative separators              |
| `--stroke-control`            | `#d3dbf8`                   | `#777780`          | Necessary control boundaries       |
| `--action-primary`            | `#254dda`                   | `#254dda`          | Existing brand button fill         |
| `--action-primary-hover`      | `#1e3eae`                   | `#345ddf`          | Filled action hover                |
| `--action-primary-border`     | `#254dda`                   | `#7c94e9`          | Visible boundary on dark surfaces  |
| `--action-text`               | `#254dda`                   | `#9db2ff`          | Outlined/ghost actions, active nav |
| `--link-rest` (existing)      | `#0f72ee`                   | `#9db2ff`          | Links                              |
| `--link-hover` (existing)     | `#074da6`                   | `#c1ceff`          | Hovered links                      |
| `--focus-ring`                | `#254dda`                   | `#9db2ff`          | Keyboard focus; use offset         |
| `--surface-disabled`          | `#efefef`                   | `#29292d`          | Disabled controls                  |
| `--text-disabled`             | `#999999`                   | `#777780`          | Disabled content only              |
| `--overlay-backdrop`          | `rgb(0 0 0 / 50%)`          | `rgb(0 0 0 / 64%)` | Modal scrim                        |

The light values describe existing roles, not a license to replace differing
light colours indiscriminately. Preserve current light appearance during migration.
In particular, `--fill-background` currently differs from the console canvas.
Audit its actual consumers before aliasing it to a surface token.

Use a subtle divider for grouping; do not use that divider to identify an input.
The dark filled action retains the brand hue and gains a lighter boundary.
The lighter action-text token is separate from the filled-button token.

Status pairs use existing ramp colours for foregrounds and subdued dark fills:

| Semantic pair                                       | Dark foreground | Dark background |
| --------------------------------------------------- | --------------- | --------------- |
| `--feedback-success-text` / `--feedback-success-bg` | `#5ec298`       | `#1d342a`       |
| `--feedback-error-text` / `--feedback-error-bg`     | `#f1948a`       | `#3b2425`       |
| `--feedback-warning-text` / `--feedback-warning-bg` | `#f5b041`       | `#3a301e`       |
| `--feedback-info-text` / `--feedback-info-bg`       | `#85c1e9`       | `#202f3e`       |

Bind badges, alerts, validation and toasts to these pairs. Choose light mappings
per existing component to avoid unrelated light-theme changes. Do not globally
change numbered status ramps: charts and other consumers also use them.
Keep chart category identities; adapt grids, tracks, labels, tooltips, and any
series failing contrast. Logos, product photographs, and export canvases need
their own surface treatment, not CSS inversion filters.

## Contrast checks

Calculated with sRGB relative luminance (unrounded ratios used for thresholds):

| Pair                              | Ratio   |
| --------------------------------- | ------- |
| Primary text / card               | 14.53:1 |
| Secondary text / card             | 8.34:1  |
| Tertiary text / raised surface    | 5.73:1  |
| Link / card                       | 7.93:1  |
| White / primary button            | 6.66:1  |
| Control boundary / raised surface | 3.31:1  |
| Primary-button boundary / card    | 5.63:1  |
| Success text / status fill        | 6.12:1  |
| Error text / status fill          | 6.38:1  |
| Warning text / status fill        | 6.89:1  |
| Info text / status fill           | 7.03:1  |

These checks cover the proposed pairs, not whole-product accessibility.
Normal text targets at least 4.5:1; necessary control boundaries and graphical
objects target 3:1. Existing light-theme low-contrast placeholders are pre-existing
debt and must not be described as passing. Check actual rendered pairs and states.

References: [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Theme contract and preference proposal

- Resolve Light / Dark / System in console. Set `data-theme="light|dark"` on
  `document.documentElement`; Charizard responds through CSS, without owning
  user persistence or requiring a React provider for each component.
- Put shared theme declarations in Charizard. Console should keep only
  application-specific extensions and intentional light overrides. Remove
  duplicated shared declarations as consumers migrate; test CSS import order.
- Set the matching `color-scheme` for native controls; it does not theme app
  components automatically ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)).
- Propose keeping Light for existing users until they choose; System follows OS
  changes only while System is selected. Do not enable OS dark mode implicitly
  before the component audit is complete.
- User decision: Appearance belongs in the profile menu for everyone, including
  expanded, collapsed and mobile layouts. Do not put it in Settings > Preferences.
  Current Settings routes use `useSettingsAccess` and are reserved for IT admins.
  Do not broaden access to company settings to enable a theme preference.
- Proposed first persistence: user-scoped local storage, explicitly described as
  applying in this browser. A small last-used theme cache can theme the loading
  shell before authentication; reconcile to the signed-in user's preference
  before showing their console. Cross-device persistence needs a confirmed API
  field and is not assumed in this frontend-only phase.
- Apply initial theme before first paint, including the static splash; handle
  storage failures, invalid values, OS changes, account changes, and other tabs.
- Theme the document root so body-mounted menus/dialogs inherit the palette.

## Implementation sequence after token review

1. Add semantic tokens to Charizard and theme its component showcase for review.
   Migrate shared controls, table states, forms, overlays, calendars, and toasts.
   Restore visible keyboard focus where existing CSS suppresses it.
2. Integrate console shell, dashboard, Preferences and preference initialization.
   Use `scripts/link-charizard.sh` after building Charizard for local testing;
   it points to the library build without modifying package manifests or locks.
3. Audit console modules and custom components, including charts and overlays.
   A dark dashboard alone is not completed platform dark mode. Keep the user
   setting out of a production release until affected surfaces are verified.
4. Verify both modes, keyboard states, reloads, System changes, permissions,
   account switching, portals and loading/error/empty states. Use existing local
   checks; do not change CI. Keep coordinated PRs linked and finish Greptile/CI
   review before delivery. No PR has been opened for this proposal.
5. Reassess Zenex only once the shared library and console are stable.

Open product choices: opt-in Light versus System as the eventual default;
browser-local versus cross-device preference. The visual direction is selected;
the exact values and mappings remain a proposal for iteration.
