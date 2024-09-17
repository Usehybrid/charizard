export const generateRange = (x: number, y: number) => {
  const result: {
    label: string
    value: string
  }[] = []

  for (let i = x + 1; i < y; i++) {
    result.push({label: String(i), value: String(i)})
  }
  return result
}
