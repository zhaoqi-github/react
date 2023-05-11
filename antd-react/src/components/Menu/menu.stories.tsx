import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

const menuMeta: Meta<typeof Menu> = {
  title: 'Menu',
  id: 'Menu',
  component: Menu,
}
export default menuMeta

const MenuTemplate: StoryObj = {
  render: (args) => {
    return (
      <Menu defaultIndex='0' {...args} >
        <MenuItem>
          cool link
        </MenuItem>
        <MenuItem>
          cool link 2
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <SubMenu title="下拉选项">
          <MenuItem>
            下拉选项一
          </MenuItem>
          <MenuItem>
            下拉选项二
          </MenuItem>
        </SubMenu>
      </Menu>
    );
  },
};

export const DefaultMenu = {
  ...MenuTemplate,
  args: {
    name: '默认 menu'
  },
}

export const ClickMenu = {
  ...MenuTemplate,
  args: {
    name: '纵向 menu',
    defaultIndex: '1'
  }
}

