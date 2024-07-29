import React from 'react';
import { downloadPng } from '../../utils';
import { Download } from '../../../../assets';

import BarFirstRenderContent from './BarFirstRenderContent';
import BarSecondRenderContent from './BarSecondRenderContent';

const BarSecondBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const barChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full 2xl:w-1/2 border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50">
      <p className="text-[18px] md-lg:text-[30px] p-4 text-center md-lg:h-[122px]">
        Кол-во сотрудникам по уровню навыка и его прирост
      </p>
      <div className="relative w-full h-[400px] 2xl:h-[800px]">
        <BarSecondRenderContent />
        <div className="absolute bottom-[10px] left-[10px]">
          <Download
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, barChartRef)}
          />
        </div>
      </div>
    </div>
  );
};

export default BarSecondBlock;
