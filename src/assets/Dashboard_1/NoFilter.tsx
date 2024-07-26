import { duration } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

export const NoFilter = ({
  className,
  width = '16',
  height = '20',
  onClick
}: {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className={clsx('text-[#151515]', className)} onClick={onClick}>
      <svg width={width} height={height} viewBox="0 0 18 22" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.1463 3.85714H1.39024V5.89795C1.39024 6.71427 4.90244 10.3877 4.90244 10.3877L1 14.4694L2.56098 16.102L15.439 2.63265L13.878 1L11.1463 3.85714Z"
          fill="#151515"
        />
        <path
          d="M16.2195 3.85714L7.2439 13.2449C7.2439 13.2449 7.63415 13.653 7.63415 14.0612V21L10.7561 19.3673V14.0612V13.653C10.7561 13.61 10.8254 13.4991 10.9493 13.3346C12.0022 11.9371 17 6.67128 17 6.30611V3.85714H16.2195Z"
          fill="#151515"
        />
        <path
          d="M11.1463 3.85714H1.39024V5.89795C1.39024 6.71427 4.90244 10.3877 4.90244 10.3877L1 14.4694L2.56098 16.102L15.439 2.63265L13.878 1L11.1463 3.85714Z"
          stroke="#151515"
          stroke-width="0.05"
        />
        <path
          d="M16.2195 3.85714L7.2439 13.2449C7.2439 13.2449 7.63415 13.653 7.63415 14.0612V21L10.7561 19.3673V14.0612V13.653C10.7561 13.61 10.8254 13.4991 10.9493 13.3346C12.0022 11.9371 17 6.67128 17 6.30611V3.85714H16.2195Z"
          stroke="#151515"
          stroke-width="0.05"
        />
      </svg>
    </div>
  );
};
