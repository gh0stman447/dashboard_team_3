import React from 'react';
import { TooltipProps } from 'recharts';

const CustomFirstBarTooltip: React.FC<TooltipProps<any, any>> = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload as {
    growth: number;
    countOfEmployees: number;
    wasNegative: boolean;
    name: string;
  };

  const skillName = data.name;
  const countOfEmployees = data.countOfEmployees;
  const growth = data.growth;
  const wasNegative = data.wasNegative;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg divide-y-2 divide-gray/80">
      <div className="text-xl font-medium mb-2 text-gray-800">
        Навык: <span className="font-semibold">{skillName}</span>
      </div>
      <div className="text-lg text-gray-600">
        <div>
          <strong>Количество сотрудников на начало периода:</strong> {countOfEmployees}
        </div>
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
      </div>
    </div>
  );
};

export default CustomFirstBarTooltip;
