// import * as React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {TaskCards} from '../components'

export default function TaskCardDemo() {
  // const [page, setPage] = React.useState(0)
  // const [limit, setLimit] = React.useState(25)

  // console.log({page, limit})

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            index
            element={
              <TaskCards
                headers={headers}
                // isLoading={true}
                // isError={true}
                data={tasks}
                // paginationConfig={{
                //   page,
                //   limit,
                //   setPage,
                //   setLimit,
                //   metaData: {
                //     total_items: 1000,
                //     page_no: 0,
                //     items_on_page: 25,
                //   },
                // }}
              />
            }
          ></Route>,
        ),
      )}
      future={{v7_startTransition: true}}
    />
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
    form_link: 'https://user.usehybrid.co/workflows/b556581b-2d20-4d7b-9048-3aff96b530a1',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 07:06 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d12',
          middle_name: 'Zenadmin',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/android-chrome-512x512.png',
          work_email: 'dev@hybr1d.io',
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
    form_link: 'https://user.usehybrid.co/workflows/b556581b-2d20-4d7b-9048-3aff96b530a1',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 02:45 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d12',
          middle_name: 'Zenadmin',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/android-chrome-512x512.png',
          work_email: 'dev@hybr1d.io',
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
    form_link: 'https://user.usehybrid.co/workflows/b556581b-2d20-4d7b-9048-3aff96b530a1',
    name: 'Access For Figma',
    date: '12 Sep, 2024, 02:45 AM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d12',
          middle_name: 'Zenadmin',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/android-chrome-512x512.png',
          work_email: 'dev@hybr1d.io',
        },
      },
    ],
    status: 'pending',
    type: 'open',
    task_details_id: null,
  },
]
const headers = ['Task', 'Details', 'Status']
