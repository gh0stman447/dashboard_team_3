import React from 'react';

interface ArrowRedDownProps {
  width?: string;
  height?: string;
}

export const ArrowRedDown: React.FC<ArrowRedDownProps> = ({ height = '24', width = '24' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.54071 0.75L11.5 18L21.4593 0.75H1.54071Z" fill="#C41115" stroke="black" />
    </svg>
  );
};