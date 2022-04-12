import React from 'react'
import { CircleStyled } from './CircleProgressBar.style';

interface ICircularProgressBar {
  sqSize: string
  percentage: number,
  strokeWidth: string
}

export const CircularProgressBar = ({ sqSize, percentage, strokeWidth}: ICircularProgressBar) => {
  const radius = (+sqSize - +strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * percentage / 100;

  return (
      <CircleStyled
        width={sqSize}
        height={sqSize}
        percentage={percentage}
        viewBox={viewBox}>
          <defs>
            <linearGradient id="GradientColor" gradientTransform="rotate(55.74)">
              <stop offset="1.98%" stopColor="#0EA6E8" />
              <stop offset="86.84%" stopColor="#0F3BCC" />
            </linearGradient>
        </defs>
        <circle
          className="circle-background"
          cx={+sqSize / 2}
          cy={+sqSize / 2}
          r={radius}
          strokeWidth={`${+strokeWidth}px`} />
        <circle
          className="circle-progress"
          cx={+sqSize / 2}
          cy={+sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${+sqSize / 2} ${+sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${+percentage}%`}
        </text>
    </CircleStyled>
  );
}