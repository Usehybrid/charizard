export interface Value {
  first_name: string
  middle_name: string | null
  last_name: string | null
  profile_img_url: string
  work_email: string
}

export interface Detail {
  key: string
  value: Value | string | null
}

export interface Task {
  id: string
  type: string
  name: string
  date: string
  details: Detail[]
  status: string
  details_path: string
}
