import { COLORS } from '../constants/Dashboard_2/Pie';

import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

class DataService {
  // fetchPieData = async (filters: {}, requestString: string) => {
  //   const res = await koobDataRequest3(
  //     'course_2024.student3',
  //     ['categoryname'],
  //     ['sum(order_unitprice)'],
  //     { ...filters },
  //     { schema_name: 'ds_7' },
  //     requestString
  //   );
  //   return res.map((el, i) => ({
  //     name: el.categoryname,
  //     value: el.order_unitprice,
  //     color: COLORS[i]
  //   }));
  // };

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
      ['skill_status', 'count(distinct(name)):totalSkills'],
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
      ['employees_id', 'first_name', 'last_name', 'department', 'job_title'],
      [],
      filters,
      { schema_name: 'ds_7' },
      requestString
    )) as { employees_id: number; first_name: string; last_name: string; department: string; job_title: string }[];
    return res;
  };
}
export const dataService = new DataService();
