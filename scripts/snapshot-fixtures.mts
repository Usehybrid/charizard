/**
 * One-time fixture snapshotter for the showcase site.
 *
 * Fetches list endpoints from the staging API and writes SANITIZED JSON to
 * src/site/fixtures/. The deployed site never calls the network — these
 * snapshots are the only data source.
 *
 * Credentials come from the environment (or .env.local at the repo root):
 *   HYBRID_AUTH_KEY=...  HYBRID_BROWSER_ID=...  node scripts/snapshot-fixtures.mts
 *
 * Sanitization is deterministic (index-seeded name/email pool) so re-running
 * against unchanged data produces stable diffs.
 */
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'src/site/fixtures')
const BASE = 'https://stg-ecs.usehybrid.co/api'

interface Endpoint {
  /** Output file name (without .json). */
  name: string
  path: string
  /** Extract the useful payload from the response envelope. */
  pick: (json: any) => unknown
}

const ENDPOINTS: Endpoint[] = [
  {
    name: 'users',
    path: '/users/team?page=0&limit=25',
    pick: json => json.data,
  },
]

// ---------------------------------------------------------------------------
// env
function loadEnvLocal() {
  const file = resolve(ROOT, '.env.local')
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2]
  }
}

// ---------------------------------------------------------------------------
// deterministic PII sanitization
const FIRST_NAMES = ['Ash', 'Misty', 'Brock', 'May', 'Dawn', 'Serena', 'Clemont', 'Iris', 'Cilan', 'Gary', 'Tracey', 'Max', 'Bonnie', 'Lillie', 'Gladion', 'Mallow', 'Lana', 'Kiawe', 'Sophocles', 'Goh', 'Chloe', 'Bea', 'Allister', 'Marnie', 'Hop']
const LAST_NAMES = ['Ketchum', 'Waterflower', 'Stone', 'Maple', 'Berlitz', 'Yvonne', 'Citron', 'Ajia', 'Dento', 'Oak', 'Sketchit', 'Birch', 'Lemon', 'Aether', 'Mohn', 'Abo', 'Suiren', 'Kaki', 'Maamane', 'Gou', 'Sakuragi', 'Saito', 'Onion', 'Mary', 'Pop']

const EMAIL_KEYS = /email/i
const NAME_KEYS: Record<string, 'first' | 'last'> = {
  first_name: 'first',
  last_name: 'last',
  firstName: 'first',
  lastName: 'last',
}
const NULL_OUT_KEYS = /phone|work_number|address|dob|date_of_birth|salary|compensation/i
const STRIP_KEYS = /token|auth|secret|password/i
const IMAGE_KEYS = /img_url|image_url|avatar|photo/i

function sanitize(value: unknown, index = 0): unknown {
  if (Array.isArray(value)) return value.map((v, i) => sanitize(v, i))
  if (value === null || typeof value !== 'object') return value

  const out: Record<string, unknown> = {}
  const src = value as Record<string, unknown>
  const first = FIRST_NAMES[index % FIRST_NAMES.length]
  const last = LAST_NAMES[index % LAST_NAMES.length]

  for (const [key, v] of Object.entries(src)) {
    if (STRIP_KEYS.test(key)) continue
    if (NAME_KEYS[key] && typeof v === 'string' && v) {
      out[key] = NAME_KEYS[key] === 'first' ? first : last
    } else if (EMAIL_KEYS.test(key) && typeof v === 'string' && v) {
      out[key] = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`
    } else if (NULL_OUT_KEYS.test(key)) {
      out[key] = null
    } else if (IMAGE_KEYS.test(key) && typeof v === 'string' && v) {
      // Empty string -> components fall back to initials; no external URLs.
      out[key] = ''
    } else {
      out[key] = sanitize(v, index)
    }
  }
  return out
}

// ---------------------------------------------------------------------------
async function main() {
  loadEnvLocal()
  const authKey = process.env.HYBRID_AUTH_KEY
  const browserId = process.env.HYBRID_BROWSER_ID
  if (!authKey || !browserId) {
    console.error('Missing HYBRID_AUTH_KEY / HYBRID_BROWSER_ID (env or .env.local)')
    process.exit(1)
  }

  mkdirSync(OUT_DIR, {recursive: true})

  for (const endpoint of ENDPOINTS) {
    const res = await fetch(BASE + endpoint.path, {
      headers: {
        accept: 'application/json',
        'auth-key': authKey,
        'browser-id': browserId,
        origin: 'https://console.usehybrid.co',
        referer: 'https://console.usehybrid.co/',
      },
    })
    if (!res.ok) {
      console.error(`✗ ${endpoint.name}: HTTP ${res.status}`)
      process.exitCode = 1
      continue
    }
    const picked = endpoint.pick(await res.json())
    const clean = sanitize(picked)
    const file = resolve(OUT_DIR, `${endpoint.name}.json`)
    writeFileSync(file, JSON.stringify(clean, null, 2) + '\n')
    const count = Array.isArray(clean) ? `${clean.length} records` : 'object'
    console.log(`✓ ${endpoint.name}.json (${count})`)
  }
}

await main()
