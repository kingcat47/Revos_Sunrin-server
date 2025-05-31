import React, {type CSSProperties, type ReactElement} from "react";

interface Props {
  icon: ReactElement; // ReactElement 로 제한
  color: string;
  width?: number;
  height?: number;
}

export default function SvgIcon({
                           icon,
                           color,
                           width,
                           height,
                         }: Props): ReactElement {
  const styledIcon = React.cloneElement(
      icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      {
        style: {
          fill: color,
          color: color,
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : "auto",
        } as CSSProperties,
      }
  );

  return <>{styledIcon}</>;
}