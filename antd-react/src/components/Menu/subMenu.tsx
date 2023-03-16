import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  // 实现纵向菜单子项某人展开
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index): false;
  const [menuOpen, setMenuOpen] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', {
    'is-active': context.index === index
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    setTimeout(() => {
      setMenuOpen(toggle);
    }, 300)
  }
  // 纵向菜单点击显示
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  // 横向菜单hover显示
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const subMenuClass = classNames('menu-submenu', {
      'menu-opened': menuOpen
    })
    const childComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    })
    return <ul className={subMenuClass}>{childComponent}</ul>
  }

  return <li key={index} className={classes} {...hoverEvents}>
    <div className="submenu-title" {...clickEvents}>
      {title}
    </div>
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;