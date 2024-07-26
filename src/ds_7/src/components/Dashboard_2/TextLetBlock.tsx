import React from 'react';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import { Download } from '../../../../assets';
import { downloadPng, transformFiltersFromDB2 } from '../../utils';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision
  }));

  const transformedFilters = transformFiltersFromDB2(filters);

  console.log(filters);
  const queryFilters =
    filters.position.length === 0 && filters.devision.length === 0
      ? { ...transformedFilters }
      : filters.position.length === 0 && filters.devision.length > 0
      ? { ...transformedFilters, is_depart_key_skill: ['=', true] }
      : filters.devision.length === 0 && filters.position.length > 0
      ? { ...transformedFilters, is_job_key_skill: ['=', true] }
      : { ...transformedFilters, is_job_key_skill: ['=', true], is_depart_key_skill: ['=', true] };

  const {
    data: departmentSkillsDataAllTimeDate,
    isLoading: isLoadingSkillsDataAllTimeDate,
    isError: isErrorSkillsDataAllTimeDate
  } = useQuery(['departmentSkillsDataAllTimeDate', filters], () =>
    dataService.fetchTextLetDepartmentData({ ...queryFilters, date: undefined }, 'departmentSkillsDataAllTimeDate')
  );

  const {
    data: departmentSkillsDataBeggingSelectedDate,
    isLoading: isLoadingSkillsDataBeggingSelectedDate,
    isError: isErrorSkillsDataBeggingSelectedDate
  } = useQuery(
    ['departmentSkillsDataBeggingSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentSkillsDataBeggingSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  const {
    data: departmentSkillsDataEndSelectedDate,
    isLoading: isLoadingSkillsDataEndSelectedDate,
    isError: isErrorSkillsDataEndSelectedDate
  } = useQuery(
    ['departmentSkillsDataEndSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentSkillsDataEndSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  if (isLoadingSkillsDataAllTimeDate || isLoadingSkillsDataBeggingSelectedDate || isLoadingSkillsDataEndSelectedDate)
    return <div>Loading...</div>;

  if (isErrorSkillsDataAllTimeDate || isErrorSkillsDataBeggingSelectedDate || isErrorSkillsDataEndSelectedDate)
    return <div>Error</div>;

  let skillsGrowth = 0;

  if (filters.date) {
    skillsGrowth =
      departmentSkillsDataEndSelectedDate[0].totalCountOfSkills -
      departmentSkillsDataBeggingSelectedDate[0].totalCountOfSkills;
  }

  return (
    <div
      className="w-full h-[200px] 2xl:w-1/2 md-lg:h-[602px] border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 text-center"
      ref={textLetRef}
    >
      <div className="relative h-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Представлено навыков: </p>
          <div className="flex gap-x-2 items-center justify-center">
            {filters.date && skillsGrowth > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">
              {departmentSkillsDataAllTimeDate[0].totalCountOfSkills}{' '}
              {filters.date && skillsGrowth > 0 && <span>(+{skillsGrowth})</span>}
            </span>
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
          <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Увеличено уровней:</p>
          {/* <div className="flex gap-x-2 items-center justify-center">
            {filters.date && skillsUp > 0 && <ArrowGreenUp height="40" width="40" />}
            <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">
              {filters.date && skillsUp > 0 ? `+${skillsUp}` : 0}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TextLetBlock;

// Вот тут дичь)

// import React from 'react';
// import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
// import { Download } from '../../../../assets';
// import { downloadPng, transformFiltersFromDB2 } from '../../utils';
// import useDB2FiltersStore from '../../store/DB2FiltersStore';
// import { useQuery } from 'react-query';
// import { dataService } from '../../services/DataDboard2.service';

// const TextLetBlock = () => {
//   const textLetRef = React.useRef<HTMLDivElement | null>(null);
//   const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

//   const filters = useDB2FiltersStore((state) => ({
//     date: state.date,
//     position: state.position,
//     devision: state.devision
//   }));

//   const transformedFilters = transformFiltersFromDB2(filters);

//   console.log(filters);
//   const queryFilters =
//     filters.position.length === 0 && filters.devision.length === 0
//       ? { ...transformedFilters }
//       : filters.position.length === 0 && filters.devision.length > 0
//       ? { ...transformedFilters, is_depart_key_skill: ['=', true] }
//       : filters.devision.length === 0 && filters.position.length > 0
//       ? { ...transformedFilters, is_job_key_skill: ['=', true] }
//       : { ...transformedFilters, is_job_key_skill: ['=', true], is_depart_key_skill: ['=', true] };

//   const {
//     data: departmentSkillsDataAllTimeDate,
//     isLoading: isLoadingSkillsDataAllTimeDate,
//     isError: isErrorSkillsDataAllTimeDate
//   } = useQuery(['departmentSkillsDataAllTimeDate', filters], () =>
//     dataService.fetchTextLetDepartmentData({ ...queryFilters, date: undefined }, 'departmentSkillsDataAllTimeDate')
//   );

//   const {
//     data: departmentSkillsDataForThePeriodDate,
//     isLoading: isLoadingSkillsDataForThePeriodDate,
//     isError: isErrorSkillsDataForThePeriodDate
//   } = useQuery(
//     ['departmentSkillsDataForThePeriodDate', filters],
//     () => dataService.fetchTextLetDepartmentData(queryFilters, 'departmentSkillsDataForThePeriodDate'),
//     {
//       enabled: !!filters.date
//     }
//   );

//   console.log(queryFilters, 'queryFilters');

//   if (isLoadingSkillsDataAllTimeDate || isLoadingSkillsDataForThePeriodDate) return <div>Loading...</div>;

//   if (isErrorSkillsDataAllTimeDate || isErrorSkillsDataForThePeriodDate) return <div>Error</div>;

//   const skillsGrowth = filters.date && departmentSkillsDataForThePeriodDate[0].totalCountOfSkills;

//   return (
//     <div
//       className="w-full h-[200px] 2xl:w-1/2 md-lg:h-[602px] border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 text-center"
//       ref={textLetRef}
//     >
//       <div className="relative h-1/2 flex justify-center items-center">
//         <div className="flex flex-col">
//           <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Представлено навыков: </p>
//           <div className="flex gap-x-2 items-center justify-center">
//             {filters.date && skillsGrowth > 0 && <ArrowGreenUp height="40" width="40" />}
//             <span className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">
//               {departmentSkillsDataAllTimeDate[0].totalCountOfSkills}{' '}
//               {filters.date && skillsGrowth > 0 && <span>(+{skillsGrowth})</span>}
//             </span>
//           </div>
//         </div>
//         <div className="absolute top-[6px] right-[6px] md-lg:top-5 md-lg:right-5">
//           <Download
//             ref={downloadButtonRef}
//             className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 2xl:w-[30px] 2xl:h-[30px]"
//             onClick={() => downloadPng(downloadButtonRef, textLetRef)}
//           />
//         </div>
//       </div>
//       <div className="h-1/2 flex justify-center items-center">
//         <div className="flex flex-col">
//           <p className="text-[18px] md-lg:text-[25px] 2xl:text-[40px]">Увеличено уровней:</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextLetBlock;
