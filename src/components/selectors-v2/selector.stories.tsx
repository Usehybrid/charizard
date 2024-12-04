import {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {SelectorsV2} from './SelectorsV2'

const meta: Meta<typeof SelectorsV2> = {
  title: 'Components/SelectorsV2',
  component: SelectorsV2,
  argTypes: {
    onChange: {action: 'changed'},
  },
}

export default meta

type Story = StoryObj<typeof SelectorsV2>

export const Default: Story = {
  args: {
    options: [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
    ],
    value: 'option1',
  },
}

export const WithCustomOptions: Story = {
  args: {
    options: [
      {label: 'Custom 1', value: 'custom1'},
      {label: 'Custom 2', value: 'custom2'},
      {label: 'Custom 3', value: 'custom3'},
    ],
    value: 'custom1',
  },
}

export const Interactive: Story = {
  render: args => {
    const [selectedValue, setSelectedValue] = useState(args.value)

    return (
      <SelectorsV2
        {...args}
        value={selectedValue}
        onChange={newValue => {
          setSelectedValue(newValue)
          args.onChange(newValue)
        }}
      />
    )
  },
}
