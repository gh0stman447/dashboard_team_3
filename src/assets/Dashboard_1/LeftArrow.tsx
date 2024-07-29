import React from 'react';

const LeftArrow = ({ height = '24', width = '24' }: { height?: string; width?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-arrow-big-left-dash"
    >
      <path d="M19 15V9" />
      <path d="M15 15h-3v4l-7-7 7-7v4h3v6z" />
    </svg>
  );
};

export default LeftArrow;
