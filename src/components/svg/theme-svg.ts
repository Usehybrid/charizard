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
    '#37373d': '--text-primary',
    '#66668d': '--text-secondary',
    '#696e9c': '--text-secondary',
    '#79799b': '--text-secondary',
    '#9999b3': '--text-tertiary',
    '#9d9db6': '--text-tertiary',
    '#254dda': '--action-text',
  }
  return source.replace(/\b(fill|stroke)=(['"])([^'"]+)\2/gi, (match, attr, quote, value) => {
    const token = inks[value.toLowerCase()]
    return token ? `${attr}=${quote}var(${token})${quote}` : match
  })
}
