import React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS, SKILLS } from '../../constants/Dashboard_2';
import { Download } from '../../../../assets';
import { downloadPng, transformFiltersFromDB2 } from '../../utils';
import { useQuery } from 'react-query';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { dataService } from '../../services/DataDboard2.service';

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devison: state.devision
  }));

  const transformedFilters = transformFiltersFromDB2(filters);

  const {
    data: departmentDataAllTimeDate,
    isLoading: isLoadingDepartmentAllTimeData,
    isError: isErrorDepartmentAllTimeData
  } = useQuery(
    ['departmentAllTimeData', filters],
    () => dataService.fetchPieDepartmentData({ ...transformedFilters, date: undefined }, 'departmentAllTimeData'),
    {
      enabled: !!filters?.position
    }
  );

  return (
    <div className="border border-black w-full 2xl:w-1/2 rounded-xl bg-white shadow-2xl" ref={pieChartRef}>
      <div className="text-center w-full h-[400px] md-lg:h-[600px] flex flex-col items-center justify-center divide-y-2 divide-gray/50">
        <p className="text-[18px] md-lg:text-[30px] p-4">Количество и прирост навыков и их типов у сотрудника</p>
        <div className="relative w-full h-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey={'value'} data={SKILLS} innerRadius={0} outerRadius={'95%'}>
                {SKILLS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
