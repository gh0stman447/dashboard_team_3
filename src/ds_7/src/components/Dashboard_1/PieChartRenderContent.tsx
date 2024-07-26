import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/Data.service';
import { transformFiltersFromDB1 } from '../../utils/transformFilters';
import { difference } from 'react-query/types/core/utils';

const PieChartRenderContent = () => {
  const customLabelList =
    (data: { name: string; value: number; color: string; difference: number | null }[]) =>
    ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <g>
          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            <tspan x={x} dy="-0.5em">
              {data[index].name}
            </tspan>
            <tspan x={x} dy="1.2em">
              ({data[index].value}) {data[index].difference > 0 && <tspan>+ ({data[index].difference})</tspan>}
            </tspan>
          </text>
          {data[index].difference > 0 && (
            <foreignObject x={x - 60} y={y} width={25} height={20}>
              <ArrowGreenUp />
            </foreignObject>
          )}
        </g>
      );
    };

  const filters = useDB1FiltersStore((state) => ({
    // typesOfSkill: state.typesOfSkill,
    date: state.date,
    empIdField: state.empIdField
  }));

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useQuery(['PieDataAllTimeDate', filters.date, filters.empIdField], () =>
    dataService.fetchPieData(transformedFilters, 'PieDataAllTimeDate')
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useQuery(
    ['pieDataBeforeSelectedDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'PieDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField
    }
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useQuery(
    ['pieDataPrevDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'PieDataPrevDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField
    }
  );

  if (isLoadingDataBeforeSelectedDate || isLoadingDataAllTimeDate || isLoadingDataPrevDate) {
    return <div>Loading...</div>;
  }
  if (isErrorDataAllTimeDate || isErrorDataBeforeSelectedDate || isErrorDataPrevDate) {
    return <div>Error</div>;
  }

  const calculateDifference = (
    arr1: {
      name: string;
      value: number;
      color: string;
    }[],
    arr2: {
      name: string;
      value: number;
      color: string;
    }[],
    noDateFilter: boolean
  ) => {
    if (noDateFilter) {
      return arr1?.map((el) => ({
        ...el,
        difference: null
      }));
    }

    const map2 = arr2?.reduce((acc, el) => {
      acc[el.name] = el.value;
      return acc;
    }, {});

    return arr1?.map((el) => {
      const diff = el.value - (map2[el.name] || 0);
      return {
        ...el,
        difference: diff
      };
    });
  };

  if (!filters.empIdField) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Выберите сотрудника</span>;
  }
  const dataWithIncrease = calculateDifference(
    filters.date ? dataBeforeSelectedDate : dataAllTimeDate,
    dataPrevDate,
    !filters.date
  );

  if (!dataWithIncrease || dataWithIncrease.length === 0) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Данных нет</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={'value'}
          data={dataWithIncrease}
          innerRadius={0}
          outerRadius={'95%'}
          label={customLabelList(dataWithIncrease)}
          labelLine={false}
        >
          {dataWithIncrease.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="text-xs bg-navy rounded-xl py-4 px-5 text-white text-[30px]">{`${payload[0].name}: ${payload[0].value}`}</div>
              );
            }
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
