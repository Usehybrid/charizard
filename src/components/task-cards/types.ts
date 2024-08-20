export interface ITask {
  module_id: string
  module_reference: string
  module_name: string
  form_link: string | null
  external_link: string | null
  static_module: boolean
  icon_url: string
  name: string
  date: string
  details: ITaskDetails[]
  status: string
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

interface FileType {
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
