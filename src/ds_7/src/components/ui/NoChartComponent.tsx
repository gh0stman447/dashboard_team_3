import clsx from 'clsx';
import React from 'react';

const NoChartComponent = ({ label, className }: { label: string; className?: string }) => {
  return <div className={clsx('flex items-center justify-center h-full', className)}>{label}</div>;
};

export default NoChartComponent;
