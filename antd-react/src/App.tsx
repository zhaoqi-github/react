import React, { useState, useEffect } from 'react';
/* import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon' */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Upload, { UploadFile } from './components/Upload/upload';
import Icon from './components/Icon/icon';

library.add(fas)

const beforeUpload = (file: File) => {
  // return checkFileSize(file)
  return filePromise(file)
}
// 检测文件大小
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('too big')
    return false
  }
  return true
}
const filePromise = (file: File) => {
  // 文件重命名
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'test1.md', status: 'uploading', percent: 30 },
  { uid: '124', size: 1234, name: 'test2.md', status: 'success', percent: 30 },
  { uid: '125', size: 1234, name: 'test3.md', status: 'error', percent: 30 }
]

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        {/* <input type="file" name='myFile' onChange={handleFileChange} /> */}
        {/* <Button onClick={(e) => { e.stopPropagation() }}>hello</Button>
          <Button btnType='primary' size='lg'>hello</Button>
          <Button btnType='link' href='http://www.baidu.com' target="_blank">Baidu Link</Button> */}

        {/* <MenuItem index={0}> 不再需要手动添加index */}
        {/* <Menu defaultIndex={'0'} onSelect={(index) => { console.log(index) }} defaultOpenSubMenus={['2']}>
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
        </Menu> */}

        {/* <Icon icon="coffee" theme="danger" /> */}
        {/* https://jsonplaceholder.typicode.com/posts */}
        <Upload
          action="https://jsonplaceholder.typicode.com/posts"
          /* onProgress={(percentage, file) => { console.log(percentage, file) }}
          onSuccess={(data, file) => { console.log('success', data, file) }}
          onError={(error, file) => { console.log('error', error, file) }} */
          onChange={(file) => { console.log('change', file) }}
          // beforeUpload={beforeUpload}
          defaultList={defaultFileList}
          onRemove={(file) => { console.log('remove', file) }}
          name="filename"
          data={{ 'key': "test" }}
          headers={{ 'X-powered': 'test' }}
          accept='.pdf'
          multiple={true}
          drag={true}
        >
          <Icon icon='upload' theme='secondary' size='5x'></Icon>
          <br />
          <p>Drag file over to upload</p>
        </Upload>
      </div>
    </>
  )
}

export default App;
