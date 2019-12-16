import React, { useEffect, lazy, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomHeader,
  CustomButton,
  Divider,
  CustomSortButton,
  CustomSearchInput
} from './CustomComponents';
import axios from 'axios';
import { loadMatters, loadAllMetters } from '../store/actions';
import CustomPagination from './CustomPagination';
import { sortBy } from '../utils';

const LazyLoadMattersTable = lazy(() => import('./MattersTable'));

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const matters = useSelector(state => state.matters);

  useEffect(() => {
    fetchMatters();
  }, [page, search]);

  const fetchMatters = async () => {
    const res = await axios.get(
      `http://localhost:3000/Requests?_page=${page}&_limit=10&q=${search}&_sort=Id&_order=asc`
    );
    setTotal(parseInt(res.headers['x-total-count']));
    dispatch(loadMatters(res.data));
  };

  const changePageNumber = type => {
    if (type === 'increment') {
      setPage(prevState => prevState + 1);
    } else {
      if (page !== 1) {
        setPage(prevState => prevState - 1);
      }
    }
  };

  const handleChangePagination = e => {
    if (!e.target.value) {
      setPage(1);
    } else {
      setPage(parseInt(e.target.value));
    }
  };

  const handleReload = () => {
    fetchMatters();
  };

  const handleSort = () => {
    dispatch(loadMatters(matters.sort(sortBy('Id'), true, parseInt)));
    // dispatch(
    //   loadMatters(matters.sort(sortBy('RequestName', false, a => a.toUpperCase())))
    // );
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <CustomHeader>Online Reporting - GCMC</CustomHeader>
      <CustomButton>Create a new matter</CustomButton>
      <Divider />
      <CustomHeader>My team active items</CustomHeader>
      <CustomSortButton inline onClick={() => handleSort()}>
        Sort by
      </CustomSortButton>
      <CustomSortButton inline onClick={() => handleReload()}>
        Reload
      </CustomSortButton>
      <CustomSortButton inline>Prepare table for excel report</CustomSortButton>
      <span style={{padding: '0 15px 0 15px'}}>Request completed. Result content: {matters.length}</span>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
      <CustomSearchInput placeholder="Search..." onChange={handleSearch} />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLoadMattersTable matters={matters} />
      </Suspense>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
    </div>
  );
}
