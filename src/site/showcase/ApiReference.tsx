import clsx from 'clsx'
import propsData from '../generated/props.json'
import type {ComponentEntry} from '../manifest'
import classes from './api-reference.module.css'

interface PropDoc {
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: string
}

interface ComponentDoc {
  props: PropDoc[]
  nativeProps?: string
}

const docs = propsData as Record<string, ComponentDoc>

/**
 * Prop tables, generated from the TypeScript types by scripts/extract-props.mts
 * — never hand-written, so they can't drift from the source.
 */
export function ApiReference({entry}: {entry: ComponentEntry}) {
  const names = (entry.exports ?? [entry.title]).filter(name => docs[name])
  if (names.length === 0) return null

  return (
    <section className={classes.root}>
      <h2 id="api-reference" className={clsx(classes.heading, 'zap-heading-semibold')}>
        API reference
      </h2>
      <p className={clsx(classes.note, 'zap-content-regular')}>
        Generated from the component&apos;s TypeScript types.
      </p>

      {names.map(name => {
        const doc = docs[name]
        return (
          <div key={name} className={classes.block}>
            <h3 className={clsx(classes.componentName, 'zap-content-semibold')}>{name}</h3>
            {doc.nativeProps && (
              <p className={clsx(classes.native, 'zap-subcontent-regular')}>
                Also accepts every native <code>&lt;{doc.nativeProps}&gt;</code> attribute.
              </p>
            )}
            <div className={classes.tableWrap}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th className="zap-caption-semibold">Prop</th>
                    <th className="zap-caption-semibold">Type</th>
                    <th className="zap-caption-semibold">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map(prop => (
                    <tr key={prop.name}>
                      <td>
                        <code className={classes.propName}>{prop.name}</code>
                        {prop.required && (
                          <span className={clsx(classes.required, 'zap-caption-semibold')}>
                            required
                          </span>
                        )}
                        {prop.description && (
                          <p className={clsx(classes.description, 'zap-subcontent-regular')}>
                            {prop.description}
                          </p>
                        )}
                      </td>
                      <td>
                        <code className={classes.type}>{prop.type}</code>
                      </td>
                      <td>
                        {prop.defaultValue ? (
                          <code className={classes.default}>{prop.defaultValue}</code>
                        ) : (
                          <span className={classes.empty}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </section>
  )
}
