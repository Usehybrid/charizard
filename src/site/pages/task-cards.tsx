import {TaskCards} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

const taskCardsCode = `
import {TaskCards} from '@hybr1d-tech/charizard'

const headers = ['Task', 'Details', 'Status']

// Renders link/navigation affordances, so it must live under a react-router context.
export function OpenTasks() {
  return <TaskCards headers={headers} data={tasks} />
}
`

export default function TaskCardsPage() {
  return (
    <div>
      <h1>Task Cards</h1>
      <p>
        A card-style list for rendering user tasks (approvals, IT requests, workflows) as rows with
        a module icon, task name, detail columns such as the raising user, and a status pill. It
        supports loading and error states plus optional pagination, and uses react-router links
        internally, so it must render inside a router context.
      </p>

      <DemoSection
        title="Task list"
        description="Open IT-request tasks rendered from inline data under the site's existing router context, with 'Task', 'Details', and 'Status' header columns."
        code={taskCardsCode}
      >
        <TaskCards headers={headers} data={tasks} />
      </DemoSection>
    </div>
  )
}

const tasks = [
  {
    module_id: '90640ef8-7d4f-4542-8b9b-cfebaf33ecd5',
    module_name: 'IT Request',
    module_reference: 'it-request',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/it-request.svg',
    static_module: true,
    external_link: null,
    form_link: '#',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 07:06 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Ash',
          middle_name: null,
          last_name: 'Ketchum',
          profile_img_url:
            '',
          work_email: 'ash.ketchum@example.com',
        },
      },
    ],
    status: 'pending',
    type: 'open',
    task_details_id: null,
  },
  {
    module_id: '90640ef8-7d4f-4542-8b9b-cfebaf33ecd5',
    module_name: 'IT Request',
    module_reference: 'it-request',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/it-request.svg',
    static_module: true,
    external_link: null,
    form_link: '#',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 02:45 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Ash',
          middle_name: null,
          last_name: 'Ketchum',
          profile_img_url:
            '',
          work_email: 'ash.ketchum@example.com',
        },
      },
    ],
    status: 'pending',
    type: 'open',
    task_details_id: null,
  },
  {
    module_id: '90640ef8-7d4f-4542-8b9b-cfebaf33ecd5',
    module_name: 'IT Request',
    module_reference: 'it-request',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/it-request.svg',
    static_module: true,
    external_link: null,
    form_link: '#',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 02:45 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Ash',
          middle_name: null,
          last_name: 'Ketchum',
          profile_img_url:
            '',
          work_email: 'ash.ketchum@example.com',
        },
      },
    ],
    status: 'pending',
    type: 'open',
    task_details_id: null,
  },
]
const headers = ['Task', 'Details', 'Status']
