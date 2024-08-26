import type {Meta, StoryObj} from '@storybook/react'
import {Search} from './Search'

const meta: Meta<typeof Search> = {
  component: Search,
}

export default meta

type Story = StoryObj<typeof Search>

export const SearchDefault: Story = {
  args: { setSearch: () => { }, search: 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'},
}
