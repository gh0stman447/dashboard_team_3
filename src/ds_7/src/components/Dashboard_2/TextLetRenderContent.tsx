import React from 'react';
import { ArrowGreenUp, Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import { useTextLetData } from '../hooks/Dashboard_2';

const TextLetRenderContent = ({
  textLetRef,
  downloadButtonRef
}: {
  downloadButtonRef: React.RefObject<HTMLDivElement>;
  textLetRef: React.RefObject<HTMLDivElement>;
}) => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision
  }));

  const {
    departmentSkillsDataAllTimeDate,
    departmentSkillsDataBeggingSelectedDate,
    departmentSkillsDataEndSelectedDate,
    departmentSkillsUpDataForThePeriodDate,

    isLoading,
    isError
  } = useTextLetData(filters);

  const availableText = isLoading ? 'Загрузка...' : isError ? 'Ошибка' : undefined;

  if (availableText) {
    return <NoChartComponent label={availableText} />;
  }

  const countOfSkillsLevelUp = filters.date ? departmentSkillsUpDataForThePeriodDate[0].totalCountOfSkills : null;

  const countOfSkillsUp = filters.date
    ? departmentSkillsDataEndSelectedDate[0].totalCountOfSkills -
      departmentSkillsDataBeggingSelectedDate[0].totalCountOfSkills
    : 0;

  const totalCountOfSkills = filters.date
    ? departmentSkillsDataEndSelectedDate[0].totalCountOfSkills
    : departmentSkillsDataAllTimeDate[0].totalCountOfSkills;

  return (
    <>
      <div className="relative h-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[18px] md-lg:text-[25px]">Представлено навыков: </p>
          <div className="flex gap-x-2 items-center justify-center">
            {filters.date && countOfSkillsUp > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px]">
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
          <p className="text-[18px] md-lg:text-[25px]">Увеличено уровней:</p>
          <div className="flex gap-x-2 items-center justify-center">
            {filters.date && countOfSkillsLevelUp > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px]">
              {filters.date ? (countOfSkillsLevelUp > 0 ? `+${countOfSkillsLevelUp}` : 0) : '(Не выбран период)'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextLetRenderContent;
