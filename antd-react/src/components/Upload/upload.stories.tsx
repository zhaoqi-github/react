import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { action } from '@storybook/addon-actions'
import Upload from './upload'
import Button from '../Button';
import Icon from '../Icon/icon';

const meta: Meta<typeof Upload> = {
  title: 'Upload',
  id: 'Upload',
  component: Upload,
}
export default meta;

type story = StoryObj<typeof Upload>
export const BasicUpload: story = {
  render: () => {
    return <Upload action='https://jsonplaceholder.typicode.com/posts'>
      <Button >Upload Files</Button>
    </Upload>
  }
}

export const SimpleUpload: story = {
  render: () => {
    return <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onChange={action('changed')}
      onRemove={action('remove')}
      name="fileName"
      data={{ 'key': 'value' }}
      accept='.jpeg'
      multiple={true}
    >
      <Button>Upload Files</Button>
    </Upload>
  }
}

export const DragUpload: story = {
  render: () => {
    return <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onChange={action('changed')}
      onRemove={action('remove')}
      name="fileName"
      accept='.jpeg'
      multiple={true}
      drag={true}
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>点击或者拖动到此区域进行上传</p>
    </Upload>
  }
}

// https://www.mocky.io/v2/5cc8019d300000980a055e76