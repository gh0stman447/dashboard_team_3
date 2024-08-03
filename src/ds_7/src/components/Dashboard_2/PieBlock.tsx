import React from 'react';

import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import PieChartRenderContent from './PieChartRenderContent';

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="border border-black w-full md-lg:w-1/2 rounded-xl bg-white shadow-2xl hover:scale-[1.01] duration-300"
      ref={pieChartRef}
    >
      <div className="text-center w-full h-[450px] md-lg:h-[400px] flex flex-col items-center justify-center divide-y-2 divide-gray/50">
        <p className="text-[18px] p-2">Количество и прирост навыков и их типов у сотрудников</p>
        <div className="relative w-full h-full flex items-center justify-center">
          <PieChartRenderContent />
          <div className="absolute top-[6px] left-[6px] md-lg:top-5 md-lg:left-5">
            <Download
              ref={downloadButtonRef}
              className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 2xl:w-[30px] 2xl:h-[30px]"
              onClick={() => downloadPng(downloadButtonRef, pieChartRef)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieBlock;
