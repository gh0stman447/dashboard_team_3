import { KoobDataService } from 'bi-internal/services';
import { COLORS } from '../constants';
const { koobDataRequest3 } = KoobDataService;

class DataService {
  fetchPieDepartmentData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
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
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['count(distinct(name)):totalCountOfSkills'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    );

    return res;
  };

  fetchTextLetCountOfAdvancedSkillsDepartmentData = async (filters: {}, requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['count(name):totalCountOfSkills'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    );

    return res;
  };

  fetchTextLetAllPositionsData = async (requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['job_title'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    );
    return res;
  };

  fetchTextLetAllDepartmentsData = async (requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['department'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    );
    return res;
  };

  fetchTextLetAllTypesOfSkillData = async (requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['skill_type'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    );
    return res;
  };

  fetchBarDataCountOfEmployeesBySkills = async (filters: {}, requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['name', 'count(distinct(employees_id)):countOfEmployees'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+name'] },
      requestString
    );
    return res;
  };

  fetchSkillsData = async (filters: {}, requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['name as skill'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+skill'] },
      requestString
    );
    return res;
  };

  fetchBarDataCountOfEmployeesBySkillLevel = async (filters: {}, requestString: string) => {
    const res = await koobDataRequest3(
      'etl_db_3.team_3',
      ['level_num', 'count(employees_id):countOfEmployees', 'employees_id', 'name'],
      [],
      filters,
      { schema_name: 'ds_7', sort: ['+level_num'] },
      requestString
    );
    return res;
  };
}

export const dataService = new DataService();
