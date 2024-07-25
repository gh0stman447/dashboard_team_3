import React from 'react';
import { downloadPng } from '../../utils';
import { Download } from '../../../../assets';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';

const TextLetRenderContent = ({
  date,
  dataGrowht,
  dataBeforeSelectedDate,
  dataBetweenDate,
  downloadButtonRef,
  textLetRef,
  skills
}) => {
  return (
    <div className="flex flex-col p-4 text-[20px] 4xl:text-[32px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center text-[25px] md-lg:text-[32px]">
          <p>Представлено навыков:</p>
          <span className="flex gap-x-2 items-center">
            {date && dataGrowht > 0 && <ArrowGreenUp />}
            <span>
              {date ? dataBeforeSelectedDate[0].totalSkills : dataBetweenDate[0].totalSkills}
              {date && dataGrowht > 0 && <span>(+{dataGrowht})</span>}
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
      {date && (
        <div className="text-[25px] md-lg:text-[32px] flex items-center gap-x-4">
          <p className=""> Увеличен уровень:</p>
          <span className="flex gap-x-2 items-center">
            <ArrowGreenUp />+{skills[0]?.totalSkills}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextLetRenderContent;
