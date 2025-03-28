import {Accordion, useAccordionStore} from '../components/accordion'

export function AccordionDemo() {
  console.log(useAccordionStore(store => store.activeEventKey))
  return (
    <Accordion
      defaultActiveKey="header-1"
      isMulti
      isOpenAll
      allEventKeys={['header-1', 'header-2']}
    >
      <Accordion.Item eventKey="header-1">
        <Accordion.Header eventKey="header-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur at explicabo optio
          facere hic culpa odit maxime! Quia quis ex tenetur dolorum sint, architecto beatae
          distinctio voluptatem culpa praesentium rerum aperiam? Eos quasi sint voluptatum optio
          molestias illum similique ullam.
        </Accordion.Header>
        <Accordion.Collapse eventKey="header-1">
          <div>This is a sample body which is a react component</div>
        </Accordion.Collapse>
      </Accordion.Item>

      <Accordion.Item eventKey="header-2">
        <Accordion.Header eventKey="header-2">This is another header</Accordion.Header>
        <Accordion.Collapse eventKey="header-2">This is another body</Accordion.Collapse>
      </Accordion.Item>
    </Accordion>
  )
}
