import React from 'react';
import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import PieChartRenderContent from './PieChartRenderContent';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/Data.service';
import { transformFiltersFromDB1 } from '../../utils/transformFilters';
import { difference } from 'react-query/types/core/utils';

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

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
    dataService.fetchPieData({ ...transformedFilters, date: undefined }, 'PieDataAllTimeDate')
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

  const dataWithIncrease = calculateDifference(
    filters.date ? dataBeforeSelectedDate : dataAllTimeDate,
    dataPrevDate,
    !filters.date
  );

  return (
    <div
      className="order-2 4xl:order-none text-center w-full h-[500px] lg:h-[700px] lg:m-auto 4xl:w-full 4xl:h-full 4xl:col-span-1 4xl:row-span-2 rounded-xl bg-white border border-black shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50"
      ref={pieChartRef}
    >
      <div className="w-full p-2">
        <p className="text-[18px] 2xl:text-[24px]">Количество и прирост навыков и их типов у сотрудника</p>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <PieChartRenderContent data={dataWithIncrease} empIdField={filters.empIdField} />
        <div className="absolute top-[6px] left-[6px] md-lg:top-5 md-lg:left-5">
          <Download
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, pieChartRef)}
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PieBlock;
