import {Alert, ALERT_TYPES} from '../components'

export function AlertDemo() {
  return (
    <Alert
      alertType={ALERT_TYPES.DEFAULT}
      header={<div>Alert Header</div>}
      body={
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi perferendis, quibusdam
          autem magnam natus adipisci fugiat ex, error, corporis omnis impedit. Velit totam maiores
          a eum rem nemo hic officiis fugit, exercitationem fuga odit. Ducimus tempora reprehenderit
          fugiat nisi, impedit, provident consequuntur id amet neque molestias sunt.
        </p>
      }
      //   showMore={showMore}
      //   setShowMore={setShowMore}
    />
  )
}
