// import { useQuery } from 'react-query';
// import { dataService } from '../../services/Data.service';

// const useTotalTotalPriceData = (filters: {}, year: number) => {
//   const {
//     data: totalTotalCur,
//     isLoading: isLoadingTotalTotalCur,
//     isError: errorTotalTotalCur
//   } = useQuery(
//     ['totalTotalPricePie2Cur', filters],
//     () =>
//       dataService.fetchTotalTotalPricePieData(
//         { ...filters, order_date: ['and', ['>', `${year}-01-01`], ['<', `${year + 1}-01-01`]] },
//         'totalTotalPricePie2Cur'
//       ),
//     { enabled: !!year }
//   );

//   const {
//     data: totalTotalPrev,
//     isLoading: isLoadingTotalTotalPrev,
//     isError: errorTotalTotalPrev
//   } = useQuery(
//     ['totalTotalPricePie2Prev', filters],
//     () =>
//       dataService.fetchTotalTotalPricePieData(
//         { ...filters, order_date: ['and', ['>', `${year - 1}-01-01`], ['<', `${year}-01-01`]] },
//         'totalTotalPricePie2Prev'
//       ),
//     { enabled: !!year }
//   );

//   return {
//     totalTotalCur,
//     isLoadingTotalTotalCur,
//     errorTotalTotalCur,
//     totalTotalPrev,
//     isLoadingTotalTotalPrev,
//     errorTotalTotalPrev
//   };
// };

// export default useTotalTotalPriceData;
