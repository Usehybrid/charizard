export type Value = {
  first_name: string
  middle_name: string | null
  last_name: string | null
  profile_img_url: string
  work_email: string
}

export type Detail = {
  key: string
  value: Value | string | null
}

export type Task = {
  id: string
  type: string
  name: string
  date: string
  details: Detail[]
  status: string
  details_path: string
}
