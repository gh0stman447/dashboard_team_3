// import { useQuery } from 'react-query';
// import { dataService } from '../../services/Data.service';

// const usePieData = (filters: {}, year: number) => {
//   const {
//     data: dataPie1,
//     isLoading: isLoadingPie1,
//     isError: errorPie1
//   } = useQuery(['pie1', filters], () => dataService.fetchPieData(filters, 'pie1'));

//   const {
//     data: dataPie2,
//     isLoading: isLoadingPie2,
//     isError: errorPie2
//   } = useQuery(['pie2', filters], () => dataService.fetchPie2Data(filters, 'pie2'));

//   return {
//     dataPie1,
//     isLoadingPie1,
//     errorPie1,
//     dataPie2,
//     isLoadingPie2,
//     errorPie2
//   };
// };

// export default usePieData;
