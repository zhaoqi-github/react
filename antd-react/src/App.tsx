import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        {/* <Button onClick={(e) => { e.stopPropagation() }}>hello</Button>
          <Button btnType={ButtonType.Primary} size='lg'>hello</Button>
          <Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank">Baidu Link</Button> */}

        <Menu defaultIndex={'0'} onSelect={(index) => { console.log(index) }} mode="vertical" defaultOpenSubMenus={['2']}>
          {/* <MenuItem index={0}> 不再需要手动添加index */}
          <MenuItem>
            link 1
          </MenuItem>
          <MenuItem disabled>
            link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <MenuItem>
            link 3
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

export default App;
