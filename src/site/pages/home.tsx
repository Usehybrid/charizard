import * as React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router'
import {CATEGORIES} from '../manifest'
import {CopyButton} from '../showcase/CodeBlock'
import {GithubIcon, StarIcon} from '../showcase/brand-icons'
import {ArrowRightIcon} from '../showcase/icons'
import repo from '../generated/repo.json'
import classes from './home.module.css'

const INSTALL_COMMANDS = {
  pnpm: 'pnpm add @hybr1d-tech/charizard',
  bun: 'bun add @hybr1d-tech/charizard',
} as const

type PackageManager = keyof typeof INSTALL_COMMANDS

export default function Home() {
  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <span className={clsx(classes.eyebrow, 'zap-caption-semibold')}>
          Charizard UI
        </span>
        <h1 className={classes.title}>The ZenAdmin design system</h1>
        <p className={clsx(classes.lede, 'zap-content-regular')}>
          Charizard is the React component library behind ZenAdmin&apos;s console, ops dashboard and
          employee app. Every component ships with its own styles, full TypeScript prop types and
          accessibility built in. This site renders the real components from source — what you see
          here is exactly what ships.
        </p>

        <div className={classes.actions}>
          <Link to="/components/button" className={clsx(classes.cta, 'zap-content-medium')}>
            Browse components
            <ArrowRightIcon />
          </Link>
          <a
            className={clsx(classes.star, 'zap-content-medium')}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Star on GitHub
            <span className={classes.starCount}>
              <StarIcon />
              {repo.stars}
            </span>
          </a>
        </div>
      </section>

      <section className={classes.installSection} aria-labelledby="install-title">
        <div>
          <span className={clsx(classes.sectionLabel, 'zap-caption-semibold')}>Get started</span>
          <h2 id="install-title" className={clsx(classes.installTitle, 'zap-heading-semibold')}>
            Install Charizard
          </h2>
          <p className={clsx(classes.installDescription, 'zap-content-regular')}>
            Add the package with your preferred package manager. The command shown here uses pnpm.
          </p>
        </div>
        <InstallCommand />
      </section>

      <section className={classes.catalog} aria-labelledby="catalog-title">
        <div className={classes.catalogHeader}>
          <div>
            <span className={clsx(classes.sectionLabel, 'zap-caption-semibold')}>Library</span>
            <h2 id="catalog-title" className={classes.catalogTitle}>
              Explore components
            </h2>
          </div>
          <p className={clsx(classes.catalogDescription, 'zap-content-regular')}>
            Production-ready building blocks, documented with live examples and their complete API.
          </p>
        </div>

        {CATEGORIES.map(category => (
          <section key={category.name} className={classes.category}>
            <div className={classes.categoryHeader}>
              <h3 className={clsx(classes.categoryTitle, 'zap-content-semibold')}>
                {category.name}
              </h3>
              <span className={clsx(classes.categoryCount, 'zap-caption-medium')}>
                {category.entries.length}
              </span>
            </div>
            <ul className={classes.componentGrid}>
              {category.entries.map(entry => (
                <li key={entry.slug} className={classes.componentItem}>
                  <Link to={`/components/${entry.slug}`} className={classes.componentCard}>
                    <span className={classes.componentCardHeader}>
                      <span className="zap-content-semibold">{entry.title}</span>
                      <span className={classes.componentArrow} aria-hidden>
                        <ArrowRightIcon />
                      </span>
                    </span>
                    <span className={clsx(classes.componentDescription, 'zap-subcontent-regular')}>
                      {entry.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </div>
  )
}

function InstallCommand() {
  const [manager, setManager] = React.useState<PackageManager>('pnpm')
  const command = INSTALL_COMMANDS[manager]

  return (
    <div className={classes.installCommand}>
      <div className={classes.managerTabs} role="tablist" aria-label="Package manager">
        {(Object.keys(INSTALL_COMMANDS) as PackageManager[]).map(option => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={manager === option}
            className={clsx(
              classes.managerTab,
              manager === option && classes.managerTabActive,
              'zap-subcontent-medium',
            )}
            onClick={() => setManager(option)}
          >
            {option === 'bun' ? 'Bun' : 'pnpm'}
          </button>
        ))}
      </div>
      <div className={classes.commandRow}>
        <code className={classes.installCode}>{command}</code>
        <CopyButton value={command} tone="light" />
      </div>
    </div>
  )
}
