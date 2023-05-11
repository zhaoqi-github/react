import React from "react";
import { ThemeProps } from "../Icon/icon";
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps
}
const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, showText, strokeHeight, styles, theme } = props;
  return (
    <div style={styles}>
      <div style={{ height: `${strokeHeight}` }}>
        <div style={{ width: `${percent}%` }}>
          {showText && <span>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 14,
  showText: true,
  theme: 'primary'
}

export default Progress;