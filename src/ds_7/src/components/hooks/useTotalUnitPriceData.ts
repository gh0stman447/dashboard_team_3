// import { useQuery } from 'react-query';
// import { dataService } from '../../services/Data.service';

// const useTotalUnitPriceData = (filters: {}, year: number) => {
//   const {
//     data: totalUnitpriceCur,
//     isLoading: isLoadingTotalCur,
//     isError: errorTotalCur
//   } = useQuery(
//     ['totalUnitpricePie1Cur', filters],
//     () =>
//       dataService.fetchTotalUnitpricePieData(
//         { ...filters, order_date: ['and', ['>', `${year}-01-01`], ['<', `${year + 1}-01-01`]] },
//         'totalUnitpricePie1Cur'
//       ),
//     { enabled: !!year }
//   );

//   const {
//     data: totalUnitpricePrev,
//     isLoading: isLoadingTotalPrev,
//     isError: errorTotalPrev
//   } = useQuery(
//     ['totalUnitpricePie1Prev', filters],
//     () =>
//       dataService.fetchTotalUnitpricePieData(
//         { ...filters, order_date: ['and', ['>', `${year - 1}-01-01`], ['<', `${year}-01-01`]] },
//         'totalUnitpricePie1Prev'
//       ),
//     { enabled: !!year }
//   );

//   return {
//     totalUnitpriceCur,
//     isLoadingTotalCur,
//     errorTotalCur,
//     totalUnitpricePrev,
//     isLoadingTotalPrev,
//     errorTotalPrev
//   };
// };

// export default useTotalUnitPriceData;
