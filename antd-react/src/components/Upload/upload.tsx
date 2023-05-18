import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import { Dragger } from "./dragger";

// 字符串字面量
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**上传的文件列表,*/
  defaultList?: UploadFileProps[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: UploadFileProps) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFileProps) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFileProps) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFileProps) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFileProps) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFileProps) => void;
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传的自定义文件字段名 */
  name?: string;
  /**上传时附带的额外数据 */
  data?: { [key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
  children?: React.ReactNode
}
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File; // 原始文件信息
  response?: any;
  error?: any
}
export type UploadFileProps = Partial<UploadFile & File>;
export const Upload: React.FC<UploadProps> = (props) => {
  const { action, defaultList, onProgress, onSuccess, onError, beforeUpload, onChange, onRemove, name, data, headers, withCredentials, accept, multiple, children, drag } = props;
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFileProps[]>(defaultList || [])
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

    if (data) { // 自定义数据
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }

    axios.post(action, formData, {
      headers: {
        ...headers, // 自定义 headers
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        const total = e.total as number;
        // console.log(e.loaded, total)
        let percentage = Math.round((e.loaded / total) * 100) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          // 上传中
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then((res) => {
      updateFileList(_file, { status: 'success', response: res.data })
      // 成功后回调执行 onSuccess 和 onChange
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch((err) => {
      updateFileList(_file, { status: 'error', error: err })
      // 成功后回调执行 onError 和 onChange
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

  const handleRemove = (file: UploadFileProps) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  return (
    <div
      className="upload-component"
    >
      <div
        className="upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}>
        {drag ?
          <Dragger onFile={uploadFiles}>
            {children}
          </Dragger> :
          children
        }
        <input
          className="file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;

