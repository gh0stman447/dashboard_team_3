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
}

export const dataService = new DataService();
