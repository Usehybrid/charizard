import type {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button'
import {BUTTON_VARIANT} from './types'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.SECONDARY,
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.TERTIARY,
  },
}
