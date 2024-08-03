import React from 'react';
import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import PieChartRenderContent from './PieChartRenderContent';

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="order-last md-lgl:order-none text-center w-full h-[500px] md-lg:h-full md-lg:max-h-[680px] flex-grow rounded-xl bg-white border border-black shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50 hover:scale-[1.01] duration-300"
      ref={pieChartRef}
    >
      <div className="w-full p-2 md-lg:p-5">
        <p className="text-[16px] md-lg:text-[18px]">Количество и прирост навыков и их типов у сотрудника</p>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <PieChartRenderContent />
        <div className="absolute top-[6px] left-[6px] md-lg:top-5 md-lg:left-5">
          <Download
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, pieChartRef)}
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PieBlock;
