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

const colorCache = new Map<string, {darkerColor: string; lighterColor: string}>()

/**
 * Computes and returns colors based on a given word.
 *
 * @param word - The word to derive colors from.
 * @returns An object containing the darker and lighter color values.
 */
export const getColorsFromWord = (word: string) => {
  if (colorCache.has(word)) {
    return colorCache.get(word)!
  }

  let randomHash = 0
  for (let i = 0; i < word.length; i++) {
    const char = word.charCodeAt(i)
    randomHash = (randomHash << 5) - randomHash + char
    randomHash |= 0
  }

  const hue = Math.abs(randomHash) % 360
  const saturation = Math.abs(randomHash * 2) % 100
  const baseLightness = Math.min((Math.abs(randomHash * 3) % 50) + 50, 80)
  const darkerColor = `hsl(${hue}, ${saturation}%, ${baseLightness - 20}%)`
  const lighterColor = `hsl(${hue}, ${saturation}%, ${baseLightness + 20}%)`

  const colors = {darkerColor, lighterColor}
  colorCache.set(word, colors)

  return colors
}

export const lightenHexColor = (hex: string, percent: number = 75): string => {
  const num = parseInt(hex.slice(1), 16)
  const red = (num >> 16) & 255
  const green = (num >> 8) & 255
  const blue = num & 255

  const lighten = (channel: number) => Math.round(channel + (255 - channel) * (percent / 100))

  return `#${[lighten(red), lighten(green), lighten(blue)]
    .map(channel => channel.toString(16).padStart(2, '0'))
    .join('')}`
}

export const isObject = (value: any): boolean => {
  if (value === null) return false
  if (typeof value !== 'object') return false
  if (Array.isArray(value)) return false
  if (value instanceof Date) return false
  if (value instanceof RegExp) return false
  return true
}

export const isString = (value: any): boolean => {
  return typeof value === 'string' || value instanceof String
}

export const isArrayOfString = (arr: unknown): arr is string[] => {
  return Array.isArray(arr) && arr.every(item => isString(item))
}

export const formatDate = (value: string) => {
  const date = new Date(value)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const formatTime = (value: string) => {
  const date = new Date(value)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12
  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  return `${formattedHours}:${formattedMinutes} ${ampm}`
}

export const getDefaultFormattedDateTime = (date: string) => {
  return formatDate(date) + ' | ' + formatTime(date)
}

export const isExactISODateFormat = (value: string): boolean => {
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return isoFormatRegex.test(value)
}
