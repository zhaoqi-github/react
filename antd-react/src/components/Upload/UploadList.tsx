import React from "react";
import { UploadFileProps } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

interface UploadListProps {
  fileList: UploadFileProps[];
  onRemove: (_file: UploadFileProps) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul className="upload-list">
      {fileList.map(item => {
        return (
          <li key={item.uid} className="upload-list-item">
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file-alt' theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRemove(item) }} />
            </span>
            {item.status === 'uploading' &&
              <Progress percent={item.percent || 0} />
            }
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList;