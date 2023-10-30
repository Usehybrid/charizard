import {LOADER_VARIANT, Loader} from './Loader'
import type {Meta, StoryObj} from '@storybook/react'

const meta: Meta<typeof Loader> = {
  component: Loader,
}

export default meta

type Story = StoryObj<typeof Loader>

export const Ring: Story = {
  args: {
    variant: LOADER_VARIANT.RING,
  },
}

export const DualRing: Story = {
  args: {
    variant: LOADER_VARIANT.DUAL_RING,
  },
}

export const Ellipses: Story = {
  args: {
    variant: LOADER_VARIANT.ELLIPSES,
  },
}

export const Grid: Story = {
  args: {
    variant: LOADER_VARIANT.GRID,
  },
}

export const Hourglass: Story = {
  args: {
    variant: LOADER_VARIANT.HOURGLASS,
  },
}

export const Ripple: Story = {
  args: {
    variant: LOADER_VARIANT.RIPPLE,
  },
}

export const Roller: Story = {
  args: {
    variant: LOADER_VARIANT.ROLLER,
  },
}

export const Spinner: Story = {
  args: {
    variant: LOADER_VARIANT.SPINNER,
  },
}
