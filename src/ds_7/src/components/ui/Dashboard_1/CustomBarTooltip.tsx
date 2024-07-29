import React from 'react';
import { TooltipProps } from 'recharts';
import { LEVEL_NAMES } from '../../../constants/Dashboard_2/levelNames';

const CustomBarTooltip: React.FC<TooltipProps<any, any>> = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload;

  const empLvl = data.empLvl;
  const improvement = data.improvement;
  const totalLevel = empLvl + improvement;
  const middleLvl = data.middleLvl;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="text-lg font-semibold mb-2">{label}</div>
      <div className="mb-1">
        <strong className="text-gray-600">Уровень сотрудника:</strong> {LEVEL_NAMES[empLvl]}
      </div>
      <div className="mb-1">
        <strong className="text-gray-600">Увеличение уровня сотрудника:</strong> +{improvement}
      </div>
      <div className="mb-1">
        <strong className="text-gray-600">Уровень сотрудника после увеличения уровня навыка:</strong>{' '}
        {LEVEL_NAMES[totalLevel]}
      </div>
      <div>
        <strong className="text-gray-600">Средний уровень по департаменту:</strong> {LEVEL_NAMES[middleLvl]}
      </div>
    </div>
  );
};

export default CustomBarTooltip;
