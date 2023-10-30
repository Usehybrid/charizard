import type {Meta, StoryObj} from '@storybook/react'
import {Button, BUTTON_VARIANT} from './Button'
import icon from '../assets/check.svg'

const meta: Meta<typeof Button.MenuButton> = {
  component: Button.MenuButton,
}

export default meta

type Story = StoryObj<typeof Button.MenuButton>

export const MenuButton: Story = {
  args: {
    id: 'hui-menu-button',
    children: 'Add Something',
    menuItems: [
      {
        label: 'Item 1',
        iconSrc: icon,
        onClick: () => console.log('Item 1 clicked'),
        filterFn: () => {},
      },
    ],
  },
}