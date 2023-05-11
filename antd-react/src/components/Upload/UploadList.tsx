import React from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/Progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul>
      {fileList.map(item => {
        return (
          <li key={item.uid}>
            <span>
              <Icon icon='file-alt' theme="secondary"></Icon>
              {item.name}
            </span>
            <span>
              {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span>
              <Icon icon="times" onClick={() => { onRemove(item) }} />
            </span>
            {item.status === 'uploading' &&
              <Progress percent={item.percent || 0}/>
            }
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList;