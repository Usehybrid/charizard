import clsx from 'clsx'
import releases from '../generated/changelog.json'
import {PageHeader} from '../showcase/PageHeader'
import classes from './changelog.module.css'

interface Change {
  kind: 'feature' | 'fix' | 'other'
  scope?: string
  summary: string
  hash: string
}

interface Release {
  version: string
  date: string
  changes: Change[]
}

const KIND_LABEL: Record<Change['kind'], string> = {
  feature: 'Feature',
  fix: 'Fix',
  other: 'Change',
}

const REPO = 'https://github.com/Usehybrid/charizard'

export default function ChangelogPage() {
  const list = releases as Release[]

  return (
    <div>
      <PageHeader title="Changelog">
        Every release of <code>@hybr1d-tech/charizard</code>, generated from the repository&apos;s
        release tags. Bump the version on <code>main</code> and the next deploy picks it up.
      </PageHeader>

      <ol className={classes.list}>
        {list.map(release => (
          <li key={release.version} className={classes.release}>
            <div className={classes.meta}>
              <a
                className={clsx(classes.version, 'zap-content-semibold')}
                href={`${REPO}/releases/tag/v${release.version}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                v{release.version}
              </a>
              <time
                className={clsx(classes.date, 'zap-subcontent-regular')}
                dateTime={release.date}
              >
                {formatDate(release.date)}
              </time>
            </div>

            <ul className={classes.changes}>
              {release.changes.map(change => (
                <li key={change.hash} className={classes.change}>
                  <span
                    className={clsx(classes.kind, classes[change.kind], 'zap-caption-semibold')}
                  >
                    {KIND_LABEL[change.kind]}
                  </span>
                  <span className={clsx(classes.summary, 'zap-content-regular')}>
                    {change.scope && <code className={classes.scope}>{change.scope}</code>}
                    {change.summary}
                  </span>
                  <a
                    className={clsx(classes.hash, 'zap-subcontent-regular')}
                    href={`${REPO}/commit/${change.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {change.hash}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${day} ${months[month - 1]} ${year}`
}
