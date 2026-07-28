/**
 * Bakes the repo's star count into src/site/generated/repo.json at build time.
 *
 * Deliberately NOT fetched from the browser: the showcase site is a static,
 * fully-offline bundle (no third-party requests from visitors, nothing to
 * rate-limit at 60 req/h per IP, no number that pops in after paint). The
 * deploy workflow runs on every push to main, so the count refreshes about as
 * often as anyone looks at it.
 *
 * Network failures are non-fatal: the committed value is kept, because a docs
 * build must never fail over a decoration.
 *
 * Run: `vp run site:repo` (also part of site:build).
 */
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/site/generated/repo.json')
const OWNER = 'Usehybrid'
const REPO = 'charizard'

export interface RepoMeta {
  owner: string
  repo: string
  url: string
  stars: number
}

function committed(): RepoMeta {
  if (existsSync(OUT)) return JSON.parse(readFileSync(OUT, 'utf8')) as RepoMeta
  return {owner: OWNER, repo: REPO, url: `https://github.com/${OWNER}/${REPO}`, stars: 0}
}

const previous = committed()
let meta = previous

try {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'charizard-docs-build',
      // Present in GitHub Actions; lifts the 60/h anonymous rate limit.
      ...(process.env.GITHUB_TOKEN ? {authorization: `Bearer ${process.env.GITHUB_TOKEN}`} : {}),
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`GitHub API ${response.status}`)
  const body = (await response.json()) as {stargazers_count?: number; html_url?: string}
  meta = {
    owner: OWNER,
    repo: REPO,
    url: body.html_url ?? previous.url,
    stars: body.stargazers_count ?? previous.stars,
  }
} catch (error) {
  console.log(
    `· repo meta: keeping committed value (${previous.stars} stars) — ${(error as Error).message}`,
  )
}

mkdirSync(dirname(OUT), {recursive: true})
writeFileSync(OUT, JSON.stringify(meta, null, 2) + '\n')
console.log(`✓ src/site/generated/repo.json — ${meta.stars} stars`)
