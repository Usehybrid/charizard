export function isDeepEqual(
  obj1: Record<string, any[]>,
  obj2: Record<string, any[]> | null,
): boolean {
  if (!obj2) return false
  if (obj1 === obj2) {
    return true
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!(key in obj2)) {
      return false
    }

    const val1 = obj1[key]
    const val2 = obj2[key]

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        return false
      }
      for (let i = 0; i < val1.length; i++) {
        if (Array.isArray(val1[i]) && Array.isArray(val2[i])) {
          if (!isDeepEqual(val1[i], val2[i])) {
            return false
          }
        } else if (val1[i] !== val2[i]) {
          return false
        }
      }
    } else if (val1 !== val2) {
      return false
    }
  }

  return true
}
