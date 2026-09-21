// Local regression check: node scripts/check-dark-mode.mts (not wired into CI).
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {themeSvg} from '../src/components/svg/theme-svg.ts'

const svg =
  '<svg viewBox="0 0 18 18" fill="none"><path fill="#070F2C"/><path stroke="#434053" fill="none"/><path fill="white"/></svg>'
const themed = themeSvg(svg)
assert.match(themed, /fill="var\(--text-primary\)"/)
assert.match(themed, /stroke="var\(--text-primary\)"/)
assert.match(themed, /fill="none"/)
assert.match(themed, /fill="white"/)
assert.equal(themeSvg(svg.replace('18 18', '180 180')), svg.replace('18 18', '180 180'))
const gradient = svg.replace('<path', '<linearGradient id="brand"/><path')
assert.equal(themeSvg(gradient), gradient)
assert.equal(themeSvg(themed), themed)

const css = fs.readFileSync(new URL('../src/components/styles/_theme.css', import.meta.url), 'utf8')
const blocks = css.split(":root[data-theme='dark']")
const light = Object.fromEntries(
  [...blocks[0].matchAll(/(--[\w-]+):\s*(#[\da-f]{6});/gi)].map(m => [m[1], m[2]]),
)
const dark = {
  ...light,
  ...Object.fromEntries(
    [...blocks[1].matchAll(/(--[\w-]+):\s*(#[\da-f]{6});/gi)].map(m => [m[1], m[2]]),
  ),
}
function luminance(hex: string) {
  const rgb = [1, 3, 5]
    .map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}
function ratio(fg: string, bg: string) {
  const a = luminance(fg),
    b = luminance(bg)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
for (const kind of ['success', 'warning', 'info', 'error']) {
  for (const palette of [light, dark]) {
    const contrast = ratio(palette[`--feedback-${kind}-text`], palette[`--feedback-${kind}-bg`])
    assert.ok(contrast >= 4.5, `${kind} tag: ${contrast}`)
  }
}
assert.ok(ratio(dark['--text-primary'], dark['--surface-muted']) >= 4.5, 'No change tag')
assert.ok(ratio(dark['--text-secondary'], dark['--surface-default']) >= 4.5, 'Sidebar glyphs')
console.log(
  'Dark-mode checks passed: navy/stroked icons, preserved artwork, all status tags and sidebar contrast',
)
