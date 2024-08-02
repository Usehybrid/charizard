import type {Meta, StoryObj} from '@storybook/react'
import {Switch} from './Switch'

const meta: Meta<typeof Switch> = {
  component: Switch,
}

export default meta

type Story = StoryObj<typeof Switch>

export const Checked: Story = {
  args: {
    isToggled: true,
    title: 'Switch',
    handleToggleChange: () => {},
  },
}

export const Initial: Story = {
  args: {
    isToggled: false,
    handleToggleChange: () => { },
  },
}

export const CheckedDisabled: Story = {
  args: {
    isToggled: true,
    disabled: true,
    handleToggleChange: () => { },
  },
}