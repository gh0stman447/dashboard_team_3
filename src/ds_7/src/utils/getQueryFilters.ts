import { DB2FiltersStore } from '../store/DB2FiltersStore';
import { transformFiltersFromDB2 } from './transformFilters';

export const getQueryFiltersForBarChart = (filters: Partial<DB2FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB2(filters);

  const hasPosition = filters.position.length > 0;
  const hasDevision = filters.devision.length > 0;
  const hasTypesOfSkill = filters.typesOfSkill.length > 0;

  // Ебейшая логика

  if (hasPosition && hasDevision && hasTypesOfSkill) {
    return { ...transformedFilters, is_job_key_skill_type_skill: ['=', true] };
  }

  if (hasPosition && hasDevision) {
    return { ...transformedFilters, is_job_key_skill: ['=', true] };
  }

  if (hasPosition && hasTypesOfSkill) {
    return { ...transformedFilters, is_job_key_skill_type_skill: ['=', true] };
  }

  if (hasDevision && hasTypesOfSkill) {
    return { ...transformedFilters, is_depart_key_skill: ['=', true] };
  }

  if (hasPosition) {
    return { ...transformedFilters, is_job_key_skill: ['=', true] };
  }

  if (hasDevision) {
    return { ...transformedFilters, is_depart_key_skill: ['=', true] };
  }

  return { ...transformedFilters };
};
