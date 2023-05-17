import { render, screen, fireEvent } from '@testing-library/react'
import Button from './button'

const defaultProps = {
  onClick: jest.fn(),
}

it('should render the correct default button', () => {
  render(<Button {...defaultProps}>default-btn</Button>);
  const element = screen.getByText('default-btn');
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('BUTTON')
  expect(element).toHaveClass('btn btn-default')
  expect(element).toHaveAttribute('disabled')
  /* fireEvent.click(element);
  expect(defaultProps.onClick).toBeCalled() */
})

it('should render then correct component based on different props', () => { })

it('should render a link when btnType equals link and href is provided', () => {

})

it('should render disabled button when disabled set to true', () => {

})