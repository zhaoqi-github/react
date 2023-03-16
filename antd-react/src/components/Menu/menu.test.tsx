import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: ' test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>jerry</MenuItem>
    </Menu>
  );
};

let menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  const setup = () => {
    render(generateMenu(testProps));
    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');
  };

  it('should render correct Menu and MenuItem based on default props', () => {
    setup();
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    // expect(menuElement.querySelectorAll).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    setup();
    const thirdItem = screen.getByText('jerry');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
  });


  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
})


