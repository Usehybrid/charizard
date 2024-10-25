import {Accordion, useAccordionStore} from '../components/accordion'

export function AccordionDemo() {
  const activeEventKey = useAccordionStore(state => state.activeEventKey)
  const setActiveEventKey = useAccordionStore(state => state.setActiveEventKey)
  console.log(activeEventKey)

  return (
    <Accordion defaultActiveKey="header-1">
      <Accordion.Item eventKey="header-1">
        <Accordion.Header eventKey="header-1">
          <div onClick={() => setActiveEventKey('header-1')}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur at explicabo optio
            facere hic culpa odit maxime! Quia quis ex tenetur dolorum sint, architecto beatae
            distinctio voluptatem culpa praesentium rerum aperiam? Eos quasi sint voluptatum optio
            molestias illum similique ullam.
          </div>
        </Accordion.Header>
        <Accordion.Collapse eventKey="header-1">
          <div>This is a sample body which is a react component</div>
        </Accordion.Collapse>
      </Accordion.Item>

      <Accordion.Item eventKey="header-2">
        <Accordion.Header eventKey="header-2">This is another header</Accordion.Header>
        <Accordion.Collapse eventKey="header-2">
          <div onClick={() => setActiveEventKey('header-2')}>This is another body</div>
        </Accordion.Collapse>
      </Accordion.Item>
    </Accordion>
  )
}
