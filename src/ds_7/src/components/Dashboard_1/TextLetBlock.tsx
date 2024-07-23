import React from 'react';
import { downloadPng, transformFiltersFromDB1 } from '../../utils';
import { ArrowGreenUp, ArrowUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';
import { useQuery } from 'react-query';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { dataService } from '../../services/Data.service';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField
  }));

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useQuery(
    ['textLetDataBeforeSelectedDate', filters],
    () =>
      dataService.fetchTextLetData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'TextLetDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );
  const {
    data: dataBetweenDate,
    isLoading: isLoadingDataBetweenDate,
    isError: isErrorDataBetweenDate
  } = useQuery(['textLetDataBetweenDate', filters], () =>
    dataService.fetchTextLetData(transformedFilters, 'TextLetDataBetweenDate')
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useQuery(
    ['textLetDataPrevDate', filters],
    () =>
      dataService.fetchTextLetData(
        {
          ...transformedFilters,
          date: ['<=', filters.date[0].format('YYYY-MM-DD')]
        },
        'TextLetDataPrevDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  const {
    data: skills,
    isLoading: isLoadingSkills,
    isError: isErrorSkills
  } = useQuery(['textLetDataSkills', filters], () =>
    dataService.fetchTextLetDataSkills(transformedFilters, 'TextLetDataSKills')
  );

  if (isLoadingDataBeforeSelectedDate || isLoadingDataBetweenDate || isLoadingDataPrevDate) {
    return <div>Loading...</div>;
  }

  if (isErrorDataBeforeSelectedDate || isErrorDataBetweenDate || isErrorDataPrevDate) {
    return <div>Error</div>;
  }

  let dataGrowht = 0;

  if (filters.date) {
    dataGrowht = dataBeforeSelectedDate[0].totalSkills - dataPrevDate[0].totalSkills;
  }
  return (
    <div className="rounded-xl bg-white border border-black shadow-2xl 4xl:col-span-1 4xl:row-span-1" ref={textLetRef}>
      <div className="flex flex-col p-4 text-[20px] 4xl:text-[32px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center text-[25px] md-lg:text-[32px]">
            <p>Представлено навыков:</p>
            <span className="flex gap-x-2 items-center">
              {filters.date && <ArrowGreenUp />}
              <span>
                {filters.date ? dataBeforeSelectedDate[0].totalSkills : dataBetweenDate[0].totalSkills}
                {filters.date && <span>(+{dataGrowht})</span>}
              </span>
            </span>
          </div>
          <div className="self-start">
            <Download
              ref={downloadButtonRef}
              onClick={() => downloadPng(downloadButtonRef, textLetRef)}
              className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[35px] 4xl:h-[30px]"
            />
          </div>
        </div>
        {filters.date && (
          <div className="text-[25px] md-lg:text-[32px] flex items-center gap-x-4">
            <p className=""> Увеличен уровень:</p>
            <span className="flex gap-x-2 items-center">
              <ArrowGreenUp />
              +15
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextLetBlock;
