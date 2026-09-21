/** Theme neutral ink in small UI icons, preserving artwork, white cutouts and
 * coloured brand marks. Presentation attributes remain overridable by CSS. */
export function themeSvg(source: string): string {
  if (/<(?:image|linearGradient|radialGradient)\b/i.test(source)) return source
  const viewBox = source
    .match(/viewBox=["']([^"']+)["']/i)?.[1]
    .split(/[\s,]+/)
    .map(Number)
  if (!viewBox || viewBox[2] > 64 || viewBox[3] > 64) return source
  const inks: Record<string, string> = {
    '#000': '--text-primary',
    '#000000': '--text-primary',
    black: '--text-primary',
    '#000041': '--text-primary',
    '#070f2c': '--text-primary',
    '#434053': '--text-primary',
    '#2e2b40': '--text-primary',
    '#201d2c': '--text-primary',
    '#37373d': '--text-primary',
    '#555556': '--text-secondary',
    '#555580': '--text-secondary',
    '#616189': '--text-secondary',
    '#767676': '--text-secondary',
    '#66668d': '--text-secondary',
    '#696e9c': '--text-secondary',
    '#79799b': '--text-secondary',
    '#9999b3': '--text-tertiary',
    '#9d9db6': '--text-tertiary',
    '#a6a6a7': '--text-tertiary',
    '#b3b2b8': '--text-tertiary',
    '#254dda': '--action-text',
  }
  return source.replace(/\b(fill|stroke)=(['"])([^'"]+)\2/gi, (match, attr, quote, value) => {
    const token = inks[value.toLowerCase()]
    return token ? `${attr}=${quote}var(${token})${quote}` : match
  })
}
