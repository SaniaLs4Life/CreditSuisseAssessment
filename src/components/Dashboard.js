import React, { useEffect, lazy, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { MdClose } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import {
  CustomHeader,
  CustomButton,
  Divider,
  CustomSortButton,
  CustomSearchInput,
  CustomCloseButton
} from './CustomComponents';
import {
  loadMatters,
  setPopupVisibility,
  setCurrentUser
} from '../store/actions';
import CustomPagination from './CustomPagination';
import { ExportCSV } from './ExportCSV';
import { MattersService } from '../Services/MattersService';
import { ToggleContent, Modal } from './MessagePopup';
import './Dashboard.scss';

const LazyLoadMattersTable = lazy(() => import('./MattersTable'));

export default function Dashboard({ history }) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [second, setSecond] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [sortBy, setSortBy] = useState({ field: 'Id', type: 'asc' });
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { isPopupMessageVisible, matters } = useSelector(state => ({
    matters: state.matters,
    isPopupMessageVisible: state.isPopupMessageVisible
  }));

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

  useEffect(() => {
    let timer;
    if (second === 3) dispatch(setPopupVisibility(false));
    if (showMessage)
      timer = setTimeout(() => {
        setSecond(prevState => prevState + 1);
      }, 1000);
    return () => clearTimeout(timer);
  }, [second]);

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

  const handleChangeUser = () => {
    dispatch(setCurrentUser(true));
  };

  return (
    <div className="dashboard-container">
      <CustomHeader>Online Reporting - GCMC</CustomHeader>
      <Link to="/form">
        <CustomButton>Create a new matter</CustomButton>
      </Link>
      <Divider />
      <CustomHeader>My team active items</CustomHeader>
      <CustomSortButton noRightBorder inline onClick={() => handleReload()}>
        Reload
      </CustomSortButton>
      <CustomSortButton noRightBorder inline onClick={() => handleChangeUser()}>
        Change current user
      </CustomSortButton>
      <ExportCSV csvData={matters} />
      <span className="request-result">
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
          history={history}
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
        isVisible={isPopupMessageVisible}
        setShowMessage={setShowMessage}
        content={hide => (
          <Modal>
            <h4>
              <FaInfo /> Message
            </h4>
            New matters has been saved successfully.
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
