import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./UploadList";
import { Dragger } from "./dragger";

// 字符串字面量
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadProps {
  action: string;
  defaultList?: UploadFile[];
  children: React.ReactNode;
  beforeUpload?: (file: File) => boolean | Promise<File>; // 一种是经过验证返回true / false；另一种是经过转换返回 promise
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: UploadFileProps) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean
}
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any
}
export type UploadFileProps = Partial<UploadFile & File>;
const Upload: React.FC<UploadProps> = (props) => {
  const { action, defaultList, onProgress, onSuccess, onError, beforeUpload, onChange, onRemove, name, data, headers, withCredentials, accept, multiple, children, drag } = props;
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultList || [])
  // 点击 button 触发 input click, 选择上传文件
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  // update FileList: 要更新的 file; updateObj: 要更新的内容
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    // FormData
    const formData = new FormData()
    formData.append(name || 'file', file)

    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }

    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        const total = e.total as number;
        // console.log(e.loaded, total)
        let percentage = Math.round((e.loaded / total) * 100) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then((res) => {
      updateFileList(_file, { status: 'success', response: res.data })
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch((err) => {
      updateFileList(_file, { status: 'error', error: err })
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        // 调用接口上传文件之前的文件检测
        const res = beforeUpload(file)
        if (res && res instanceof Promise) {
          res.then(processedFile => {
            post(processedFile)
          })
        } else if (res !== false) {
          post(file)
        }
      }
    })
  }
  // input 选择上传文件的 change 事件
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return
    }
    // 上传文件
    uploadFiles(files)
    // 上传完清空
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  return (
    <div onClick={handleClick}>
      {/* <Button btnType="primary" onClick={handleClick}> Upload File</Button> */}
      {drag ?
        <Dragger
          onFile={uploadFiles}
        >
          {children}
        </Dragger> :
        children
      }
      <input type="file" style={{ display: 'none' }} ref={fileInput} onChange={handleFileChange} accept={accept} multiple={multiple} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;

