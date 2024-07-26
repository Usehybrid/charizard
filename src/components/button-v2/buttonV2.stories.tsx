import type {Meta, StoryObj} from '@storybook/react'
import {ButtonV2, BUTTON_V2_VARIANT} from './ButtonV2'

const meta: Meta<typeof ButtonV2> = {
  component: ButtonV2,
}

export default meta

type Story = StoryObj<typeof ButtonV2>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_V2_VARIANT.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_V2_VARIANT.SECONDARY,
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Click me',
    variant: BUTTON_V2_VARIANT.TERTIARY,
  },
}
