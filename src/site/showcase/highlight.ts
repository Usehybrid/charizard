/**
 * Tiny TSX tokenizer for the docs code viewer.
 *
 * Deliberately dependency-free: the site must build and run fully offline, and
 * a real highlighter (shiki/prism) is a heavy dependency for snippets that are
 * only ever a handful of JSX lines. Good enough beats correct here — a missed
 * token just renders as plain text.
 */
export type TokenKind =
  'plain' | 'comment' | 'string' | 'keyword' | 'tag' | 'attr' | 'number' | 'punct'

export interface Token {
  text: string
  kind: TokenKind
}

const KEYWORDS = [
  'import',
  'export',
  'from',
  'default',
  'const',
  'let',
  'var',
  'function',
  'return',
  'await',
  'async',
  'new',
  'type',
  'interface',
  'as',
  'if',
  'else',
  'for',
  'of',
  'in',
  'true',
  'false',
  'null',
  'undefined',
]

// One pass, ordered by precedence: comments and strings swallow everything
// inside them, so they must come first.
const PATTERN = new RegExp(
  [
    '(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)',
    '(?<string>`(?:\\\\.|[^`\\\\])*`|\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*")',
    '(?<tag><\\/?[A-Za-z][\\w.-]*|\\/?>)',
    `(?<keyword>\\b(?:${KEYWORDS.join('|')})\\b)`,
    '(?<number>\\b\\d+(?:\\.\\d+)?\\b)',
    '(?<attr>\\b[A-Za-z_][\\w-]*(?=\\s*=))',
    '(?<punct>[{}()[\\];,=><|&:?.]+)',
  ].join('|'),
  'g',
)

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  for (const match of code.matchAll(PATTERN)) {
    const index = match.index ?? 0
    if (index > last) tokens.push({text: code.slice(last, index), kind: 'plain'})
    const groups = match.groups ?? {}
    const kind = (Object.keys(groups).find(k => groups[k] !== undefined) ?? 'plain') as TokenKind
    tokens.push({text: match[0], kind})
    last = index + match[0].length
  }
  if (last < code.length) tokens.push({text: code.slice(last), kind: 'plain'})
  return tokens
}
