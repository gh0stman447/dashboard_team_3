import { useEffect } from 'react';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard_1.service';
import { useUsersData } from '../../hooks/Dashboard_1';

const UsersFetcher = () => {
  const { setUsers } = useDB1FiltersStore((state) => ({
    setUsers: state.setUsers
  }));

  const { data } = useUsersData();

  useEffect(() => {
    if (data) setUsers([...data].sort((a, b) => a.value - b.value)); //Дожидаемся получения данных и кладём их в хранилище
  }, [data]);

  return null;
};

export default UsersFetcher;
