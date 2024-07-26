import { COLORS } from '../constants/Dashboard_2/Pie';

import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

class DataService {
  fetchPieDepartmentData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['skill_type', 'count(distinct(name)):totalSkills', 'department', 'job_title', 'name'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { skill_type: string; totalSkills: number }[];

    return res;
  };

  fetchTextLetDepartmentData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['count(distinct(name)):totalCountOfSkills'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { totalCountOfSkills: number }[];

    return res;
  };

  fetchTextLetAllPositionsData = async (requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['job_title'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    )) as { job_title: string }[];
    return res;
  };

  fetchTextLetAllDepartmentsData = async (requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['department'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    )) as { department: string }[];
    return res;
  };

  fetchTextLetAllTypesOfSkillData = async (requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['skill_type'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    )) as { skill_type: string }[];
    return res;
  };
}

export const dataService = new DataService();
