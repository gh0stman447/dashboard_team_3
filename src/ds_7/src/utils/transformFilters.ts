import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { DB1FiltersStore } from '../store/DB1FiltersStore';
import { DB2FiltersStore } from '../store/DB2FiltersStore';
import { allSkillTypes } from '../constants/Dashboard_2/AllSkillTypes';

export const transformFiltersFromDB1 = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters: Record<string, any> = {};

  if (filters.typesOfSkill && filters.typesOfSkill.length > 0) {
    transformedFilters.skill_type = ['=', ...filters.typesOfSkill];
  } else {
    transformedFilters.skill_type = ['=', ...allSkillTypes];
  }

  if (filters.date) {
    transformedFilters.date = [
      'and',
      ['>', filters.date[0].format('YYYY-MM-DD')],
      ['<=', filters.date[1].format('YYYY-MM-DD')]
    ];
    // console.log('filters.date', filters.date);
  }

  if (filters.empIdField) {
    transformedFilters.employees_id = ['=', filters.empIdField];
  }

  return transformedFilters;
};

export const transformFiltersFromDB2 = (filters: Partial<DB2FiltersStore>) => {
  const transformedFilters: Record<string, any> = {};

  if (filters.date) {
    transformedFilters.date = [
      'and',
      ['>=', filters.date[0].format('YYYY-MM-DD')],
      ['<=', filters.date[1].format('YYYY-MM-DD')]
    ];
  }

  if (filters.devision) {
    transformedFilters.department = ['=', ...filters.devision];
  }

  if (filters.position) {
    transformedFilters.job_title = ['=', ...filters.position];
  }
  if (filters.skills) {
    transformedFilters.name = ['=', ...filters.skills];
  }
  if (filters.typesOfSkill) {
    transformedFilters.skill_type = ['=', ...filters.typesOfSkill];
  }

  return transformedFilters;
};
