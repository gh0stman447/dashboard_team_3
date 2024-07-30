import { KoobDataService } from 'bi-internal/services';
import { COLORS } from '../constants/Dashboard_2';
const { koobDataRequest3 } = KoobDataService;

class DataService {
  fetchPieDepartmentData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['skill_type', 'count(distinct(name)):totalSkills'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { skill_type: string; totalSkills: number }[];

    return res.map((el, index) => ({
      name: el.skill_type,
      value: el.totalSkills,
      color: COLORS[index]
    }));
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

  fetchTextLetCountOfAdvancedSkillsDepartmentData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['count(name):totalCountOfSkills'],
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

  fetchBarDataCountOfEmployeesBySkills = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['name', 'count(distinct(employees_id)):countOfEmployees'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+name'] },
      requestString
    )) as { name: string; countOfEmployees: number }[];
    return res;
  };

  fetchSkillsData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['name as skill'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+skill'] },
      requestString
    )) as { skill: string }[];
    return res;
  };

  fetchBarDataCountOfEmployeesBySkillLevel = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'db__3.team_3_2',
      ['level_num', 'count(distinct(employees_id)):countOfEmployees'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+level_num'] },
      requestString
    )) as { level_num: number; countOfEmployees: number }[];
    return res;
  };
}

export const dataService = new DataService();
