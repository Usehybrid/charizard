import type {Meta, StoryObj} from '@storybook/react'
import {ButtonV2} from './ButtonV2'
import {BUTTON_V2_VARIANT} from './types'

const meta: Meta<typeof ButtonV2.GroupAction> = {
  component: ButtonV2.GroupAction,
}

export default meta

type Story = StoryObj<typeof ButtonV2.GroupAction>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_V2_VARIANT.PRIMARY,
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
    variant: BUTTON_V2_VARIANT.SECONDARY,
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
    variant: BUTTON_V2_VARIANT.TERTIARY,
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
