import { KoobDataService } from 'bi-internal/services';
import { COLORS } from '../constants';
const { koobDataRequest3 } = KoobDataService;

class DataService {
  fetchPieData = async (filters: {}, requestString: string) => {
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

  fetchTextLetData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['count(distinct(name)):totalSkills'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { totalSkills: number }[];

    return res;
  };

  fetchTextLetDataSkills = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['count(distinct(name)):totalSkills', 'name', 'skill_type'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { totalSkills: number }[];

    return res;
  };

  fetchUserData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['employees_id', 'first_name', 'last_name', 'department', 'job_title', 'activity'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as {
      employees_id: number;
      first_name: string;
      last_name: string;
      department: string;
      job_title: string;
      activity: string;
    }[];
    return res;
  };

  fetchUsersIdData = async (requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['employees_id'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    )) as { employees_id: number }[];

    return res.map((el) => {
      return {
        value: el.employees_id,
        label: String(el.employees_id)
      };
    });
  };

  fetchTypeOfSkillsData = async (requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['skill_type'],
      [],
      {},
      { schema_name: 'ds_7' },
      requestString
    )) as { skill_type: string }[];

    return res;
  };

  fetchBarChartEmployeeData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['name', 'max(level_num)', 'job_title'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as {
      name: string;
      level_num: number;
      job_title: string;
    }[];
    return res;
  };

  fetchBarChartAllPeopleData = async (filters: {}, requestString: string) => {
    const res = (await koobDataRequest3(
      'etl_db_3.team_3',
      ['name', 'round(avg(level_num))'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { name: string; level_num: number }[];
    return res;
  };
}

export const dataService = new DataService();
