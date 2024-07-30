import React, { useState } from 'react';

import { downloadPng } from '../../utils';
import { Download } from '../../../../assets';
import ComposedChartRenderContent from './ComposedChartRenderContent';

import DisabledSelect from '../ui/Dashboard_1/DisabledSelect';

const ComposedChartBlock = () => {
  const composedBarRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="order-3 4xl:order-none flex flex-col items-center justify-between w-full 4xl:col-span-1 4xl:row-span-3 bg-white border border-black shadow-2xl rounded-xl divide-y-2 divide-gray/50"
      ref={composedBarRef}
    >
      <div className="w-full p-2">
        <div className="flex flex-col gap-y-2 items-center text-center p-3">
          <p className="text-[14px] 2xl:text-[24px]">
            Уровень знаний сотрудника в сравнении со средним уровнем в пределах должности
          </p>
          <DisabledSelect />
        </div>
      </div>
      <div className="w-full h-[400px] md:h-[700px] lg:w-full lg:h-[800px] flex flex-col items-center justify-center divide-y-2 divide-gray/50">
        <div className="relative w-full h-full xl:p-4">
          <ComposedChartRenderContent />
          <div className="absolute bottom-[10px] left-[10px]">
            <Download
              ref={downloadButtonRef}
              onClick={() => downloadPng(downloadButtonRef, composedBarRef)}
              className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposedChartBlock;
