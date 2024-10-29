import type {Meta, StoryObj} from '@storybook/react'
import {Upload} from './Upload'
import {DOCS_TYPE} from '../../types'


const meta: Meta<typeof Upload> = {
  component: Upload,
}

export default meta

type Story = StoryObj<typeof Upload>

export const UploadDefault: Story = {
  args: {
    type: DOCS_TYPE.COMMENT_DOCS,
    disabled: false,
    getUploadDoc: () => {},
  },
}
