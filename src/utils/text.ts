export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 || count === 0 || count === undefined || count === null ? singular : plural
}

export const truncate = (text: string, max?: number) => {
  if (!max) {
    return text
  }
  return text.length > max ? `${text.substring(0, max)}...` : text
}

export const getInitials = (name: string) => {
  const nameParts = name.split(' ').filter(Boolean)
  return nameParts.slice(0, 2).reduce((acc, part) => acc + (part[0] || '').toUpperCase(), '')
}
export const getUsername = (user?: any) => {
  if (!user || !user.first_name) return '-'

  let userName = user.first_name

  if (user.middle_name) {
    userName += ` ${user.middle_name}`
  }

  if (user.last_name) {
    userName += ` ${user.last_name}`
  }

  return userName
}

// todo add react toast in charizard
export const clipboard = async (text?: string, showToast = true) => {
  if (!text) return
  await navigator.clipboard.writeText(text).catch(console.error)

  // if (showToast) {
  //   toastSuccess({
  //     msg: `Successfully copied ${text}`,
  //     options: {
  //       toastId: text,
  //       autoClose: 3000,
  //     },
  //   })
  // }
}
