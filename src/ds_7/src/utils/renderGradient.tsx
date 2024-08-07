import React from 'react';

interface LinearGradientProps {
  id: string;
  colors: { offset: string; stopColor: string; stopOpacity: number }[];
}

export const renderLinearGradient = ({ id, colors }: LinearGradientProps) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    {colors.map((color, index) => (
      <stop key={index} offset={color.offset} stopColor={color.stopColor} stopOpacity={color.stopOpacity} />
    ))}
  </linearGradient>
);
