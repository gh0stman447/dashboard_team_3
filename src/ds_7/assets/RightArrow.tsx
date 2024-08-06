import React from 'react';

export const RightArrow = ({ height = '24', width = '24' }: { height?: string; width?: string }) => {
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
      className="lucide lucide-arrow-big-right-dash"
    >
      <path d="M5 9v6" />
      <path d="M9 9h3V5l7 7-7 7v-4H9V9z" />
    </svg>
  );
};
