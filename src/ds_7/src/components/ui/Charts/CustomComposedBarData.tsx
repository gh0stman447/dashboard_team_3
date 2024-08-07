import React, { ReactElement } from 'react';
import { Bar, Brush, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LEVEL_NAMES } from '../../../constants';
import { renderLinearGradient } from '../../../utils/renderGradient';

interface CustomComposedBarDataProps {
  data: any;
  tooltipContent: ReactElement;
  yAxisTickFormatter?: (value: any) => string;
  dataKeys?: { firstKey: string; secondKey: string; thirdKey: string };
  gradientIds?: {
    firstKey: string;
    secondKey: string;
    thirdKey: string;
  };
  brushEnabled?: boolean;
}

const CustomComposedBarData = ({
  data,
  tooltipContent,
  yAxisTickFormatter,
  dataKeys = {
    firstKey: 'empLvl',
    secondKey: 'improvement',
    thirdKey: 'middleLvl'
  },
  gradientIds = {
    firstKey: 'colorEmpLvl',
    secondKey: 'colorImprovement',
    thirdKey: 'colorMiddleLvl'
  },
  brushEnabled = false
}: CustomComposedBarDataProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 25, bottom: 20, left: 10 }}>
        <defs>
          {renderLinearGradient({
            id: gradientIds.firstKey,
            colors: [
              { offset: '5%', stopColor: '#934983', stopOpacity: 0.8 },
              { offset: '95%', stopColor: '#934983', stopOpacity: 0.2 }
            ]
          })}
          {renderLinearGradient({
            id: gradientIds.secondKey,
            colors: [
              { offset: '5%', stopColor: '#00ff00', stopOpacity: 0.8 },
              { offset: '95%', stopColor: '#00ff00', stopOpacity: 0.2 }
            ]
          })}
          {renderLinearGradient({
            id: gradientIds.thirdKey,
            colors: [
              { offset: '5%', stopColor: '#0000ff', stopOpacity: 0.8 },
              { offset: '95%', stopColor: '#0000ff', stopOpacity: 0.2 }
            ]
          })}
        </defs>
        {brushEnabled && data.length > 3 && (
          <Brush dataKey="name" startIndex={0} endIndex={6} travellerWidth={20} height={30} stroke="#8884d8" />
        )}
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis tickFormatter={yAxisTickFormatter} tickCount={6} ticks={Object.keys(LEVEL_NAMES)} />
        <Tooltip content={tooltipContent} />
        <Bar
          dataKey={dataKeys.firstKey}
          stackId={1}
          barSize={100}
          fill={`url(#${gradientIds.firstKey})`}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
        <Bar
          dataKey={dataKeys.secondKey}
          stackId={1}
          barSize={100}
          fill={`url(#${gradientIds.secondKey})`}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
        <Line
          dataKey={dataKeys.thirdKey}
          type="linear"
          stroke={`url(#${gradientIds.thirdKey})`}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={2600}
          animationEasing="ease"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CustomComposedBarData;
