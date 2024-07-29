import React from 'react';
import { TooltipProps } from 'recharts';
import { LEVEL_NAMES } from '../../../constants/Dashboard_2/levelNames';

const CustomSecondBarTooltip: React.FC<TooltipProps<any, any>> = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload as {
    growth: number;
    countOfEmployees: number;
    wasNegative: boolean;
    level_num: number;
  };

  const skillLevel = data.level_num;
  const countOfEmployees = data.countOfEmployees;
  const growth = data.growth;
  const wasNegative = data.wasNegative;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg divide-y-2 divide-gray/80">
      <div className="text-xl font-medium mb-2">
        Уровень навыка: <span className="font-semibold">{LEVEL_NAMES[skillLevel]}</span>
      </div>
      <div className="text-lg">
        <div>
          <strong>Количество сотрудников на начало периода:</strong> {countOfEmployees}
        </div>
        {growth !== undefined && (
          <div>
            {wasNegative ? (
              <>
                <strong>Количество сотрудников уменьшено на:</strong> {growth}
                <div>
                  <strong>Количество сотрудников на конец периода:</strong> {countOfEmployees}
                </div>
              </>
            ) : (
              <>
                <strong>Количество сотрудников увеличено на:</strong> {growth}
                <div>
                  <strong>Количество сотрудников на конец периода:</strong> {countOfEmployees + growth}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSecondBarTooltip;
