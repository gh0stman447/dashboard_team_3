import React from 'react';

interface DownloadProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}
export const Download: React.FC<DownloadProps> = ({ width = 24, height = 24, ...props }) => {
  return (
    <div className="cursor-pointer p-2 hover:bg-slate-200 border rounded-xl duration-300" {...props}>
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
        className="lucide lucide-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    </div>
  );
};
