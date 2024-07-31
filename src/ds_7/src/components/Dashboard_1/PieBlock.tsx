import React from 'react';
import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import PieChartRenderContent from './PieChartRenderContent';

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="order-2 4xl:order-none text-center w-full h-[500px] lg:h-[700px] lg:m-auto 4xl:w-full 4xl:h-full 4xl:col-span-1 4xl:row-span-2 rounded-xl bg-white border border-black shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50 hover:scale-105 duration-300"
      ref={pieChartRef}
    >
      <div className="w-full p-2">
        <p className="text-[18px] 2xl:text-[24px]">Количество и прирост навыков и их типов у сотрудника</p>
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
