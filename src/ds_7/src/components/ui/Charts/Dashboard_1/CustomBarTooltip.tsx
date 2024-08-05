import React from 'react';
import { TooltipProps } from 'recharts';
import { LEVEL_NAMES } from '../../../../constants';

const CustomBarTooltip: React.FC<TooltipProps<any, any>> = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload;

  const empLvl = data.empLvl;
  const improvement = data.improvement;
  const totalLevel = empLvl + improvement;
  const middleLvl = data.middleLvl;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md text-[14px] divide-y-2 divide-gray/80 text-gray-600">
      <div className="text-[16px] font-semibold mb-2">{label}</div>
      <div>
        <div className="mb-1">
          <strong>Уровень сотрудника на начало периода:</strong> {LEVEL_NAMES[empLvl]}
        </div>
        <div className="mb-1">
          <strong>Увеличение уровня сотрудника:</strong> +{improvement}
        </div>
        <div className="mb-1">
          <strong>Уровень сотрудника после на конец периода:</strong> {LEVEL_NAMES[totalLevel]}
        </div>
        <div>
          <strong>Средний уровень по департаменту:</strong> {LEVEL_NAMES[middleLvl]}
        </div>
      </div>
    </div>
  );
};

export default CustomBarTooltip;
