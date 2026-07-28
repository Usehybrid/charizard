import clsx from 'clsx'
import repo from '../generated/repo.json'
import {GithubIcon, StarIcon} from '../showcase/brand-icons'
import classes from './github-stars.module.css'

/**
 * GitHub mark + star count, baked in at build time by
 * scripts/fetch-repo-meta.mts (no runtime API call — see that file).
 * Hovering swaps the count for a "Star" nudge.
 */
export function GithubStars() {
  return (
    <a
      className={clsx(classes.root, 'zap-subcontent-semibold')}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Star ${repo.owner}/${repo.repo} on GitHub — ${repo.stars} stars`}
      title={`Star ${repo.owner}/${repo.repo} on GitHub`}
    >
      <GithubIcon />
      <span className={classes.swap}>
        <span className={classes.count}>{formatStars(repo.stars)}</span>
        <span className={classes.nudge} aria-hidden>
          <StarIcon />
          Star
        </span>
      </span>
    </a>
  )
}

/** 8 → "8", 1_240 → "1.2k", 120_400 → "120k" */
export function formatStars(stars: number): string {
  if (stars < 1000) return String(stars)
  const thousands = stars / 1000
  return `${thousands < 10 ? thousands.toFixed(1) : Math.round(thousands)}k`
}
