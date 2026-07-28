/**
 * Builds src/site/generated/changelog.json from git tags.
 *
 * There is no CHANGELOG.md in this repo — releases are `v*` tags created by the
 * version bump, and commits follow conventional-commit prefixes, so the history
 * itself is the changelog. Each release lists the commits between it and the
 * previous tag, grouped into features / fixes / other, with release-chore and
 * merge commits dropped.
 *
 * Run: `vp run site:changelog` (also part of site:build).
 */
import {execFileSync} from 'node:child_process'
import {writeFileSync, mkdirSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/site/generated/changelog.json')
/** Releases to include — the whole 579-tag history is noise on a docs page. */
const RELEASE_LIMIT = 25

export type ChangeKind = 'feature' | 'fix' | 'other'

export interface Change {
  kind: ChangeKind
  /** Conventional-commit scope, e.g. `table`. */
  scope?: string
  summary: string
  hash: string
}

export interface Release {
  version: string
  date: string
  changes: Change[]
}

function git(...args: string[]): string {
  return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8'}).trim()
}

// Tags in topological release order, newest first.
const tags = git('tag', '--sort=-creatordate', '--format=%(refname:short)%09%(creatordate:short)')
  .split('\n')
  .map(line => {
    const [name, date] = line.split('\t')
    return {name, date}
  })
  .filter(tag => /^v\d+\.\d+\.\d+$/.test(tag.name))

const CONVENTIONAL = /^(?<type>\w+)(?:\((?<scope>[^)]+)\))?!?:\s*(?<summary>.+)$/

function classify(subject: string): Change | null {
  const match = subject.match(CONVENTIONAL)
  const type = match?.groups?.type?.toLowerCase()
  const summary = (match?.groups?.summary ?? subject).trim()

  // Release bumps and merge commits describe the process, not the product.
  if (/^release\b/i.test(summary) && type === 'chore') return null
  if (/^Merge (pull request|branch|remote)/i.test(subject)) return null

  const kind: ChangeKind = type === 'feat' ? 'feature' : type === 'fix' ? 'fix' : 'other'
  return {kind, ...(match?.groups?.scope ? {scope: match.groups.scope} : {}), summary, hash: ''}
}

const releases: Release[] = []

for (const [index, tag] of tags.slice(0, RELEASE_LIMIT).entries()) {
  const previous = tags[index + 1]
  const range = previous ? `${previous.name}..${tag.name}` : tag.name
  const log = git('log', range, '--no-merges', '--pretty=format:%h%x09%s')
  const changes = log
    .split('\n')
    .filter(Boolean)
    .flatMap(line => {
      const [hash, subject] = line.split('\t')
      const change = classify(subject ?? '')
      return change ? [{...change, hash}] : []
    })

  if (changes.length === 0) continue
  releases.push({version: tag.name.replace(/^v/, ''), date: tag.date, changes})
}

mkdirSync(dirname(OUT), {recursive: true})
writeFileSync(OUT, JSON.stringify(releases, null, 2) + '\n')
console.log(
  `✓ src/site/generated/changelog.json — ${releases.length} releases, ${releases.reduce((n, r) => n + r.changes.length, 0)} changes`,
)
