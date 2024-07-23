import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { DB1FiltersStore } from '../store/DB1FiltersStore';
import { DB2FiltersStore } from '../store/DB2FiltersStore';

export const transformFiltersFromDB1 = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters: Record<string, any> = {};

  if (filters.typeOfSkill) {
    transformedFilters.skill_type = ['=', filters.typeOfSkill];
  }

  if (filters.date) {
    transformedFilters.date = [
      'and',
      ['>=', filters.date[0].format('YYYY-MM-DD')],
      ['<=', filters.date[1].format('YYYY-MM-DD')]
    ];
  }

  if (filters.empIdField) {
    transformedFilters.employees_id = ['=', filters.empIdField];
  }

  return transformedFilters;
};

// export const transformFiltersFromDB2 = (filters: DB2FiltersStore) => {
//   const transformedFilters: Record<string, any> = {};

//   if (filters.date && filters.date[0] && filters.date[1]) {
//     transformedFilters.date = [
//       'and',
//       ['>=', filters.date[0].format('YYYY-MM-DD')],
//       ['<=', filters.date[1].format('YYYY-MM-DD')]
//     ];
//   }

//   if (filters.devision) {
//   }

//   if (filters.position) {
//     transformedFilters.employees_id = ['=', filters.empIdField];
//   }
//   if (filters.skills) {
//     transformedFilters.employees_id = ['=', filters.empIdField];
//   }
//   if (filters.typesOfSkill) {
//     transformedFilters.employees_id = ['=', filters.empIdField];
//   }

//   return transformedFilters;
// };
