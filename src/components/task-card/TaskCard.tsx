import Card from './components/card/Card'
import Header from './components/header/Header'
import classes from './styles.module.css'

export function TaskCard({data}: any) {
  return (
    <div className={classes.taskCard}>
      <Header />
      {data.map((data:any) => (
        <Card data={data} key={data.id} />
      ))}
    </div>
  )
}
