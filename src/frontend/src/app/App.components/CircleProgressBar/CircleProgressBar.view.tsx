import classnames from 'classnames';
import React from 'react'
import { CircleStyled } from './CircleProgressBar.style';

interface ICircularProgressBar {
  sqSize: string
  percentage: number,
  strokeWidth: string,
  isOverallProgress?: boolean,
}

export const CircularProgressBar = ({ sqSize, percentage, strokeWidth, isOverallProgress }: ICircularProgressBar) => {
  const radius = (+sqSize - +strokeWidth) / 2;
  const circumferency = radius * Math.PI * 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashOffset = circumferency - circumferency * percentage / 100;
  const roundedPercentage = Math.round(percentage)

  return (
    <CircleStyled
      viewBox={viewBox}
      className={classnames(isOverallProgress && 'isOverallProgress')}
    >
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
        strokeDashoffset={dashOffset}
        strokeDasharray={circumferency}
      />
      <text
        className="circle-text"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle">
        {`${roundedPercentage}%`}
      </text>
    </CircleStyled>
  );
}