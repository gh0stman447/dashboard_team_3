import React from 'react';
import { downloadPng, recalculateImprovement } from '../../utils';
import { ArrowGreenUp, ArrowUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="rounded-xl bg-white shadow-2xl 4xl:col-span-1 4xl:row-span-1" ref={textLetRef}>
      <div className="flex flex-col p-4 text-[20px] 4xl:text-[32px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center text-[25px] md-lg:text-[32px]">
            <p>Представлено навыков:</p>
            <span className="flex gap-x-2 items-center">
              <ArrowGreenUp />
              <span>93 (+11)</span>
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
        <div className="text-[25px] md-lg:text-[32px] flex items-center gap-x-4">
          <p className=""> Увеличен уровень:</p>
          <span className="flex gap-x-2 items-center">
            <ArrowGreenUp />
            +15
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextLetBlock;
