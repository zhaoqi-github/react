import classNames from "classnames";
import React, { useState } from "react";

export interface DraggerProps {
  onFile: (files: FileList) => void;
  children: React.ReactNode
}
export const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    console.log('inside drag', e.dataTransfer.files)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={classes}
      onDragOver={(e) => { handleDrag(e, true) }}
      onDragLeave={(e) => { handleDrag(e, false) }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}