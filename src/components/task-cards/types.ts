export interface ITask {
  module_id: string
  module_name: string
  module_reference: string
  icon_url: string
  static_module: boolean
  external_link: any
  form_link: string | null
  name: string
  date: string
  details: Array<{
    key: string
    value: any
  }>
  status: string
  type: string
  task_details_id: string | null
  leaveFrom?: string
}

export interface ITaskObjectValue {
  first_name: string
  middle_name: string | null
  last_name: string | null
  profile_img_url: string
  work_email: string
}

export interface ITaskDetails {
  key: string
  value: string | ITaskObjectValue | FileType[] | null
}

export interface FileType {
  details: {
    ext: string
    key: string
    type: string
    file_name: string
    icon?: string
  }
  doc_link: string
  file_name: string
}

export enum MODULES {
  PROFILE = 'profile',
  LEAVE = 'leave',
  ATTENDANCE = 'attendance',
  HOLIDAY_CALENDAR = 'holiday-calendar',
  IT_REQUEST = 'it-request',
  IT_SUPPORT = 'it_support',
  WORKFLOW = 'workflow',
  DEVICES = 'devices',
}
