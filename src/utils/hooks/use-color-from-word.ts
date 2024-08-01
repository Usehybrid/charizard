import * as React from 'react'
import {getColorsFromWord} from '..'

export function useColorsFromWord(word: string): {darkerColor: string; lighterColor: string} {
  return React.useMemo(() => getColorsFromWord(word), [word])
}
