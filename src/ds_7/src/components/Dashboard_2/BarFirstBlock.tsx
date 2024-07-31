import React from 'react';
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart, Brush } from 'recharts';
import { downloadPng, recalculateImprovement, transformFiltersFromDB2 } from '../../utils';
import { BAR_DATA } from '../../constants/Dashboard_2';
import { Download } from '../../../../assets';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';
import BarFirstRenderContent from './BarFirstRenderContent';

const BarFirstBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const barChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full 2xl:w-1/2 border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 hover:scale-105 duration-300"
      ref={barChartRef}
    >
      <p className="flex justify-center items-center p-4 text-[18px] md-lg:text-[30px] md-lg:h-[122px]">
        Кол-во сотрудников по навыкам и его прирост
      </p>
      <div className="relative w-full h-[400px] 2xl:h-[800px]">
        <BarFirstRenderContent />
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

export default BarFirstBlock;
