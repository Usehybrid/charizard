import type {Meta, StoryObj} from '@storybook/react'
import Combobox from '.'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
}

export default meta

type Story = StoryObj<typeof Combobox>

export const clientSideSearch: Story = {
  storyName: 'Combo box without backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    label: 'Combo Box',
    disabled: false,
    isAPIFilter: false,
    onSelect: details => console.log(details),
  },
}

export const serverSideSearch: Story = {
  storyName: 'Combo box with backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    disabled: false,
    isAPIFilter: true,
    label: 'Combo Box',
    onChange: async (test: string) => {
      return [
        {label: 'Zambiaa', value: 'ZA', disabled: false},
        {label: 'Beninn', value: 'BN', disabled: false},
      ]
    },
    onSelect: details => console.log(details),
  },
}

export const disabledCombobox: Story = {
  storyName: 'Combo box disabled',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    label: 'Combo Box',
    disabled: true,
    isAPIFilter: false,
    onSelect: details => console.log(details),
  },
}

export const clientSideSearchWithNoResult: Story = {
  storyName: 'Combo box disabled',
  args: {
    defaultOptions: [],
    label: 'Combo Box',
    disabled: false,
    isAPIFilter: false,
    onSelect: details => console.log(details),
  },
}

export const serverSideSearchWithNoResult: Story = {
  storyName: 'Combo box with backend searching',
  args: {
    defaultOptions: [
      {label: 'Zambia', value: 'ZA', disabled: false},
      {label: 'Benin', value: 'BN', disabled: false},
    ],
    disabled: false,
    isAPIFilter: true,
    label: 'Combo Box',
    onChange: async (test: string) => {
      return []
    },
    onSelect: details => console.log(details),
  },
}
