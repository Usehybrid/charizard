import type {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button'
import {BUTTON_VARIANT} from './types'

const meta: Meta<typeof Button.GroupAction> = {
  component: Button.GroupAction,
}

export default meta

type Story = StoryObj<typeof Button.GroupAction>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.PRIMARY,
    menuItems: [
      {
        label: 'Item 1',
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        label: 'Disabled Item',
        onClick: () => console.log('Item 1 clicked'),
        disabled: true,
      },
    ],
  },
}

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.SECONDARY,
    menuItems: [
      {
        label: 'Item 1',
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        label: 'Disabled Item',
        onClick: () => console.log('Item 1 clicked'),
        disabled: true,
      },
    ],
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.TERTIARY,
    menuItems: [
      {
        label: 'Item 1',
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        label: 'Disabled Item',
        onClick: () => console.log('Item 1 clicked'),
        disabled: true,
      },
    ],
  },
}
