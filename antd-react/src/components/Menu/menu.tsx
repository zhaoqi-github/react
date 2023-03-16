import React, { useState, createContext } from 'react';
import { MenuItemProps } from './menuItem'
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void // 点击选中某一项

export interface MenuProps {
  defaultIndex?: string; // 用于高亮某个item
  mode?: MenuMode; // 横向还是竖向
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}
// 要传递下去的属性
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
// 利用createContext
export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, mode, className, style, children, onSelect, defaultOpenSubMenus } = props;
  const [curActive, setCurActive] = useState(defaultIndex); // 记录当前点击的是哪一项
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setCurActive(index);
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传递给子组件的context
  const passedContext: IMenuContext = {
    index: curActive ? curActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    const component = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') { // 在组件里手动添加的displayName
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    // console.log(children, component);
    return component;
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;