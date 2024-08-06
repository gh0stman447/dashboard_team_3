import React from 'react';

interface ArrowGreenUpProps {
  width?: string;
  height?: string;
}
export const ArrowGreenUp: React.FC<ArrowGreenUpProps> = ({ height = '24', width = '24' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.54071 18.25L11.5 1L21.4593 18.25H1.54071Z" fill="#15C411" stroke="black" />
    </svg>
  );
};