import React, { useEffect, lazy, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomHeader,
  CustomButton,
  Divider,
  CustomSortButton,
  CustomSearchInput,
  CustomCloseButton
} from './CustomComponents';
import { loadMatters } from '../store/actions';
import CustomPagination from './CustomPagination';
import Skeleton from 'react-loading-skeleton';
import { ExportCSV } from './ExportCSV';
import { MattersService } from '../Services/MattersService';
import { ToggleContent, Modal } from './MessagePopup';
import { MdClose } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';

const LazyLoadMattersTable = lazy(() => import('./MattersTable'));

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState({ field: 'Id', type: 'asc' });
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const matters = useSelector(state => state.matters);

  useEffect(() => {
    fetchMatters();
  }, [page, search, sortBy]);

  const fetchMatters = async () => {
    try {
      const res = await MattersService.getMatters(page, search, sortBy);
      setTotal(parseInt(res.headers['x-total-count']));
      dispatch(loadMatters(res.data));
    } catch (err) {
      console.error(err.message);
    }
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
    setSearch('');
    setSortBy({});
    fetchMatters();
  };

  const handleSortBy = (field, type) => {
    setSortBy({ ...sortBy, field: field, type: type });
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
      <CustomSortButton noRightBorder inline onClick={() => handleReload()}>
        Reload
      </CustomSortButton>
      <ExportCSV csvData={matters} />
      <span style={{ padding: '0 15px 0 15px' }}>
        Request completed. Result content: {matters && matters.length}
      </span>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
      <CustomSearchInput
        value={search}
        placeholder="Search..."
        onChange={handleSearch}
      />
      <Suspense fallback={<Skeleton height="80px" count={5} />}>
        <LazyLoadMattersTable
          matters={matters}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
        />
      </Suspense>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
      <ToggleContent
        isVisible={true}
        content={hide => (
          <Modal>
            <h4><FaInfo /> Message</h4>
            New matters added successfully.
            <CustomCloseButton>
              <MdClose
                onClick={hide}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </CustomCloseButton>
          </Modal>
        )}
      />
    </div>
  );
}
