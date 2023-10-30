import type {Meta, StoryObj} from '@storybook/react'
import {Button, BUTTON_VARIANT} from './Button'

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

export const Ghost: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.GHOST,
  },
}

export const Link: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.LINK,
  },
}

export const Minimal: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_VARIANT.MINIMAL,
  },
}
