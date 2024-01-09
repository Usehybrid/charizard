import type {Meta, StoryObj} from '@storybook/react'
import {Combobox} from './ComboBox'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
}

export default meta

type Story = StoryObj<typeof Combobox>

export const clientSideSearch: Story = {
  name: 'Combo box without backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    label: 'Combo Box',
    disabled: false,
    isAPIFilter: false,
  },
}

export const serverSideSearch: Story = {
  name: 'Combo box with backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    disabled: false,
    isAPIFilter: true,
    label: 'Combo Box',
    onChange: async (test: string) => {},
  },
}

export const disabledCombobox: Story = {
  name: 'Combo box disabled',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    label: 'Combo Box',
    disabled: true,
    isAPIFilter: false,
  },
}

export const clientSideSearchWithNoResult: Story = {
  name: 'Combo box disabled',
  args: {
    defaultOptions: [],
    label: 'Combo Box',
    disabled: false,
    isAPIFilter: false,
  },
}

export const serverSideSearchWithNoResult: Story = {
  name: 'Combo box with backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    disabled: false,
    isAPIFilter: true,
    label: 'Combo Box',
    onChange: async (test: string) => {},
  },
}
