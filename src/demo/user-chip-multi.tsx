import {USER_CHIP_STATUS, UsersChip} from '../components'

export function UserChipMultiDemo() {
  const users = [
    {
      first_name: 'Olaf',
      middle_name: null,
      last_name: 'test3',
      work_email: 'olaf.test3@gmail.com',
      profile_img_url:
        'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user-avatars/neutral/9.png',
      id: 'cea4d3ed-bc4b-4092-ba5d-8245a106e08d',
    },
    // {
    //   first_name: 'Emma',
    //   middle_name: null,
    //   last_name: 'Watson',
    //   work_email: 'emm.watson@hybr1d.io',
    //   profile_img_url:
    //     'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user-avatars/female/3.png',
    //   id: '20297f5a-7349-425e-8c52-22ad78897e65',
    // },
    // {
    //   first_name: 'asg',
    //   middle_name: null,
    //   last_name: 'g0',
    //   work_email: 'ashu-g6@test.com',
    //   profile_img_url:
    //     'https://hybrid-dev-test.s3.us-west-2.amazonaws.com/user-avatars/male/14.png',
    //   id: '6c32e9a5-9d2e-4fc8-a231-fe90ff0a990f',
    // },
  ]
  return (
    <div style={{display: 'flex', gap: '24px'}}>
      <UsersChip status={USER_CHIP_STATUS.WHITE} users={users} />
      <UsersChip status={USER_CHIP_STATUS.NEUTRAL} users={users} />
      <UsersChip status={USER_CHIP_STATUS.POSITIVE} users={users} />
      <UsersChip status={USER_CHIP_STATUS.ERROR} users={users} />
      <UsersChip status={USER_CHIP_STATUS.WARNING} users={users} />
      <UsersChip status={USER_CHIP_STATUS.HIGHLIGHT} users={users} />
      <UsersChip status={USER_CHIP_STATUS.DEFAULT} users={users} />
    </div>
  )
}
