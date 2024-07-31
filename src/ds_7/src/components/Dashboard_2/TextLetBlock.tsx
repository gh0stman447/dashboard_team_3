import React from 'react';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';
import { downloadPng, transformFiltersFromDB2 } from '../../utils';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision
  }));

  const transformedFilters = transformFiltersFromDB2(filters);

  const {
    data: departmentSkillsDataAllTimeDate,
    isLoading: isLoadingSkillsDataAllTimeDate,
    isError: isErrorSkillsDataAllTimeDate
  } = useQuery(
    ['departmentSkillsDataAllTimeDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: undefined },
        'departmentSkillsDataAllTimeDate'
      ),
    {
      enabled: !filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsDataBeggingSelectedDate,
    isLoading: isLoadingSkillsDataBeggingSelectedDate,
    isError: isErrorSkillsDataBeggingSelectedDate
  } = useQuery(
    ['departmentSkillsDataBeggingSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentSkillsDataBeggingSelectedDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsDataEndSelectedDate,
    isLoading: isLoadingSkillsDataEndSelectedDate,
    isError: isErrorSkillsDataEndSelectedDate
  } = useQuery(
    ['departmentSkillsDataEndSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentSkillsDataEndSelectedDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsUpDataForThePeriodDate,
    isLoading: isLoadingdepartmentSkillsUpDataForThePeriodDateLoading,
    isError: isErrorDepartmentSkillsUpDataForThePeriodDate
  } = useQuery(
    ['departmentSkillsUpDataForThePeriodDate', filters],
    () =>
      dataService.fetchTextLetCountOfAdvancedSkillsDepartmentData(
        { ...transformedFilters, skill_status: ['=', 'up'] },
        'departmentSkillsUpDataForThePeriodDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  if (
    isLoadingSkillsDataAllTimeDate ||
    isLoadingSkillsDataBeggingSelectedDate ||
    isLoadingSkillsDataEndSelectedDate ||
    isLoadingdepartmentSkillsUpDataForThePeriodDateLoading
  )
    return <div>Loading...</div>;

  if (
    isErrorSkillsDataAllTimeDate ||
    isErrorSkillsDataBeggingSelectedDate ||
    isErrorSkillsDataEndSelectedDate ||
    isErrorDepartmentSkillsUpDataForThePeriodDate
  )
    return <div>Error</div>;

  const countOfSkillsLevelUp = filters.date ? departmentSkillsUpDataForThePeriodDate[0].totalCountOfSkills : null;

  const countOfSkillsUp = filters.date
    ? departmentSkillsDataEndSelectedDate[0].totalCountOfSkills -
      departmentSkillsDataBeggingSelectedDate[0].totalCountOfSkills
    : 0;

  const totalCountOfSkills = filters.date
    ? departmentSkillsDataEndSelectedDate[0].totalCountOfSkills
    : departmentSkillsDataAllTimeDate[0].totalCountOfSkills;

  return (
    <div
      className="w-full h-[200px] 2xl:w-1/3 md-lg:h-[702px] border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 text-center hover:scale-105 duration-300"
      ref={textLetRef}
    >
      <div className="relative h-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Представлено навыков: </p>
          <div className="flex gap-x-2 items-center justify-center">
            {filters.date && countOfSkillsUp > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">
              {totalCountOfSkills} {filters.date && countOfSkillsUp > 0 && <span>(+{countOfSkillsUp})</span>}
            </span>
          </div>
        </div>
        <div className="absolute top-[6px] right-[6px] md-lg:top-5 md-lg:right-5">
          <Download
            ref={downloadButtonRef}
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 2xl:w-[30px] 2xl:h-[30px]"
            onClick={() => downloadPng(downloadButtonRef, textLetRef)}
          />
        </div>
      </div>
      <div className="h-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Увеличено уровней:</p>
          <div className="flex gap-x-2 items-center justify-center">
            {filters.date && countOfSkillsLevelUp > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">
              {filters.date ? (countOfSkillsLevelUp > 0 ? `+${countOfSkillsLevelUp}` : 0) : '(не выбран период)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextLetBlock;
