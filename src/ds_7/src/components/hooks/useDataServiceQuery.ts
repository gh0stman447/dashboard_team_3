// import { useQuery } from 'react-query';
// import { dataService } from '../../services/Data.service';

// export type FunctionsOnly<T> = {
//   [K in keyof T]: T[K] extends Function ? K : never;
// }[keyof T];

// const useDataServiceQuery = <T extends FunctionsOnly<typeof dataService>>(
//   queryKey: string[],
//   serviceMethod: T,
//   filters: any,
//   year: number,
//   requestString: string,
//   enabled: boolean = true
// ) => {
//   return useQuery(
//     queryKey,
//     () =>
//       dataService[serviceMethod](
//         {
//           ...filters,
//           order_date: ['and', ['>', `${year}-01-01`], ['<', `${year + 1}-01-01`]]
//         },
//         requestString
//       ),
//     { enabled }
//   );
// };

// export default useDataServiceQuery;
