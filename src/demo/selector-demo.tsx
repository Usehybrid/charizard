import {SelectorsV2} from '../components'
import {useState} from 'react'

export function SelectorDemo() {
  const [selectedValue, setSelectedValue] = useState('option1')

  const dummyOptions = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ]

  return (
    <SelectorsV2
      options={dummyOptions}
      value={selectedValue}
      onChange={newValue => setSelectedValue(newValue)}
    />
  )
}
