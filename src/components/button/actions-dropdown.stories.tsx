import type {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button'
import icon from '../assets/check.svg'

const meta: Meta<typeof Button.ActionsDropdown> = {
  component: Button.ActionsDropdown,
}

export default meta

type Story = StoryObj<typeof Button.ActionsDropdown>

export const ActionsDropdown: Story = {
  args: {
    menuItems: [
      {
        label: 'Item 1',
        iconSrc: icon,
        onClick: () => console.log('Item 1 clicked'),
        filterFn: () => {},
      },
      {
        label: 'Disabled Item',
        iconSrc: icon,
        onClick: () => console.log('Item 1 clicked'),
        disabled: true,
        filterFn: () => {},
      },
    ],
  },
}
