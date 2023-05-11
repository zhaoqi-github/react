import React from 'react'
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'
interface LakerPlayerProps {
  value: string;
  number: number;
}

const meta: Meta<typeof AutoComplete> = {
  title: 'AutoComplete',
  component: AutoComplete,
}
export default meta

type Story = StoryObj<typeof AutoComplete>;
export const ASimpleComplete: Story = {
  render: () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
      'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
      return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
    }
    const renderOption = (item: DataSourceType) => {
      return (
        <h2>Name</h2>
      )
    }
    return (
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action('selected')}
        renderOption={renderOption}
      />
    )
  },
  name: '基本的搜索'
}

export const BCustomComplete: Story = {
  render: () => {
    const lakersWithNumber = [
      { value: 'bradley', number: 11 },
      { value: 'pope', number: 1 },
      { value: 'caruso', number: 4 },
      { value: 'cook', number: 2 },
      { value: 'cousins', number: 15 },
      { value: 'james', number: 23 },
      { value: 'AD', number: 3 },
      { value: 'green', number: 14 },
      { value: 'howard', number: 39 },
      { value: 'kuzma', number: 0 },
    ]
    const handleFetch = (query: string) => {
      return lakersWithNumber.filter(player => player.value.includes(query))
    }
    const renderOption = (item: DataSourceType) => {
      const itemWithNumber = item as DataSourceType<LakerPlayerProps>
      return (
        <>
          <b>名字: {itemWithNumber.value}</b>
          <span>球衣号码: {itemWithNumber.number}</span>
        </>
      )
    }
    return (
      <AutoComplete
        fetchSuggestions={handleFetch}
        renderOption={renderOption}
      />
    )
  },
  name: '自定义搜索结果模版'
}