import clsx from 'clsx'
import classes from './styles.module.css'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({className, ...props}: SkeletonProps) {
  return <span className={clsx(classes.container, className)} {...props} />
}
