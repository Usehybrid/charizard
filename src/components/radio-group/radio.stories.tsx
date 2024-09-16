import type {Meta, StoryObj} from '@storybook/react'
import {RadioGroup} from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const RadioGroupDefault: Story = {
  args: {
    radioHeading: 'RadioGroup',
    disabled: false,
    showSkeleton: false,
    handleClickManually: true,
    defaultValue: 'label 1',
    items: [
      {
        label: {heading: 'label 1'},
        value: 'label 1',
      },
      {
        label: {heading: 'label 2'},
        value: 'label 2',
      },
      {
        label: {heading: 'label 3'},
        value: 'label 3',
      },
    ],
  },
}
