import React from 'react';
import { downloadPng } from '../../utils';
import { Download } from '../../../../assets';
import BarSecondRenderContent from './BarSecondRenderContent';

const BarSecondBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const barChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full md-lg:w-1/2 border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 hover:scale-[1.01] duration-300">
      <p className="text-[18px] p-2 text-center">Кол-во сотрудникам по уровню навыка и его прирост</p>
      <div className="relative w-full h-[345px]">
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
