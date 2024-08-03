import React from 'react';
import { downloadPng, transformFiltersFromDB1 } from '../../utils';
import { ArrowGreenUp, ArrowUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';

import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useTextLetData } from '../hooks/Dashboard_1';

const TextLetRenderContent = ({
  downloadButtonRef,
  textLetRef
}: {
  downloadButtonRef: React.RefObject<HTMLDivElement>;
  textLetRef: React.RefObject<HTMLDivElement>;
}) => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField
  }));

  const {
    dataAllTimeDate,
    dataBeforeSelectedDate,
    dataPrevDate,
    isErrorDataAllTimeDate,
    isErrorDataBeforeSelectedDate,
    isErrorDataPrevDate,
    isLoadingDataAllTimeDate,
    isLoadingDataBeforeSelectedDate,
    isLoadingDataPrevDate,
    isLoadingSkills,
    isErrorSkills,
    skills
  } = useTextLetData(filters);

  if (isLoadingDataBeforeSelectedDate || isLoadingDataAllTimeDate || isLoadingDataPrevDate || isLoadingSkills) {
    return <div className="flex justify-center items-center h-full p-4">Загрузка...</div>;
  }

  if (isErrorDataBeforeSelectedDate || isErrorDataAllTimeDate || isErrorDataPrevDate || isErrorSkills) {
    return <div className="flex justify-center items-center h-full p-4">Ошибка</div>;
  }

  let skillsGrowht = null;

  if (filters.date && filters.empIdField) {
    skillsGrowht = dataBeforeSelectedDate[0].totalSkills - dataPrevDate[0].totalSkills;
  }

  const countOfSkills = !filters.date ? dataAllTimeDate?.[0].totalSkills : dataBeforeSelectedDate?.[0].totalSkills;
  const totalSkillsUp = skills?.[0]?.totalSkills || 0;

  return filters.empIdField ? (
    <div className="flex flex-col p-4 text-[20px] 4xl:text-[32px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center text-[25px]">
          <p>Представлено навыков:</p>
          <span className="flex gap-x-2 items-center">
            {skillsGrowht > 0 && <ArrowGreenUp />}
            <span>
              {countOfSkills} {skillsGrowht > 0 && <span>(+{skillsGrowht})</span>}
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
      {filters.date && totalSkillsUp > 0 && (
        <div className="text-[25px] md-lg:text-[32px] flex items-center gap-x-4">
          <p className="">Увеличен уровень:</p>
          <span className="flex gap-x-2 items-center">
            <ArrowGreenUp /> +{totalSkillsUp}
          </span>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full py-4">Выберите сотрудника</div>
  );
};

export default TextLetRenderContent;
