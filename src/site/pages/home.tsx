import {Link} from 'react-router'
import {CATEGORIES} from '../manifest'
import classes from './home.module.css'

export default function Home() {
  return (
    <div>
      <h1 className={classes.title}>Charizard Design System</h1>
      <p className={classes.lede}>
        The React component library powering ZenAdmin. Every component ships with its styles, full
        TypeScript prop types, and accessibility built in. This site renders the real components
        from source — what you see here is exactly what ships.
      </p>

      <pre className={classes.install}>
        <code>pnpm add @hybr1d-tech/charizard</code>
      </pre>

      <p className={classes.lede}>
        Building with AI? The whole design system is machine-readable:{' '}
        <a href={`${import.meta.env.BASE_URL}llms.txt`}>llms.txt</a> for prompts and agents,{' '}
        <a href={`${import.meta.env.BASE_URL}components.json`}>components.json</a> for tooling —
        every component with its import, description, and copy-paste usage snippets.
      </p>

      <div className={classes.grid}>
        {CATEGORIES.map(category => (
          <div key={category.name} className={classes.card}>
            <h2 className={classes.cardTitle}>{category.name}</h2>
            <div className={classes.cardLinks}>
              {category.entries.map(entry => (
                <Link key={entry.slug} to={`/components/${entry.slug}`} className={classes.cardLink}>
                  {entry.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
