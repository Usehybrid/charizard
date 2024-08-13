import {TaskCards} from '../components'

export default function TaskCardDemo() {
  return <TaskCards headers={headers} data={tasks} menuItems={menuItems} />
}

const menuItems = [
  {
    label: 'Test 1',
    onClick: () => {},
    // filterFn: (data: any) => {
    //   console.log('test', data)
    //   return true
    // },
  },
]

const tasks = [
  {
    module_id: '3e22329e-2e6c-41f3-a55a-577021d00fa1',
    module_name: 'Attendance',
    module_reference: 'attendance',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/attendance.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'Lunch Break',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Clock In',
        value: '12 PM',
      },
      {
        key: 'Clock Out',
        value: '1 PM',
      },
      {
        key: 'Note',
        value: 'Lunch Break',
      },
      {
        key: 'Cycle',
        value: '24hrs',
      },
    ],
    status: 'Pending',
  },
  {
    module_id: '29f78540-62da-40c8-be56-131522e752d9',
    module_name: 'Leave',
    module_reference: 'leave',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/leave.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'Sick Leave',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Leave Duration',
        value: '3Days',
      },
      {
        key: 'Note',
        value: 'Fever and Cold',
      },
      {
        key: 'Attachment',
        value: null,
      },
    ],
    status: 'Cancelled',
  },
  {
    module_id: '90640ef8-7d4f-4542-8b9b-cfebaf33ecd5',
    module_name: 'IT Request',
    module_reference: 'it-request',
    icon_url: 'https://assets.zenadmin.ai/zen-ex-icons/tasks/it-request.svg',
    static_module: true,
    external_link: null,
    form_link: null,
    name: 'AWS Access',
    date: '10 Apr, 2023, 04:34 PM',
    details: [
      {
        key: 'Raised by',
        value: {
          first_name: 'Hybr1d',
          middle_name: 'hi',
          last_name: 'Dev',
          profile_img_url:
            'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user_document/undefined/Bertram_Gilfoyle.webp',
          work_email: 'dev@hybr1d.io',
        },
      },
      {
        key: 'Access for',
        value: 'AWS',
      },
      {
        key: 'Access level',
        value: 'user',
      },
      {
        key: 'Request type',
        value: 'Access',
      },
      {
        key: 'Note',
        value: 'To access cloudwatch logs',
      },
    ],
    status: 'Pending 2nd Approver',
  },
]
const headers = ['Task', 'Details', 'Status']
