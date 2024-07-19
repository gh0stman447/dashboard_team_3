import React from 'react';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full h-[200px] 2xl:w-1/2 md-lg:h-[602px] border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 text-center"
      ref={textLetRef}
    >
      <div className="relative h-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Представлено навыков: </p>
          <div className="flex gap-x-2 items-center justify-center">
            <ArrowGreenUp height="40" width="40" />
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">123 (+20)</span>
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
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Увеличено уровеней:</p>
          <div className="flex gap-x-2 items-center justify-center">
            <ArrowGreenUp height="40" width="40" />
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">+8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextLetBlock;
